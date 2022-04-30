import { SharedDBColumns } from 'src/shared/shared.types';
import { Exercise } from './exercise.entity';
import { ErrorCode } from './exercise.enums';

export type ExerciseParams = Omit<Exercise, SharedDBColumns>;

export interface ExerciseErrorParams {
  code: ErrorCode;

  id?: number;
}
