import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

// Get Single semester registration Into database

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

// Delete Course Into database

// router.delete('/:id', CourseController.deleteCourse);

router.patch(
  '/:id',
  validateRequest(
    SemesterValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegistrationsRoutes = router;
