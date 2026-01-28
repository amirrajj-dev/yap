import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import * as UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', protectRoute, UserController.getUsers);

export default router;
