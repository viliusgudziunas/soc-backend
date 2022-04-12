import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
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

  async addExercise(params: ExerciseParams): Promise<Exercise> {
    const exercise = new Exercise(params);
    // TODO: Add error handling here
    const result = await this.exercisesRepository.insert(exercise);
    const id: number = result.identifiers[0].id;

    return this.exercisesRepository.findOne(id);
  }
}
