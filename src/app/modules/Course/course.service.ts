import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesInToDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourseInToDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourseInToDB = async (id: string) => {
  const result = await Course.findById(id, { isDeleted: true }, { new: true });
  return result;
};

export const CourseServices = {
  createCourseInToDB,
  getAllCoursesInToDB,
  getSingleCourseInToDB,
  deleteCourseInToDB,
};
