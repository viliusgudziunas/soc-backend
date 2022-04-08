import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExercisesService } from '../exercises.service';
import { mockExercises } from './test-data';

describe('ExercisesService', () => {
  let repository: Repository<Exercise>;
  let service: ExercisesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Exercise);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesService,
        { provide: REPOSITORY_TOKEN, useValue: { find: jest.fn() } },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    repository = module.get<Repository<Exercise>>(REPOSITORY_TOKEN);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.findAll()', () => {
    it('should return all exercises found by repository', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(mockExercises));

      const exercises = await service.findAll();
      expect(exercises).toBe(mockExercises);
    });
  });
});
