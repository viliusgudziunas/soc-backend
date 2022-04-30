import { Challenge } from 'src/challenges/challenge.entity';
import { ChallengeParams } from 'src/challenges/challenges.types';
import { InsertResult } from 'typeorm';

export const mockChallenge: Challenge = {
  id: 1,
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockChallenges: Challenge[] = [mockChallenge];

export const mockInsertChallengeParams: ChallengeParams = {
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
};

export const mockInsertChallengeResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};
