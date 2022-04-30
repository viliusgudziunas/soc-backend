import { Exercise } from './exercise.entity';
import { ErrorCode } from './exercise.enums';

type ExerciseGenericColumns = 'id' | 'createdAt' | 'updatedAt';
export type ExerciseParams = Omit<Exercise, ExerciseGenericColumns>;

export interface ExerciseErrorParams {
  code: ErrorCode;

  id?: number;
}
