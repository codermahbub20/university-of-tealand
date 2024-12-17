import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.patch(
//   '/:studentId',
//   validateRequest(updateStudentValidationSchema),
//   StudentControllers.updateStudent,
// );

// router.delete('/:studentId', StudentControllers.deleteStudent);

// router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
