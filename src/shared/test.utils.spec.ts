import { ErrorCode } from 'src/exercises/exercise.enums';
import { testErrorCode } from './test.utils';

describe('testErrorCode()', () => {
  const mockExpectedCode = ErrorCode.NotFound;

  it('should not throw error if function returned expected error code', () => {
    const mockFunc = jest.fn(() => {
      throw { code: ErrorCode.NotFound };
    });

    const testFunc = async () =>
      await testErrorCode(mockFunc, mockExpectedCode);

    expect(testFunc).not.toThrow();
  });

  it('should throw error if function returned different error code from expected', async () => {
    const mockFunc = jest.fn(() => {
      throw { code: ErrorCode.RequiredPropertyMissing };
    });

    const testFunc = async () =>
      await testErrorCode(mockFunc, mockExpectedCode);

    await expect(testFunc).rejects.toThrow();
  });

  it('should throw error if function did not throw error', async () => {
    const mockFunc = jest.fn(async () => 'test');

    const testFunc = async () =>
      await testErrorCode(mockFunc, mockExpectedCode);

    await expect(testFunc).rejects.toThrow();
  });
});
