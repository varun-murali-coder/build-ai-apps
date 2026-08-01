import express from 'express';
import type { Request, Response } from 'express';
import { ChatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello world');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello world' });
});

router.post('/api/chat', ChatController.sendMessage);

export default router;
