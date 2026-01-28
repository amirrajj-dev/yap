import type { Request, Response } from 'express';
import { asyncHandler } from '../api/async.handler';
import * as UserService from '../services/user.service';
import { ApiResponseHelper } from '../helpers/api.helper';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.getUsers(req.userId);
  return res
    .status(200)
    .json(ApiResponseHelper.success('users fetched succesfully', users, req.path));
});
