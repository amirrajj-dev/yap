import type { Request, Response } from 'express';
import { asyncHandler } from '../api/async.handler';
import * as ChatService from '../services/chat.service';
import { ApiResponseHelper } from '../helpers/api.helper';

export const getChats = asyncHandler(async (req: Request, res: Response) => {
  const chats = await ChatService.getChats(req.userId);
  return res
    .status(200)
    .json(ApiResponseHelper.success('chats fetched succesfully', chats, req.path));
});

export const getOrCreateChat = asyncHandler(
  async (req: Request<{ participantId: string }>, res: Response) => {
    const { participantId } = req.params;
    const chat = await ChatService.getOrCreateChat(req.userId, participantId);
    return res
      .status(200)
      .json(ApiResponseHelper.success('chat upsert succesfully', chat, req.path));
  },
);
