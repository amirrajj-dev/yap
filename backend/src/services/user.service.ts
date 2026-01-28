import { User } from '../models/user.model';

export const getUsers = async (userId: string) => {
  const users = await User.find({
    _id: {
      $ne: userId,
    },
  })
    .select('name email avatar')
    .limit(50)
    .sort({ createdAt: -1 });
  return users;
};
