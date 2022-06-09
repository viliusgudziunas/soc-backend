import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { exercisesData as data } from 'src/shared/test-data';
import { exercisesMocks as mocks } from 'src/shared/test-mocks';
import { Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExercisesService } from '../exercises.service';

describe('ExercisesService', () => {
  let repository: Repository<Exercise>;
  let service: ExercisesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Exercise);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesService,
        { provide: REPOSITORY_TOKEN, useValue: mocks.mockRepository },
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
    it('should get exercises and passed in relations from repository', () => {
      const expectedParams = { relations: data.relations };

      service.findAll(data.relations);

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(expectedParams);
    });

    it('should return all exercises returned by repository', async () => {
      const result = await service.findAll([]);

      expect(result).toBe(data.exercises);
    });
  });

  describe('.findById()', () => {
    const { id } = data.exercise;

    it('should get exercise and passed in relations from repository', () => {
      const expectedParams = { relations: data.relations };

      service.findById(id, data.relations);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id, expectedParams);
    });

    it('should return the exercise returned by repository', async () => {
      const result = await service.findById(id, data.relations);

      expect(result).toBe(data.exercise);
    });
  });

  describe('.insert()', () => {
    it('should insert exercise into repository', () => {
      service.insert(data.insertExerciseParams);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(data.insertExerciseParams);
    });

    it('should return the id returned by repository', async () => {
      const { id } = data.insertExerciseResponse.identifiers[0];

      const result = await service.insert(data.insertExerciseParams);

      expect(result).toBe(id);
    });
  });

  describe('.update()', () => {
    it('should update exercise via repository', () => {
      const { id } = data.exercise;

      service.update(id, data.updateExerciseParams);

      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(id, data.updateExerciseParams);
    });
  });
});
