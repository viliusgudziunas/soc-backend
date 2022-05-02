import { Exercise } from 'src/exercises/exercise.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { exercisesData as data } from 'src/shared/test-data';

export const mockExercisesService = {
  findAll: jest.fn().mockResolvedValue(data.mockExercises),
  findById: jest.fn().mockResolvedValue(data.mockExercise),
  insert: jest.fn().mockResolvedValue(data.mockExercise.id),
  update: jest.fn().mockResolvedValue(data.mockUpdatedExercise),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.mockExercises),
  findOneOrFail: jest.fn().mockResolvedValue(data.mockExercise),
  insert: jest.fn().mockResolvedValue(data.mockInsertExerciseResponse),
  update: jest.fn().mockResolvedValue(data.mockUpdateExerciseResponse),
};

export const mockFindById = (
  service: ExercisesService,
  exercise: Exercise,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(exercise);
