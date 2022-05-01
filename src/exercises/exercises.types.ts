import { ErrorCode } from './exercise.enums';

export interface ExerciseErrorParams {
  code: ErrorCode;

  id?: number;
}
