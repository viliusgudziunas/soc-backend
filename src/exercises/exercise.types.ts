import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './exercise.enums';

export interface ExerciseParams {
  name: string;
  calories: number;
  timeSpentInMinutes: number;
}

export interface ExerciseErrorParams {
  code: ErrorCode;

  id?: number;
  column?: string;
}

export interface ExerciseExceptionArgs {
  status: HttpStatus;

  id?: number;
}

export type ExerciseExceptionHandlerArgs = Omit<
  ExerciseExceptionArgs,
  'status'
>;
