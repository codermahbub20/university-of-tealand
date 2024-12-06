import config from '../../config';
import { AcademicSemester } from '../academicSemestar/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';

import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a object
  let userData: Partial<TUser> = {};

  // if password is not given , set password is default password

  userData.password = password || (config.default_pass as string);

  //  set the role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  //   set manually generated id
  userData.id = await generateStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //    create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
