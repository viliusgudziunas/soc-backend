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
      result.code = ErrorCode.Temp;

      expect(result.code).toBe(ErrorCode.Temp);
    });
  });

  describe('.message', () => {
    it('should construct an exercise not found message from the error code', () => {
      const result = new ExerciseError({ code: ErrorCode.NotFound, id: 1 });

      expect(result.message).toBe("Exercise was not found with ID '1'");
    });
  });
});
