import { mockHttpException } from './test-mocks/shared.mocks';
import { testErrorProperty } from './test.utils';

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
