import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from 'src/exercises/exercise.entity';
import { ExerciseParams } from 'src/exercises/exercises.types';
import { InsertResult } from 'typeorm';
import { challengesData } from '.';

const challenge = challengesData.challenge;

export const exercise: Exercise = {
  id: 1,
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
  challengeId: challenge.id,
  challenge,
};

export const exercises: Exercise[] = [exercise];

export const addExerciseInput: AddExerciseInput = {
  name: 'Test exercise',
  calories: 10,
  timeSpentInMinutes: 20,
  challengeId: 1,
};

export const insertExerciseParams: ExerciseParams = addExerciseInput;

export const insertExerciseResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateExerciseInput: UpdateExerciseInput = {
  name: 'Updated test exercise',
};

export const updateExerciseParams: Partial<ExerciseParams> =
  updateExerciseInput;

export const updatedExercise: Exercise = {
  ...exercise,
  ...updateExerciseInput,
};
