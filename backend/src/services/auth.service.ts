import { User } from '../models/user.model';
import logger from '../logging/logger';

import { HttpError } from '../errors/http.error';
import { clerkClient } from '@clerk/express';

export const getMe = async (userId: string) => {
  logger.info(`fetching user ${userId}`);

  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError(404, 'user not found');
  }

  return user;
};

export const authCallBack = async (clerkId: string) => {
  if (!clerkId) {
    throw new HttpError(401, 'unauthenticated');
  }

  let user = await User.findOne({ clerkId });
  if (!user) {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    if (!clerkUser) {
      throw new HttpError(404, 'clerk user not found');
    }
    const fullName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ');
    user = await User.create({
      clerkId,
      name:
        fullName?.trim() ||
        clerkUser.emailAddresses[0]?.emailAddress.split('@')[0] ||
        'anonymous user',
      email: clerkUser.emailAddresses[0]?.emailAddress,
      avatar: clerkUser.imageUrl,
    });
  }
  return user;
};
