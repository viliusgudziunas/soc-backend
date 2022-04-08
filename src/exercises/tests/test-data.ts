import { Exercise } from '../exercise.entity';

export const mockExercises: Exercise[] = [
  {
    id: 1,
    name: 'Test exercise 1',
    calories: 10,
    timeSpentInMinutes: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
