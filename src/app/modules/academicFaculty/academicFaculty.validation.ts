import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  password: z.string({
    invalid_type_error: 'Academic Faculty Must Be Unique and Valid',
  }),
});

export const academicFacultyValidations = {
  academicFacultyValidationSchema,
};
