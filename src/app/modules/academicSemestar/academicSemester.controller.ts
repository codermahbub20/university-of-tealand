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

// Get all academic semester into db

const getAllAcademicSemester = CatchAsync(
  async (req: Request, res: Response) => {
    const Result =
      await AcademicSemesterServices.getAllAcademicSemesterIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Semester is retrieved successfully',
      data: Result,
    });
  },
);

// Get Single Academic Semester Into Database
const getSingleAcademicSemester = CatchAsync(
  async (req: Request, res: Response) => {
    const semesterId = req.params.id;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterIntoDb(
        semesterId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${semesterId} Academic Semester is retrieved successfully`,
      data: result,
    });
  },
);

const updateAcademicSemester = CatchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
