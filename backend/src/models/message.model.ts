import mongoose, { Document, Model } from 'mongoose';
import type { IMessage } from '../interfaces/message.interface';

export interface IMessageDocument extends IMessage, Document {}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chat',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ chat: 1, createdAt: 1 }); // oldest to newest

export const Message: Model<IMessageDocument> =
  mongoose.models.message || mongoose.model<IMessageDocument>('message', messageSchema);
