import {
  AddChallengeInput,
  Challenge,
  UpdateChallengeInput,
} from 'src/challenges/challenge.entity';
import { InsertResult } from 'typeorm';
import { EntityParams } from '../entity-base/entity-base.types';

export const challenge: Challenge = {
  id: 1,
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const challenges: Challenge[] = [challenge];

export const addChallengeInput: AddChallengeInput = {
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
};

export const insertChallengeParams: EntityParams<Challenge> = addChallengeInput;

export const insertChallengeResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateChallengeInput: UpdateChallengeInput = {
  name: 'Updated test challenge',
  active: false,
};

export const updateChallengeParams: Partial<EntityParams<Challenge>> =
  updateChallengeInput;

export const updatedChallenge: Challenge = {
  ...challenge,
  ...updateChallengeInput,
};
