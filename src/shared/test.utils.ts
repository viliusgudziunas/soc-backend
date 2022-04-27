import { fail } from 'assert';
import { ErrorCode } from 'src/exercises/exercise.enums';

// TODO: Need to work on this function a bit more
export const testErrorCode = async (
  testFunc: () => Promise<unknown>,
  expectedCode: ErrorCode,
) => {
  try {
    await testFunc();
    fail('Expected function to throw');
  } catch (error) {
    expect(error.code).toBe(expectedCode);
  }
};