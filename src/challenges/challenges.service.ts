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
    return this.challengesRepository.find({ relations: Challenge.relations });
  }

  findById(id: number): Promise<Challenge> {
    return this.challengesRepository.findOneOrFail(id, {
      relations: Challenge.relations,
    });
  }

  async insert(params: ChallengeParams): Promise<number> {
    const challenge = new Challenge(params);

    const result = await this.challengesRepository.insert(challenge);
    return result.identifiers[0].id;
  }

  async update(id: number, params: Partial<ChallengeParams>): Promise<void> {
    const partialEntity = { ...params };
    await this.challengesRepository.update(id, partialEntity);
  }
}
