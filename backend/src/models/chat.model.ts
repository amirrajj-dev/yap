import mongoose, { Document, Model } from 'mongoose';
import type { IChat } from '../interfaces/chat.interface';

export interface IChatDocument extends IChat, Document {}

const chatSchema = new mongoose.Schema<IChatDocument>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message',
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Chat: Model<IChatDocument> =
  mongoose.models.chat || mongoose.model<IChatDocument>('chat', chatSchema);
