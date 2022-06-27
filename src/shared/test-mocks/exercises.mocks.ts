import { Exercise } from 'src/exercises/exercise.entity';
import { ExercisesService as RealExercisesService } from 'src/exercises/exercises.service';
import { exercisesData as data } from 'src/shared/test-data';

export const ExercisesService = {
  findAll: jest.fn().mockResolvedValue(data.exercises),
  findById: jest.fn().mockResolvedValue(data.exercise),
  insert: jest.fn().mockResolvedValue(data.exercise.id),
  update: jest.fn().mockResolvedValue(null),
};

export const Repository = {
  find: jest.fn().mockResolvedValue(data.exercises),
  findOneOrFail: jest.fn().mockResolvedValue(data.exercise),
  insert: jest.fn().mockResolvedValue(data.insertExerciseResponse),
  update: jest.fn(),
};

export const RelationsService = {
  constructRelations: jest.fn().mockReturnValue(data.relations),
};

export const mockFindById = (
  service: RealExercisesService,
  exercise: Exercise,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(exercise);
