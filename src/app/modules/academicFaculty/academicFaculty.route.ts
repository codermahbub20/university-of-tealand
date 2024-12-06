import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

// Get Single Academic faculty Into database

router.get(
  '/create-academic-faculty/:id',
  AcademicFacultyController.getSingleAcademicFaculty,
);

// Update academic faculty into db
router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
