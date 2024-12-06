import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is retrieved successfully',
      data: result,
    });
  },
);

// Get all academic semester into db

const getAllAcademicFaculty = CatchAsync(
  async (req: Request, res: Response) => {
    const Result =
      await AcademicFacultyServices.getAllAcademicFacultiesIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Faculty is retrieved successfully',
      data: Result,
    });
  },
);

// Get Single Academic Semester Into Database
const getSingleAcademicFaculty = CatchAsync(
  async (req: Request, res: Response) => {
    const facultyId = req.params.id;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyIntoDb(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${facultyId} Academic Semester is retrieved successfully`,
      data: result,
    });
  },
);

const updateAcademicFaculty = CatchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
