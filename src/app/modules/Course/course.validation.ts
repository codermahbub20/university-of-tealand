import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(PreRequisiteCourseValidationSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = createCourseValidationSchema.partial(); // here i use partial for zod validation , zod validation provide a partial method , this method use to the all required or non required field are converted to the optional

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
