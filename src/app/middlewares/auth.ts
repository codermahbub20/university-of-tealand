import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../errors/AppError';

const auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized user');
    }
  });
};

export default auth;
