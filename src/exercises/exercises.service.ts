import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { ErrorCode } from './exercise.enums';
import { ExerciseError } from './exercise.error';
import { ExerciseParams } from './exercises.types';

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
    return await this.exercisesRepository.findOneOrFail(id);
  }

  async insert(params: ExerciseParams): Promise<Exercise> {
    const exercise = new Exercise(params);

    const result = await this.exercisesRepository.insert(exercise);
    const id: number = result.identifiers[0].id;

    return this.findById(id);
  }

  async update(id: number, params: Partial<ExerciseParams>): Promise<Exercise> {
    const result = await this.exercisesRepository.update(id, { ...params });
    if (result.affected === 0) {
      throw new ExerciseError({ code: ErrorCode.NotFound, id });
    }
    return await this.findById(id);
  }
}
