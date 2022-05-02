import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityParams } from 'src/shared/entity-base/entity-base.types';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';

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

  async insert(params: EntityParams<Challenge>): Promise<number> {
    const challenge = new Challenge(params);

    const result = await this.challengesRepository.insert(challenge);
    return result.identifiers[0].id;
  }
}
