import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = CatchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseInToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course Created Is successfully',
    data: result,
  });
});

// Get all academic semester into db

const getAllCourses = CatchAsync(async (req: Request, res: Response) => {
  const Result = await CourseServices.getAllCoursesInToDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Course is retrieved successfully',
    data: Result,
  });
});

// Get Single Academic Semester Into Database
const getSingleCourse = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseServices.getSingleCourseInToDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${id} Course is retrieved successfully`,
    data: result,
  });
});

const updateCourse = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInToDb(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course Is Updated successfully',
    data: result,
  });
});

const deleteCourse = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CourseServices.deleteCourseInToDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${id} Course deleted successfully`,
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
