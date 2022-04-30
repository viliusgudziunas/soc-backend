import { challengesData as data } from 'src/shared/test-data';

export const mockChallengesService = {
  findAll: jest.fn().mockResolvedValue(data.mockChallenges),
  findById: jest.fn().mockResolvedValue(data.mockChallenge),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.mockChallenges),
  findOneOrFail: jest.fn().mockResolvedValue(data.mockChallenge),
};
