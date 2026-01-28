import mongoose, { Document, Model } from 'mongoose';
import type { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

export const User: Model<IUserDocument> =
  mongoose.models.user || mongoose.model<IUserDocument>('user', userSchema);
