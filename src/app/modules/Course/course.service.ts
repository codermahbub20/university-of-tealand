import { Course } from './course.model';

const createCourseInToDB = async () => {
  const result = await Course.create();
  return result;
};

const getAllCoursesInToDB = async () => {
  const result = await Course.find();
  return result;
};

export const CourseServices = {
  createCourseInToDB,
  getAllCoursesInToDB,
};
