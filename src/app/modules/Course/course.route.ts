import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

// Get Single Course Into database

router.get('/:id', CourseController.getSingleCourse);

// Delete Course Into database

router.delete('/:id', CourseController.deleteCourse);

// Update Course into db
// router.patch(
//   '/:facultyId',
//   validateRequest(),
//   AcademicFacultyController.updateAcademicFaculty,
// );

export const courseRoutes = router;
