import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.services';
import CatchAsync from '../../utils/CatchAsync';

const createAcademicSemester = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is retrieved successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
