import { ErrorCode } from './exercise.enums';
import { ExerciseErrorParams } from './exercises.types';

export class ExerciseError extends Error {
  code: ErrorCode;

  private params: ExerciseErrorParams;

  constructor(params: ExerciseErrorParams) {
    super();

    this.params = params;
    this.code = params.code;
    this.constructMessage();
  }

  private constructMessage(): void {
    switch (this.code) {
      case ErrorCode.RequiredPropertyMissing:
        this.message = `Required property '${this.params.column}' was not found in the payload`;
        break;
    }
  }
}
