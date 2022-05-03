import { ExerciseEntity } from 'src/exercises/dto/exercise.entity';
import {
  AddExerciseInput,
  UpdateExerciseInput,
} from 'src/exercises/dto/exercise.model';
import { InsertResult } from 'typeorm';
import { EntityParams } from '../base/base.types';

export const exercise: ExerciseEntity = {
  id: 1,
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const exercises: ExerciseEntity[] = [exercise];

export const addExerciseInput: AddExerciseInput = {
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
};

export const insertExerciseParams: EntityParams<ExerciseEntity> =
  addExerciseInput;

export const insertExerciseResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateExerciseInput: UpdateExerciseInput = {
  name: 'Updated test exercise',
};

export const updateExerciseParams: Partial<EntityParams<ExerciseEntity>> =
  updateExerciseInput;

export const updatedExercise: ExerciseEntity = {
  ...exercise,
  ...updateExerciseInput,
};
