export const testErrorProperty = async (
  testFn: () => void,
  expectFn: (e: unknown) => void,
  doneCallback: jest.DoneCallback,
) => {
  try {
    testFn();
  } catch (e) {
    expectFn(e);
    doneCallback();
  }
};
