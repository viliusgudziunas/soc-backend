import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { testErrorCode } from 'src/shared/test-utils';
import { InsertResult, QueryFailedError, Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
import { ErrorCode } from '../exercise.enums';
import { ExerciseError } from '../exercise.error';
import { ExercisesService } from '../exercises.service';
import * as td from './test-data';

describe('ExercisesService', () => {
  let repository: Repository<Exercise>;
  let service: ExercisesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Exercise);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: REPOSITORY_TOKEN,
          useValue: { find: jest.fn(), insert: jest.fn(), findOne: jest.fn() },
        },
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
      const findMock = jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(td.mockExercises));

      const result = await service.findAll();

      expect(findMock).toBeCalledTimes(1);
      expect(findMock).toBeCalledWith();
      expect(result).toBe(td.mockExercises);
    });
  });

  describe('.findById()', () => {
    const { id } = td.mockExercise1;
    const mockFindOne = (exercise: Exercise): jest.SpyInstance =>
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(exercise));

    it('should try get an exercise from repository by id', () => {
      const findOneMock = mockFindOne(td.mockExercise1);

      service.findById(id);

      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith(id);
    });

    it('should return the exercise it got back from repository', async () => {
      mockFindOne(td.mockExercise1);

      const result = await service.findById(id);

      expect(result).toBe(td.mockExercise1);
    });

    it('should throw an exercise error when exercise was not found in repository', async () => {
      mockFindOne(undefined);

      const testFunc = () => service.findById(id);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      testErrorCode(testFunc, ErrorCode.NotFound);
    });
  });

  describe('.insert()', () => {
    let findByIdMock: jest.SpyInstance;
    const mockInsert = (response: InsertResult): jest.SpyInstance =>
      jest
        .spyOn(repository, 'insert')
        .mockImplementation(() => Promise.resolve(response));
    const mockInsertError = (error: Error): jest.SpyInstance =>
      jest.spyOn(repository, 'insert').mockImplementation(() => {
        throw error;
      });

    beforeEach(() => {
      findByIdMock = jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(td.mockExercise1));
    });

    it('should try insert a new exercise into repository', async () => {
      const insertMock = mockInsert(td.mockInsertExerciseResponse);

      await service.insert(td.mockInsertExerciseParams);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(td.mockInsertExerciseParams);
    });

    it('should return the exercise which was just added', async () => {
      mockInsert(td.mockInsertExerciseResponse);

      const result = await service.insert(td.mockInsertExerciseParams);
      const identifierId = td.mockInsertExerciseResponse.identifiers[0].id;

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(identifierId);
      expect(result).toBe(td.mockExercise1);
    });

    it('should throw an exercise error when a required key is missing from the params', async () => {
      const error = new QueryFailedError('', [], { column: 'name' });
      mockInsertError(error);

      const params = td.mockInsertExerciseParams;
      delete params.name;
      const testFunc = () => service.insert(params);

      await expect(testFunc()).rejects.toThrow(ExerciseError);
      await expect(testFunc()).rejects.not.toThrow(QueryFailedError);
      testErrorCode(testFunc, ErrorCode.RequiredPropertyMissing);
    });

    it('should throw the original error if it is not QueryFailedError', async () => {
      const error = new Error();
      mockInsertError(error);

      const params = td.mockInsertExerciseParams;
      delete params.name;
      const testFunc = () => service.insert(params);

      await expect(testFunc()).rejects.toThrow(Error);
      await expect(testFunc()).rejects.not.toThrow(ExerciseError);
      await expect(testFunc()).rejects.not.toThrow(QueryFailedError);
    });
  });
});
