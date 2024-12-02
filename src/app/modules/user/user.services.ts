import config from '../../config';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, student: TUser) => {
  // create a object
  let user: NewUser = {};

  // if password is not given , set password is default password

  user.password = password || (config.default_pass as string);

  //  set the role
  user.role = 'student';

  //   set manually generated id
  user.id = '225134013';

  // create a user
  const result = await User.create(user);

  //    create a student
  if (Object.keys(result).length) {
    // set id , _id as user
    student.id = result.id;
    student.user = result._id;
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
