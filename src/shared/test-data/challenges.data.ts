import {
  AddChallengeInput,
  Challenge,
  UpdateChallengeInput,
} from 'src/challenges/challenge.entity';
import { ChallengeParams } from 'src/challenges/challenges.types';
import { group } from 'src/shared/test-data/groups.data';
import { InsertResult } from 'typeorm';

export const challenge: Challenge = {
  id: 1,
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  exercises: [],
  groupId: group.id,
  group,
};

export const challenges: Challenge[] = [challenge];

export const addChallengeInput: AddChallengeInput = {
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
  groupId: 1,
};

export const insertChallengeParams: ChallengeParams = addChallengeInput;

export const insertChallengeResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateChallengeInput: UpdateChallengeInput = {
  name: 'Updated test challenge',
  active: false,
};

export const updateChallengeParams: Partial<ChallengeParams> =
  updateChallengeInput;

export const updatedChallenge: Challenge = {
  ...challenge,
  ...updateChallengeInput,
};

export const relations: string[] = ['group', 'exercises'];
