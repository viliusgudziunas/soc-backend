import { InsertResult } from 'typeorm';
import { AddExerciseInput, Exercise } from '../exercise.entity';
import { ExerciseParams } from '../exercise.types';

export const mockExercise1: Exercise = {
  id: 1,
  name: 'Test exercise 1',
  calories: 10,
  timeSpentInMinutes: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockExercises: Exercise[] = [mockExercise1];

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
