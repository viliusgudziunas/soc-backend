import { HttpException } from '@nestjs/common';
import { Exercise } from 'src/exercises/exercise.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { exercisesData as data } from 'src/shared/test-data';
import { Repository, UpdateResult } from 'typeorm';

export const mockExercisesService = {
  findAll: jest.fn().mockResolvedValue(data.mockExercises),
  findById: jest.fn().mockResolvedValue(data.mockExercise),
  insert: jest.fn().mockResolvedValue(data.mockExercise),
  update: jest.fn().mockResolvedValue(data.mockUpdatedExercise),
};

export const mockRepository = {
  findOneOrFail: jest.fn().mockResolvedValue(data.mockExercise),
  find: jest.fn().mockResolvedValue(data.mockExercises),
  insert: jest.fn().mockResolvedValue(data.mockInsertExerciseResponse),
  update: jest.fn().mockResolvedValue(data.mockUpdateExerciseResponse),
};

export const mockExercisesExceptionsService = {
  handle: jest.fn(),
};

export const mockFindAll = (
  repository: Repository<Exercise>,
  exercises: Exercise[],
): jest.SpyInstance =>
  jest.spyOn(repository, 'find').mockResolvedValue(exercises);

export const mockFindOne = (
  repository: Repository<Exercise>,
  exercise: Exercise,
): jest.SpyInstance =>
  jest.spyOn(repository, 'findOne').mockResolvedValue(exercise);

export const mockFindOneOrFailException = (
  repository: Repository<Exercise>,
  exception: HttpException,
): jest.SpyInstance =>
  jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(exception);

export const mockInsertError = (
  repository: Repository<Exercise>,
  error: Error,
): jest.SpyInstance =>
  jest.spyOn(repository, 'insert').mockRejectedValue(error);

export const mockUpdate = (
  repository: Repository<Exercise>,
  result: UpdateResult,
): jest.SpyInstance =>
  jest.spyOn(repository, 'update').mockResolvedValue(result);

export const mockServiceFindById = (
  service: ExercisesService,
  exercise: Exercise,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(exercise);
