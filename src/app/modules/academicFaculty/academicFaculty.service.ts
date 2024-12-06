import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// Get Single Academic Semester InToDB

const getSingleAcademicFacultyIntoDb = async (semesterId: string) => {
  const result = await AcademicFaculty.findById(semesterId);
  return result;
};

//  update academic semester into db
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesIntoDB,
  getSingleAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDB,
};
