import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { exercisesData as data } from 'src/shared/test-data';
import { exerciseMocks as mocks, sharedMocks } from 'src/shared/test-mocks';
import { Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ExercisesService } from '../exercises.service';

describe('ExercisesService', () => {
  let repository: Repository<Exercise>;
  let service: ExercisesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Exercise);
  const relations = { relations: Exercise.relations };

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
    it('should try get all exercises from repository together with the relations', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(relations);
    });

    it('should return all exercises found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.exercises);
    });

    it('should return empty array when no exercises exist in repository', async () => {
      sharedMocks.mockFind<Exercise>(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });

  describe('.findById()', () => {
    const { id } = data.exercise;

    it('should try get an exercise from repository by id together with the relations', () => {
      service.findById(id);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id, relations);
    });

    it('should return the exercise it got back from repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(data.exercise);
    });
  });

  describe('.insert()', () => {
    it('should try insert a new exercise into repository', () => {
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
    it('should try to update an exercise in a repository', () => {
      const { id } = data.exercise;

      service.update(id, data.updateExerciseParams);

      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(id, data.updateExerciseParams);
    });
  });
});
