import { Router } from 'express';
import { StudentRoutes } from '../modules/students/student.routes';
import { userRoutes } from '../modules/user/user.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
