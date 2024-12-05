import { Request, Response } from 'express';

const createAcademicSemester = async (req: Request, res: Response) => {
  try {
    // const { password, student: studentData } = req.body;
    // const result = await UserServices.createAcademicSemesterIntoDB(
    //   password,
    //   studentData,
    // );

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const UserControllers = {
  createAcademicSemester,
};
