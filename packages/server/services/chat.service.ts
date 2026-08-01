import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import {
   getConversation,
   saveConversation,
} from '../repositories/conversation.repository';

const client = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
});
const history: string[] = [];
type ChatResponse = {
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const history = getConversation(conversationId);

      history.push(`User: ${prompt}`);

      const response = await client.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: history.join('\n'),
      });

      const answer =
         response.text ??
         response.candidates?.[0]?.content?.parts
            ?.map((part) => part.text)
            .filter(Boolean)
            .join('') ??
         '';
      history.push(`Assistant: ${answer}`);
      saveConversation(conversationId, history);
      return { message: answer };
   },
};
