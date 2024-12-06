import { TAcademicSemester } from '../academicSemestar/academicSemestar.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // by default 00000

  const lastStudentId = await findLastStudentId();
  //  Here I check and validate my code ,like  if a user admit 2030 01->( this indicate Autumn Semester ) 0001-> student id, semester and second student admit 2030 02-> summer semester can not the student id start previous student id like 001 + 1 = 002 , its start with 2030 02 0001 {
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const latStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload?.code;
  const currentStudentYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    latStudentYear === currentStudentYear
  ) {
    currentId = lastStudentId?.substring(6);
  }

  // } Here I check and validate my code ,like  if a user admit 2030 01->( this indicate Autumn Semester ) 0001-> student id, semester and second student admit 2030 02-> summer semester can not the student id start previous student id like 001 + 1 = 002 , its start with 2030 02 0001

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
