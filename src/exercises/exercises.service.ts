import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityParams } from 'src/shared/base/base.types';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './dto/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exercisesRepository: Repository<ExerciseEntity>,
  ) {}

  findAll(): Promise<ExerciseEntity[]> {
    return this.exercisesRepository.find();
  }

  async findById(id: number): Promise<ExerciseEntity> {
    return await this.exercisesRepository.findOneOrFail(id);
  }

  async insert(params: EntityParams<ExerciseEntity>): Promise<number> {
    const exercise = new ExerciseEntity(params);

    const result = await this.exercisesRepository.insert(exercise);
    return result.identifiers[0].id;
  }

  async update(
    id: number,
    params: Partial<EntityParams<ExerciseEntity>>,
  ): Promise<void> {
    const partialEntity = { ...params };
    await this.exercisesRepository.update(id, partialEntity);
  }
}
