import { ErrorCode } from './exercise.enums';
import { ExerciseErrorParams } from './exercise.types';

export class ExerciseError extends Error {
  code: ErrorCode;

  private id: number;

  constructor(params: ExerciseErrorParams) {
    super();

    this.setupVariables(params);
    this.constructMessage();
  }

  private setupVariables(params: ExerciseErrorParams): void {
    const { code, id } = params;

    this.code = code;
    this.id = id || 0;
  }

  private constructMessage(): void {
    switch (this.code) {
      case ErrorCode.NotFound:
        this.message = `Exercise was not found with ID '${this.id}'`;
      default:
        break;
    }
  }
}
