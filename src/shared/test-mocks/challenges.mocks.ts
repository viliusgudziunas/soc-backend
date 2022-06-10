import { Challenge } from 'src/challenges/challenge.entity';
import { ChallengesService } from 'src/challenges/challenges.service';
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
  challenge: Challenge,
): jest.SpyInstance =>
  jest.spyOn(service, 'findById').mockResolvedValue(challenge);

export const relationsServiceMock = {
  constructRelations: jest.fn().mockReturnValue(data.relations),
};
