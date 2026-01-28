import type { Request, Response } from 'express';
import { ApiResponseHelper } from '../helpers/api.helper';
import * as AuthService from '../services/auth.service';
import { asyncHandler } from '../api/async.handler';
import { getAuth } from '@clerk/express';

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.getMe(req.userId);

  return res
    .status(200)
    .json(ApiResponseHelper.success('user fetched successfully', user, req.path));
});

export const authCallBack = asyncHandler(async (req: Request, res: Response) => {
  const { userId: clerkId } = getAuth(req);
  const user = await AuthService.authCallBack(clerkId as string);
  return res.status(200).json(ApiResponseHelper.success('user synced succesfully', user, req.path));
});
