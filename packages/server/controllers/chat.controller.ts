import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

//impl details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'prompt too long'),
   conversationId: z.uuid(),
});
//public interface expose to caller
export const ChatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(404).json(z.treeifyError(parseResult.error));
         return;
      }
      try {
         const { prompt, conversationId } = req.body;
         const answer = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: answer });
      } catch (error) {
         res.status(500).send({ error: error });
      }
   },
};
