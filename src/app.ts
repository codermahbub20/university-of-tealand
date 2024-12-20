import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import { error } from 'console';
import globalErrorHandler from './app/middlewares/globalErrorHandalers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

//  parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
