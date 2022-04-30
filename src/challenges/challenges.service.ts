import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { ChallengeParams } from './challenges.types';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find();
  }

  async findById(id: number): Promise<Challenge> {
    return await this.challengesRepository.findOneOrFail(id);
  }

  async insert(params: ChallengeParams): Promise<Challenge> {
    const exercise = new Challenge(params);

    const result = await this.challengesRepository.insert(exercise);
    const id: number = result.identifiers[0].id;

    return this.findById(id);
  }
}
