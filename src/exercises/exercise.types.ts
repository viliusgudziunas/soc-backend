import { ErrorCode } from './exercise.enums';

export interface ExerciseParams {
  name: string;
  calories: number;
  timeSpentInMinutes: number;
}

export interface ExerciseErrorParams {
  code: ErrorCode;
  id?: number;
}
