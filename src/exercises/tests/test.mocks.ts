import { Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExercisesService } from '../exercises.service';
import * as td from './test.data';

export const mockExercisesService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
};

export const mockRepository = {
  find: jest.fn(() => Promise.resolve(td.mockExercises)),
  findOne: jest.fn(() => Promise.resolve(td.mockExercise)),
  insert: jest.fn(() => Promise.resolve(td.mockInsertExerciseResponse)),
  update: jest.fn(),
};

export const mockFindOne = (
  repository: Repository<Exercise>,
  exercise: Exercise,
): jest.SpyInstance =>
  jest
    .spyOn(repository, 'findOne')
    .mockImplementation(() => Promise.resolve(exercise));

export const mockInsertError = (
  repository: Repository<Exercise>,
  error: Error,
): jest.SpyInstance =>
  jest.spyOn(repository, 'insert').mockImplementation(() => {
    throw error;
  });

export const mockServiceFindById = (
  service: ExercisesService,
  exercise: Exercise,
) =>
  jest
    .spyOn(service, 'findById')
    .mockImplementation(() => Promise.resolve(exercise));
