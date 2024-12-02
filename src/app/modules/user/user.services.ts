import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (student: TUser) => {
  const result = await User.create(student);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
