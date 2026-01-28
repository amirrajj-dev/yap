import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.get('/me', protectRoute, AuthController.getMe);
router.post('/callback', AuthController.authCallBack);

export default router;
