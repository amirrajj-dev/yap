import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import * as MessageController from '../controllers/message.controller';

const router = express.Router();

router.get('/chat/:chatId', protectRoute, MessageController.getMessages);

export default router;
