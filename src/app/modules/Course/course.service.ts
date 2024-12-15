import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesInToDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(CourseSearchableFields)
    .sort()
    .filter()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseInToDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
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
