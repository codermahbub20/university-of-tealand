import CatchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = CatchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is Logged in successfully',
    data: result,
  });
});

const changePassword = CatchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password is updated successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
