import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from 'src/exercises/exercise.entity';
import { ExerciseParams } from 'src/exercises/exercise.types';
import { InsertResult, UpdateResult } from 'typeorm';

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

export const mockUpdateExerciseResponse: UpdateResult = {
  raw: [],
  affected: 1,
  generatedMaps: [],
};

export const mockUpdateExerciseZeroAffectedResponse: UpdateResult = {
  ...mockUpdateExerciseResponse,
  affected: 0,
};
