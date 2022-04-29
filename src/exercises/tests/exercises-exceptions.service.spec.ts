import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { testErrorProperty } from 'src/shared/test.utils';
import { EntityNotFoundError } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExerciseException } from '../exercise.exception';
import { ExercisesExceptionsService } from '../exercises-exceptions.service';

describe.only('ExercisesService', () => {
  let service: ExercisesExceptionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ExercisesExceptionsService],
    }).compile();

    service = module.get<ExercisesExceptionsService>(
      ExercisesExceptionsService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handle()', () => {
    it('should throw original error when it was not recognized', () => {
      const error = new Error('test error');

      expect(() => service.handle(error)).toThrowError(error);
    });

    describe('when error is EntityNotFoundError', () => {
      const id = 1;

      it('should throw exercise exception', () => {
        const error = new EntityNotFoundError(Exercise, id);

        expect(() => service.handle(error, { id })).toThrowError(
          ExerciseException,
        );
      });

      it('should throw exercise exception even if id was not passed in', () => {
        const error = new EntityNotFoundError(Exercise, id);

        expect(() => service.handle(error)).toThrowError(ExerciseException);
      });

      it('should throw exception with NOT_FOUND status', (complete: jest.DoneCallback) => {
        const error = new EntityNotFoundError(Exercise, id);

        const testFn = () => service.handle(error, { id });
        const expectFn = (e: HttpException) =>
          expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);

        testErrorProperty(testFn, expectFn, complete);
      });

      it('should throw exception with id which was not found', (complete: jest.DoneCallback) => {
        const error = new EntityNotFoundError(Exercise, id);

        const testFn = () => service.handle(error, { id });
        const expectFn = (e: HttpException) =>
          expect(e.getResponse()).toContain(`'${id}'`);

        testErrorProperty(testFn, expectFn, complete);
      });
    });
  });
});
