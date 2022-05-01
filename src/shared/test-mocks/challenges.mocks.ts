import { Challenge } from 'src/challenges/challenge.entity';
import { ChallengesService } from 'src/challenges/challenges.service';
import { challengesData as data } from 'src/shared/test-data';

export const mockChallengesService = {
  findAll: jest.fn().mockResolvedValue(data.mockChallenges),
  findById: jest.fn().mockResolvedValue(data.mockChallenge),
  insert: jest.fn().mockResolvedValue(data.mockChallenge),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.mockChallenges),
  findOneOrFail: jest.fn().mockResolvedValue(data.mockChallenge),
  insert: jest.fn().mockResolvedValue(data.mockInsertChallengeResponse),
};

export const mockFindById = (
  service: ChallengesService,
  challenge: Challenge,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(challenge);
