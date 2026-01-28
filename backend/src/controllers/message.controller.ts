import type { Request, Response } from 'express';
import { asyncHandler } from '../api/async.handler';
import * as MessageService from '../services/message.service';
import { ApiResponseHelper } from '../helpers/api.helper';

export const getMessages = asyncHandler(async (req: Request<{ chatId: string }>, res: Response) => {
  const { chatId } = req.params;
  const messages = await MessageService.getMessages(chatId, req.userId);
  return res
    .status(200)
    .json(ApiResponseHelper.success('messages fetched succesfully', messages, req.path));
});
