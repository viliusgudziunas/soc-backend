import { HttpException, HttpStatus } from '@nestjs/common';
import { ExerciseException } from '../exercise.exception';

describe('ExerciseException', () => {
  it('should extend HttpException', () => {
    const result = new ExerciseException({ status: HttpStatus.NOT_FOUND });

    expect(result).toBeInstanceOf(HttpException);
  });

  describe('constructor', () => {
    it('should assign status passed in as parameter', () => {
      const result = new ExerciseException({ status: HttpStatus.NOT_FOUND });

      expect(result.getStatus()).toBe(HttpStatus.NOT_FOUND);
    });

    it('should assign message', () => {
      const result = new ExerciseException({ status: HttpStatus.NOT_FOUND });

      expect(result.getResponse()).toBeTruthy();
    });
  });

  describe('message', () => {
    it.each<[string, HttpStatus, { [key: string]: unknown }, string]>([
      [
        'exercise not found',
        HttpStatus.NOT_FOUND,
        { id: 1 },
        "Exercise was not found with ID '1'",
      ],
    ])(
      'should construct %p message from status',
      (
        _,
        status: HttpStatus,
        args: { [key: string]: unknown },
        expectedMessage: string,
      ) => {
        const result = new ExerciseException({ status, ...args });

        expect(result.getResponse()).toBe(expectedMessage);
      },
    );
  });
});
