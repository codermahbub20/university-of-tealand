import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/create-academic-semester',
  AcademicSemesterController.getAllAcademicSemester,
);

// Get Single Academic Semester Into database

router.get(
  '/create-academic-semester/:id',
  AcademicSemesterController.getSingleAcademicSemester,
);

export const academicSemesterRoutes = router;
