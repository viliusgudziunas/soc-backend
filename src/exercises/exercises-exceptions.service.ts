import { HttpStatus, Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { ExerciseException } from './exercise.exception';
import { ExerciseExceptionHandlerArgs } from './exercise.types';

@Injectable()
export class ExercisesExceptionsService {
  handle(error: Error, args?: ExerciseExceptionHandlerArgs): void {
    if (error instanceof EntityNotFoundError) {
      const { id } = args || {};
      throw new ExerciseException({ status: HttpStatus.NOT_FOUND, id });
    }

    throw error;
  }
}
