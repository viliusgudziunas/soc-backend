import { Challenge } from 'src/challenges/challenge.entity';
import { challengesData as data } from 'src/shared/test-data';
import { Repository } from 'typeorm';

export const mockChallengesService = {
  findAll: jest.fn().mockResolvedValue(data.mockChallenges),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.mockChallenges),
};

export const mockFindAll = (
  repository: Repository<Challenge>,
  challenges: Challenge[],
): jest.SpyInstance =>
  jest.spyOn(repository, 'find').mockResolvedValue(challenges);
