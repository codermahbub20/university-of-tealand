import express, { Application, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.routes';
import { userRoutes } from './app/modules/user/user.routes';

//  parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
