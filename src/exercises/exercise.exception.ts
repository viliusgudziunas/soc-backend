import { HttpException, HttpStatus } from '@nestjs/common';
import { ExerciseExceptionArgs } from './exercise.types';

export class ExerciseException extends HttpException {
  constructor(args: ExerciseExceptionArgs) {
    super(ExerciseException.constructMessage(args), args.status);
  }

  private static constructMessage(args: ExerciseExceptionArgs): string {
    switch (args.status) {
      case HttpStatus.NOT_FOUND:
        return `Exercise was not found with ID '${args.id}'`;
    }
  }
}
