import { InsertResult } from 'typeorm';
import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from '../exercise.entity';
import { ExerciseParams } from '../exercise.types';

export const mockExercisesService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
};
export const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
};

export const mockExercise: Exercise = {
  id: 1,
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockExercises: Exercise[] = [mockExercise];

export const mockAddExerciseInput: AddExerciseInput = {
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
};

export const mockInsertExerciseParams: ExerciseParams = mockAddExerciseInput;

export const mockInsertExerciseResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const mockUpdateExerciseInput: UpdateExerciseInput = {
  name: 'Updated test exercise',
};

export const mockUpdateExerciseParams: Partial<ExerciseParams> =
  mockUpdateExerciseInput;

export const mockUpdatedExercise: Exercise = {
  ...mockExercise,
  ...mockUpdateExerciseInput,
};
