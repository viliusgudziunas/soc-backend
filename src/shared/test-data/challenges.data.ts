import { Challenge } from 'src/challenges/challenge.entity';
import { InsertResult } from 'typeorm';
import { EntityParams } from '../entity-base/entity-base.types';

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

export const mockInsertChallengeParams: EntityParams<Challenge> = {
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
};

export const mockInsertChallengeResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};
