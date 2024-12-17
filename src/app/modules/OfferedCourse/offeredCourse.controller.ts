import { Request, Response } from 'express';
import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = CatchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Offered Course Created successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
