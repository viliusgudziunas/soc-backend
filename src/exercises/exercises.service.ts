import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
