import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized user');
    }

    // check if the token are valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(401, 'You are not authorized user');
        }
        // decoded undefined
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
