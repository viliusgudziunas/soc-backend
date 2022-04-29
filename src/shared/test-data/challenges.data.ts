import { Challenge } from 'src/challenges/challenge.entity';

export const mockChallenges: Challenge[] = [
  {
    id: 1,
    name: 'Test challenge',
    description: 'Test challenge description',
    active: true,
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
