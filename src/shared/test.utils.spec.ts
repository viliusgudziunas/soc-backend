import { ErrorCode } from 'src/exercises/exercise.enums';
import { mockHttpException } from './test-mocks/shared.mocks';
import { testErrorCode, testErrorProperty } from './test.utils';

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

describe('testErrorProperty()', () => {
  it('should not call expect function and done callback when testFn did not throw an error', () => {
    const testFn = jest.fn();
    const expectFn = jest.fn();
    const doneCallback = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    testErrorProperty(testFn, expectFn, doneCallback);

    expect(testFn).toBeCalledTimes(1);
    expect(expectFn).toBeCalledTimes(0);
    expect(doneCallback).toBeCalledTimes(0);
  });

  it('should call expect function and done callback when testFn threw an error', () => {
    const e = mockHttpException();
    const testFn = jest.fn(() => {
      throw e;
    });
    const expectFn = jest.fn();
    const doneCallback = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    testErrorProperty(testFn, expectFn, doneCallback);

    expect(testFn).toBeCalledTimes(1);
    expect(expectFn).toBeCalledTimes(1);
    expect(expectFn).toBeCalledWith(e);
    expect(doneCallback).toBeCalledTimes(1);
  });
});
