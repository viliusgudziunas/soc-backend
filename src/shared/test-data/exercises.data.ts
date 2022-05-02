import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from 'src/exercises/exercise.entity';
import { InsertResult } from 'typeorm';
import { EntityParams } from '../entity-base/entity-base.types';

export const exercise: Exercise = {
  id: 1,
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exercises: Exercise[] = [exercise];

export const addExerciseInput: AddExerciseInput = {
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
};

export const insertExerciseParams: EntityParams<Exercise> = addExerciseInput;

export const insertExerciseResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateExerciseInput: UpdateExerciseInput = {
  name: 'Updated test exercise',
};

export const updateExerciseParams: Partial<EntityParams<Exercise>> =
  updateExerciseInput;

export const updatedExercise: Exercise = {
  ...exercise,
  ...updateExerciseInput,
};
