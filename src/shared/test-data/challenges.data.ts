import { ChallengeEntity } from 'src/challenges/dto/challenge.entity';
import {
  AddChallengeInput,
  UpdateChallengeInput,
} from 'src/challenges/dto/challenge.model';
import { InsertResult } from 'typeorm';
import { EntityParams } from '../base/base.types';

export const challenge: ChallengeEntity = {
  id: 1,
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
  endDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const challenges: ChallengeEntity[] = [challenge];

export const addChallengeInput: AddChallengeInput = {
  name: 'Test challenge',
  description: 'Test challenge description',
  active: true,
};

export const insertChallengeParams: EntityParams<ChallengeEntity> = {
  ...addChallengeInput,
};

export const insertChallengeResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};

export const updateChallengeInput: UpdateChallengeInput = {
  name: 'Updated test challenge',
  active: false,
};

export const updateChallengeParams: Partial<EntityParams<ChallengeEntity>> =
  updateChallengeInput;

export const updatedChallenge: ChallengeEntity = {
  ...challenge,
  ...updateChallengeInput,
};
