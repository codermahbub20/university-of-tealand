import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //

  // const queryObj = { ...query }; // copy

  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  // // Search Query
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludedFields.forEach((el) => delete queryObj[el]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt'; // SET DEFAULT VALUE

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // // Limit
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting

  // let fields = '__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  //

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

// Get Single Student

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(404, 'Failed To Delete Student');
    }

    const deletedUser = await User.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(404, 'Failed To Delete Student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
