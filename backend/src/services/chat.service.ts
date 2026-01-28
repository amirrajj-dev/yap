import { HttpError } from '../errors/http.error';
import { Chat } from '../models/chat.model';

export const getChats = async (userId: string) => {
  const chats = await Chat.find({ participants: userId })
    .populate('participants', 'name email avatar')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });
  const formattedChats = chats.map((chat) => {
    const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);
    return {
      _id: chat._id,
      participant: otherParticipant,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt,
      createdAt: chat.createdAt,
    };
  });
  return formattedChats;
};

export const getOrCreateChat = async (userId: string, participantId: string) => {
  // impossible scenario :)
  if (userId === participantId) {
    throw new HttpError(400, 'cannot create chat with yourself');
  }

  let chat = await Chat.findOne({
    participants: {
      $all: [userId, participantId],
    },
  });
  if (!chat) {
    const newChat = new Chat({
      participants: [userId, participantId],
    });
    await newChat.save();
    chat = await newChat.populate('participants', 'name email avatar');
  }
  const otherParticipant = await chat.participants.find((p) => p._id.toString() !== userId);
  return {
    _id: chat.id,
    participant: otherParticipant ?? null,
    lastMessage: chat.lastMessage,
    lastMessageAt: chat.lastMessageAt,
    createdAt: chat.createdAt,
  };
};
