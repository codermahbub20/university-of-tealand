import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking is user is exist
  const isUserExist = await User.findOne({ id: payload?.id });

  if (!isUserExist) {
    throw new AppError(404, 'This user is not found !');
  }

  //   checking is the user already deleted
  const isUserDeleted = isUserExist?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(404, 'This user is already deleted!');
  }

  //   checking is the user already blocked
  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(404, 'This user is already blocked!');
  }

  //   checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );

  //
};

export const AuthServices = {
  loginUser,
};
