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
  find: jest.fn().mockResolvedValue(data.mockExercises),
  findOneOrFail: jest.fn().mockResolvedValue(data.mockExercise),
  insert: jest.fn().mockResolvedValue(data.mockInsertExerciseResponse),
  update: jest.fn().mockResolvedValue(data.mockUpdateExerciseResponse),
};

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
