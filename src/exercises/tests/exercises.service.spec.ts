import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { testErrorCode } from 'src/shared/test.utils';
import { QueryFailedError, Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ErrorCode } from '../exercise.enums';
import { ExerciseError } from '../exercise.error';
import { ExercisesService } from '../exercises.service';
import * as td from './test.data';
import * as tm from './test.mocks';

describe('ExercisesService', () => {
  let repository: Repository<Exercise>;
  let service: ExercisesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Exercise);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesService,
        { provide: REPOSITORY_TOKEN, useValue: tm.mockRepository },
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
      const findMock = jest.spyOn(repository, 'find');

      service.findAll();

      expect(findMock).toBeCalledTimes(1);
      expect(findMock).toBeCalledWith();
    });

    it('should return all exercises found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(td.mockExercises);
    });

    it('should return empty array when no exercises exist in repository', async () => {
      tm.mockFindAll(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });

  describe('.findById()', () => {
    const { id } = td.mockExercise;

    it('should try get an exercise from repository by id', () => {
      const findOneMock = jest.spyOn(repository, 'findOne');

      service.findById(id);

      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith(id);
    });

    it('should return the exercise it got back from repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(td.mockExercise);
    });

    it('should throw an exercise error when exercise was not found in repository', async () => {
      tm.mockFindOne(repository, undefined);

      const testFunc = () => service.findById(id);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      await testErrorCode(testFunc, ErrorCode.NotFound);
    });
  });

  describe('.insert()', () => {
    let findByIdMock: jest.SpyInstance;

    beforeEach(() => {
      findByIdMock = tm.mockServiceFindById(service, td.mockExercise);
    });

    it('should try insert a new exercise into repository', async () => {
      const insertMock = jest.spyOn(repository, 'insert');

      await service.insert(td.mockInsertExerciseParams);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(td.mockInsertExerciseParams);
    });

    it('should return the exercise which was just added', async () => {
      const result = await service.insert(td.mockInsertExerciseParams);
      const identifierId = td.mockInsertExerciseResponse.identifiers[0].id;

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(identifierId);
      expect(result).toBe(td.mockExercise);
    });

    it('should throw an exercise error when a required key is missing from the params', async () => {
      const error = new QueryFailedError('', [], { column: 'name' });
      tm.mockInsertError(repository, error);

      const params = td.mockInsertExerciseParams;
      delete params.name;
      const testFunc = () => service.insert(params);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      await expect(testFunc()).rejects.not.toThrow(QueryFailedError);
      await testErrorCode(testFunc, ErrorCode.RequiredPropertyMissing);
    });

    it('should throw the original error if it is not QueryFailedError', async () => {
      const error = new Error();
      tm.mockInsertError(repository, error);

      const params = td.mockInsertExerciseParams;
      delete params.name;
      const testFunc = () => service.insert(params);

      await expect(testFunc()).rejects.toThrow(Error);
      await expect(testFunc()).rejects.not.toThrow(ExerciseError);
      await expect(testFunc()).rejects.not.toThrow(QueryFailedError);
    });
  });

  describe('.update()', () => {
    let findByIdMock: jest.SpyInstance;

    const { id } = td.mockExercise;

    beforeEach(() => {
      findByIdMock = tm.mockServiceFindById(service, td.mockUpdatedExercise);
    });

    it('should try update an existing exercise in a repository', async () => {
      const updateMock = jest.spyOn(repository, 'update');

      await service.update(id, td.mockUpdateExerciseParams);

      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(id, td.mockUpdateExerciseParams);
    });

    it('should return the exercise which was just updated', async () => {
      const result = await service.update(id, td.mockUpdateExerciseParams);

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(id);
      expect(result).toBe(td.mockUpdatedExercise);
    });

    it('should throw an exercise error when exercise was not found in repository', async () => {
      tm.mockUpdate(repository, td.mockUpdateExerciseZeroAffectedResponse);

      const testFunc = () => service.update(id, td.mockUpdateExerciseParams);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      await testErrorCode(testFunc, ErrorCode.NotFound);
    });
  });
});
