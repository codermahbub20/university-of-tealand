import { TAcademicSemester } from './academicSemestar.interface';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// Get Single Academic Semester InToDB

const getSingleAcademicSemesterIntoDb = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId);
  return result;
};

//  update academic semester into db
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDb,
  updateAcademicSemesterIntoDB,
};
