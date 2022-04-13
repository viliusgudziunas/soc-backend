import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../exercise.entity';
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
    let findOneMock: jest.SpyInstance;
    const { id } = td.mockExercise1;

    beforeEach(() => {
      findOneMock = jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(td.mockExercise1));
    });

    it('should try get an exercise from repository by id', () => {
      service.findById(id);

      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith(id);
    });

    it('should return the exercise it got back from repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(td.mockExercise1);
    });
  });

  describe('.addExercise()', () => {
    let insertMock: jest.SpyInstance;

    beforeEach(() => {
      insertMock = jest
        .spyOn(repository, 'insert')
        .mockImplementation(() =>
          Promise.resolve(td.mockInsertExerciseResponse),
        );
    });

    it('should try insert a new exercise into repository', async () => {
      await service.insert(td.mockInsertExerciseParams);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(td.mockInsertExerciseParams);
    });

    it('should return the exercise which was just added', async () => {
      const findByIdMock = jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(td.mockExercise1));

      const result = await service.insert(td.mockInsertExerciseParams);
      const identifierId = td.mockInsertExerciseResponse.identifiers[0].id;

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(identifierId);
      expect(result).toBe(td.mockExercise1);
    });
  });
});
