import { Repository } from 'typeorm';
import { Challenge } from '../challenge.entity';
import * as td from './test.data';

export const mockChallengesService = {
  findAll: jest.fn().mockResolvedValue(td.mockChallenges),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(td.mockChallenges),
};

export const mockFindAll = (
  repository: Repository<Challenge>,
  challenges: Challenge[],
): jest.SpyInstance =>
  jest.spyOn(repository, 'find').mockResolvedValue(challenges);
