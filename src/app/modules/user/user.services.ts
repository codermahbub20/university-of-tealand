import config from '../../config';
import { Student } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  // create a object
  let userData: Partial<TUser> = {};

  // if password is not given , set password is default password

  userData.password = password || (config.default_pass as string);

  //  set the role
  userData.role = 'student';

  //   set manually generated id
  userData.id = '225134013';

  // create a user
  const newUser = await User.create(userData);

  //    create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
