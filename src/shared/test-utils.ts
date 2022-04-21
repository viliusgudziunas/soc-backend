import { ErrorCode } from 'src/exercises/exercise.enums';

export const testErrorCode = async (
  testFunc: () => unknown,
  expectedCode: ErrorCode,
) => {
  try {
    await testFunc();
    // Fail if didn't throw
    expect(true).toBe(false);
  } catch (error) {
    expect(error.code).toBe(expectedCode);
  }
};
