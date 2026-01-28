import type mongoose from 'mongoose';

export interface IMessage {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
}
