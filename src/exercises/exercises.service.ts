import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { ExerciseParams } from './exercises.types';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  findAll(relations: string[]): Promise<Exercise[]> {
    return this.exercisesRepository.find({ relations });
  }

  findById(id: number, relations: string[]): Promise<Exercise> {
    return this.exercisesRepository.findOneOrFail(id, { relations });
  }

  async insert(params: ExerciseParams): Promise<number> {
    const exercise = new Exercise(params);

    const result = await this.exercisesRepository.insert(exercise);
    return result.identifiers[0].id;
  }

  async update(id: number, params: Partial<ExerciseParams>): Promise<void> {
    const partialEntity = { ...params };
    await this.exercisesRepository.update(id, partialEntity);
  }
}
