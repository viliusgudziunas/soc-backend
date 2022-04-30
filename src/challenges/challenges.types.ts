import { SharedDBColumns } from 'src/shared/shared.types';
import { Challenge } from './challenge.entity';

export type ChallengeParams = Omit<Challenge, SharedDBColumns>;
