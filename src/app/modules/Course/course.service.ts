import { Course } from './course.model';

const createCourse = async () => {
  const result = await Course.create();
  return result;
};

export const CourseServices = {
  createCourse,
};
