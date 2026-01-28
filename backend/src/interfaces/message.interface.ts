import type mongoose from 'mongoose';

export interface IMessage {
  chat: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  text: string;
}
