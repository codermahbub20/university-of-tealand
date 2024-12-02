import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.routes';
import { userRoutes } from './app/modules/user/user.routes';
import { error } from 'console';
import globalErrorHandler from './app/middlewares/globalErrorHandalers';

//  parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

export default app;
