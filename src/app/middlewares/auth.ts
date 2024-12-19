import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
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
        const role = (decoded as JwtPayload).role;

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(401, 'You are not authorized user');
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
