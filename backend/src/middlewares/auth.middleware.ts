import { getAuth, requireAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import logger from '../logging/logger';
import { asyncHandler } from '../api/async.handler';
import { HttpError } from '../errors/http.error';

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

export const protectRoute = [
  requireAuth(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    logger.info('authorizing user ...');
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) {
      throw new HttpError(401, 'invalid token');
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new HttpError(404, 'user not found');
    }

    req.userId = user._id.toString();
    logger.info('user credentials set succesfully');
    next();
  }),
];
