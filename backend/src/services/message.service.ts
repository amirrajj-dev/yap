import { HttpError } from '../errors/http.error';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

export const getMessages = async (chatId: string, userId: string) => {
  if (!chatId) {
    throw new HttpError(400, 'chatId is required');
  }
  const chat = await Chat.findOne({
    _id: chatId,
    participants: userId,
  });
  if (!chat) {
    throw new HttpError(404, 'chat not found');
  }
  const messages = await Message.find({ chat: chatId })
    .populate('sender', 'name email avatar')
    .sort({ createdAt: 1 });

  return messages;
};
