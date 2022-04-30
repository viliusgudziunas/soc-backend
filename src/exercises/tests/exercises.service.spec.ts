import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { exercisesData as data } from 'src/shared/test-data';
import { exerciseMocks as mocks, sharedMocks } from 'src/shared/test-mocks';
import { testErrorCode } from 'src/shared/test.utils';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ErrorCode } from '../exercise.enums';
import { ExerciseError } from '../exercise.error';
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
    it('should try get all exercises from repository', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith();
    });

    it('should return all exercises found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.mockExercises);
    });

    it('should return empty array when no exercises exist in repository', async () => {
      sharedMocks.mockFind<Exercise>(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });

  describe('.findById()', () => {
    const { id } = data.mockExercise;

    it('should try get an exercise from repository by id', () => {
      service.findById(id);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id);
    });

    it('should return the exercise it got back from repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(data.mockExercise);
    });

    it('should not handle errors thrown by repository', async () => {
      const error = new EntityNotFoundError(Exercise, id);
      sharedMocks.mockFindOneOrFailError<Exercise>(repository, error);

      await expect(service.findById(id)).rejects.toThrowError(error);
    });
  });

  describe('.insert()', () => {
    let findByIdMock: jest.SpyInstance;

    beforeEach(() => {
      findByIdMock = mocks.mockFindById(service, data.mockExercise);
    });

    it('should try insert a new exercise into repository', async () => {
      await service.insert(data.mockInsertExerciseParams);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(data.mockInsertExerciseParams);
    });

    it('should try to get an exercise from exercises service', async () => {
      await service.insert(data.mockInsertExerciseParams);
      const identifierId = data.mockInsertExerciseResponse.identifiers[0].id;

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(identifierId);
    });

    it('should return the exercise which was just added', async () => {
      const result = await service.insert(data.mockInsertExerciseParams);

      expect(result).toBe(data.mockExercise);
    });

    it('should not handle errors thrown by repository', async () => {
      const error = new QueryFailedError('', [], {});
      sharedMocks.mockInsertError<Exercise>(repository, error);

      await expect(
        service.insert(data.mockInsertExerciseParams),
      ).rejects.toThrowError(error);
    });
  });

  describe('.update()', () => {
    let findByIdMock: jest.SpyInstance;

    const { id } = data.mockExercise;

    beforeEach(() => {
      findByIdMock = mocks.mockFindById(service, data.mockUpdatedExercise);
    });

    it('should try update an existing exercise in a repository', async () => {
      const updateMock = jest.spyOn(repository, 'update');

      await service.update(id, data.mockUpdateExerciseParams);

      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(id, data.mockUpdateExerciseParams);
    });

    it('should return the exercise which was just updated', async () => {
      const result = await service.update(id, data.mockUpdateExerciseParams);

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(id);
      expect(result).toBe(data.mockUpdatedExercise);
    });

    it('should throw an exercise error when exercise was not found in repository', async () => {
      mocks.mockUpdate(repository, data.mockUpdateExerciseZeroAffectedResponse);

      const testFunc = () => service.update(id, data.mockUpdateExerciseParams);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      await testErrorCode(testFunc, ErrorCode.NotFound);
    });
  });
});
