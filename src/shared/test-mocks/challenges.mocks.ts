import { Challenge } from 'src/challenges/challenge.entity';
import { ChallengesService as RealChallengesService } from 'src/challenges/challenges.service';
import { challengesData as data } from 'src/shared/test-data';

export const ChallengesService = {
  findAll: jest.fn().mockResolvedValue(data.challenges),
  findById: jest.fn().mockResolvedValue(data.challenge),
  insert: jest.fn().mockResolvedValue(data.challenge.id),
  update: jest.fn().mockResolvedValue(null),
};

export const Repository = {
  find: jest.fn().mockResolvedValue(data.challenges),
  findOneOrFail: jest.fn().mockResolvedValue(data.challenge),
  insert: jest.fn().mockResolvedValue(data.insertChallengeResponse),
  update: jest.fn(),
};

export const RelationsService = {
  constructRelations: jest.fn().mockReturnValue(data.relations),
};

export const mockFindById = (
  service: RealChallengesService,
  challenge: Challenge,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(challenge);
