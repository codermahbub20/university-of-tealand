import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsIntoDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

// Get Single Academic Semester InToDB

const getSingleAcademicDepartmentIntoDb = async (semesterId: string) => {
  const result = await AcademicDepartment.findById(semesterId);
  return result;
};

//  update academic semester into db
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsIntoDB,
  getSingleAcademicDepartmentIntoDb,
  updateAcademicDepartmentIntoDB,
};
