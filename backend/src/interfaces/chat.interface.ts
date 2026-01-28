import type mongoose from 'mongoose';

export interface IChat {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  createdAt: Date;
}
