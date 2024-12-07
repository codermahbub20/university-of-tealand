import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemestar/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

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

  //  Start transaction roll back
  const session = await mongoose.startSession();

  try {
    //  start transaction
    session.startTransaction();

    //   set manually generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user
    const newUser = await User.create([userData], { session });

    //    create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.Bad_request, 'Failed To Create User');
    }
    // set id , _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //  Create User Transaction---- 2
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.Bad_request, 'Failed To Create Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
