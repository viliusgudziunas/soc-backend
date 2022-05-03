import { ExerciseEntity } from 'src/exercises/dto/exercise.entity';
import { ExercisesService } from 'src/exercises/exercises.service';
import { exercisesData as data } from 'src/shared/test-data';

export const mockExercisesService = {
  findAll: jest.fn().mockResolvedValue(data.exercises),
  findById: jest.fn().mockResolvedValue(data.exercise),
  insert: jest.fn().mockResolvedValue(data.exercise.id),
  update: jest.fn().mockResolvedValue(null),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.exercises),
  findOneOrFail: jest.fn().mockResolvedValue(data.exercise),
  insert: jest.fn().mockResolvedValue(data.insertExerciseResponse),
  update: jest.fn(),
};

export const mockFindById = (
  service: ExercisesService,
  exercise: ExerciseEntity,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(exercise);
