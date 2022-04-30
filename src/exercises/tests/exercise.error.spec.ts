import { ErrorCode } from '../exercise.enums';
import { ExerciseError } from '../exercise.error';

describe('ExerciseError', () => {
  it('should extend Error', () => {
    const result = new ExerciseError({ code: ErrorCode.NotFound });

    expect(result).toBeInstanceOf(Error);
  });

  describe('constructor', () => {
    it('should assign error code passed in as parameter', () => {
      const result = new ExerciseError({ code: ErrorCode.NotFound });

      expect(result.code).toBe(ErrorCode.NotFound);
    });
  });

  describe('.code', () => {
    it('should allow to overwrite the error code', () => {
      const result = new ExerciseError({ code: ErrorCode.NotFound });
      result.code = ErrorCode.RequiredPropertyMissing;

      expect(result.code).toBe(ErrorCode.RequiredPropertyMissing);
    });
  });

  describe('.message', () => {
    it.each<[string, ErrorCode, { [key: string]: unknown }, string]>([
      [
        'required property missing',
        ErrorCode.RequiredPropertyMissing,
        { column: 'name' },
        "Required property 'name' was not found in the payload",
      ],
    ])(
      'should construct %p message from error code',
      (
        _,
        code: ErrorCode,
        params: { [key: string]: unknown },
        expectedMessage: string,
      ) => {
        const result = new ExerciseError({ code, ...params });

        expect(result.message).toBe(expectedMessage);
      },
    );
  });
});
