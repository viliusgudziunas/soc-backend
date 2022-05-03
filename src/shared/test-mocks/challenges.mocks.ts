import { ChallengesService } from 'src/challenges/challenges.service';
import { ChallengeEntity } from 'src/challenges/dto/challenge.entity';
import { challengesData as data } from 'src/shared/test-data';

export const mockChallengesService = {
  findAll: jest.fn().mockResolvedValue(data.challenges),
  findById: jest.fn().mockResolvedValue(data.challenge),
  insert: jest.fn().mockResolvedValue(data.challenge.id),
  update: jest.fn().mockResolvedValue(null),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.challenges),
  findOneOrFail: jest.fn().mockResolvedValue(data.challenge),
  insert: jest.fn().mockResolvedValue(data.insertChallengeResponse),
  update: jest.fn(),
};

export const mockFindById = (
  service: ChallengesService,
  challenge: ChallengeEntity,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(challenge);
