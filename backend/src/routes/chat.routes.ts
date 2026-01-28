import express from 'express';
import * as ChatController from '../controllers/chat.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protectRoute);
router.get('/chats', ChatController.getChats);
router.post('/with/:participantId', ChatController.getOrCreateChat);

export default router;
