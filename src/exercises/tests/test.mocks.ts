import { Repository, UpdateResult } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExercisesService } from '../exercises.service';
import * as td from './test.data';

export const mockExercisesService = {
  findAll: jest.fn().mockResolvedValue(td.mockExercises),
  findById: jest.fn().mockResolvedValue(td.mockExercise),
  insert: jest.fn().mockResolvedValue(td.mockExercise),
  update: jest.fn().mockResolvedValue(td.mockUpdatedExercise),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(td.mockExercises),
  findOne: jest.fn().mockResolvedValue(td.mockExercise),
  insert: jest.fn().mockResolvedValue(td.mockInsertExerciseResponse),
  update: jest.fn().mockResolvedValue(td.mockUpdateExerciseResponse),
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
