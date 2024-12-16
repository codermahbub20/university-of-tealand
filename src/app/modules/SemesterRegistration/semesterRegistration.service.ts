import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemestar/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester is exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(404, 'This Academic Semester Can Not Exists !');
  }

  //check if the semester is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(409, 'This Academic Semester Already Registered!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
