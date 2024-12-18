import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // checking is user is exist
  //   const isUserExist = await User.findOne({ id: payload?.id });
  const user = await User.isUserExistByCustomId(payload.id);
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

  //   checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(404, 'Password do not match!');
  }
  //   const isPasswordMatched = await bcrypt.compare(
  //     payload?.password,
  //     isUserExist?.password,
  //   );

  //   create token and sent to the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
  //
};

export const AuthServices = {
  loginUser,
};
