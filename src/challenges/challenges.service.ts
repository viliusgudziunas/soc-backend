import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityParams } from 'src/shared/base/base.types';
import { Repository } from 'typeorm';
import { ChallengeEntity } from './dto/challenge.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(ChallengeEntity)
    private readonly challengesRepository: Repository<ChallengeEntity>,
  ) {}

  findAll(): Promise<ChallengeEntity[]> {
    return this.challengesRepository.find();
  }

  async findById(id: number): Promise<ChallengeEntity> {
    return await this.challengesRepository.findOneOrFail(id);
  }

  async insert(params: EntityParams<ChallengeEntity>): Promise<number> {
    const challenge = new ChallengeEntity(params);

    const result = await this.challengesRepository.insert(challenge);
    return result.identifiers[0].id;
  }

  async update(
    id: number,
    params: Partial<EntityParams<ChallengeEntity>>,
  ): Promise<void> {
    const partialEntity = { ...params };
    await this.challengesRepository.update(id, partialEntity);
  }
}
