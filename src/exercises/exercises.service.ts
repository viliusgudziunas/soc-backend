import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityParams } from 'src/shared/entity-base/entity-base.types';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

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

  async insert(params: EntityParams<Exercise>): Promise<number> {
    const exercise = new Exercise(params);

    const result = await this.exercisesRepository.insert(exercise);
    return result.identifiers[0].id;
  }

  async update(
    id: number,
    params: Partial<EntityParams<Exercise>>,
  ): Promise<void> {
    const partialEntity = { ...params };
    await this.exercisesRepository.update(id, partialEntity);
  }
}
