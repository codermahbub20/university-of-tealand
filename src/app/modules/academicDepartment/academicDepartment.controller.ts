import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CatchAsync from '../../utils/CatchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicDepartment = CatchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic department is Created successfully',
      data: result,
    });
  },
);

// Get all academic semester into db

const getAllAcademicDepartment = CatchAsync(
  async (req: Request, res: Response) => {
    const Result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic department is retrieved successfully',
      data: Result,
    });
  },
);

// Get Single Academic Semester Into Database
const getSingleAcademicDepartment = CatchAsync(
  async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDb(
        departmentId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${departmentId} Academic Department is retrieved successfully`,
      data: result,
    });
  },
);

const updateAcademicDepartment = CatchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
