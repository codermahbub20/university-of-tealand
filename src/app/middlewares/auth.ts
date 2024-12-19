import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../utils/CatchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized user');
    }

    // check if the token are valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded.role;

    const user = await User.isUserExistByCustomId(userId);
    // custom statics check here
    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    //   checking is the user already deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(404, 'This user is already deleted!');
    }

    //   checking is the user already blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(404, 'This user is already blocked!');
    }

    if (
      user?.passwordChangeAt &&
      User.isJwtIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(401, 'You are not authorized user');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized user');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
