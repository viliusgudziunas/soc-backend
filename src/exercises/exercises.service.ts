import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { ErrorCode } from './exercise.enums';
import { ExerciseError } from './exercise.error';
import { ExerciseParams } from './exercise.types';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find();
  }

  async findById(id: number): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne(id);
    if (exercise === undefined) {
      throw new ExerciseError({ code: ErrorCode.NotFound, id });
    }

    return exercise;
  }

  async insert(params: ExerciseParams): Promise<Exercise> {
    const exercise = new Exercise(params);
    // TODO: Add error handling here
    const result = await this.exercisesRepository.insert(exercise);
    const id: number = result.identifiers[0].id;

    return this.findById(id);
  }
}
