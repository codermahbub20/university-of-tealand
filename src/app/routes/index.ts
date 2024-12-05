import { Router } from 'express';
import { StudentRoutes } from '../modules/students/student.routes';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemestar/academicSemester.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/academic-semesters',
    routes: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
