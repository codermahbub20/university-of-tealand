import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration Is successfully',
      data: result,
    });
  },
);

// Get all academic semester into db

const getAllSemesterRegistration = CatchAsync(
  async (req: Request, res: Response) => {
    const Result =
      await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.query,
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All Semester Registration is retrieved successfully',
      data: Result,
    });
  },
);

// Get Single Academic Semester Into Database
const getSingleSemesterRegistration = CatchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `${id} Course is retrieved successfully`,
      data: result,
    });
  },
);

const updateSemesterRegistration = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration Updated successfully',
    data: result,
  });
});

// const deleteCourse = CatchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await CourseServices.deleteCourseInToDB(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: `${id} Course deleted successfully`,
//     data: result,
//   });
// });

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  //   deleteCourse,
  //   assignFacultiesWithCourse,
  //   removeFacultiesFromCourse,
};
