import { InstanceToken } from '@nestjs/core/injector/module';
import { Test } from '@nestjs/testing';
import { ExercisesResolver } from '../exercises.resolver';
import { ExercisesService } from '../exercises.service';
import * as td from './test.data';
import * as tm from './test.mocks';

describe('ExercisesResolver', () => {
  let service: ExercisesService;
  let resolver: ExercisesResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ExercisesResolver],
    })
      .useMocker((token: InstanceToken) => {
        if (token === ExercisesService) {
          return tm.mockExercisesService;
        }
      })
      .compile();

    service = module.get<ExercisesService>(ExercisesService);
    resolver = module.get<ExercisesResolver>(ExercisesResolver);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.exercises() query', () => {
    it('should return all exercises found by exercises service', async () => {
      const findAllMock = jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(td.mockExercises));

      const result = await resolver.exercises();

      expect(findAllMock).toBeCalledTimes(1);
      expect(findAllMock).toBeCalledWith();
      expect(result).toBe(td.mockExercises);
    });
  });

  describe('.exercise() query', () => {
    let findByIdMock: jest.SpyInstance;

    const { id } = td.mockExercise;

    beforeEach(() => {
      findByIdMock = jest
        .spyOn(service, 'findById')
        .mockImplementation(() => Promise.resolve(td.mockExercise));
    });

    it('should pass id to exercises service', () => {
      resolver.exercise(id);

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(id);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.exercise(id);

      expect(result).toBe(td.mockExercise);
    });
  });

  describe('.addExercise() mutation', () => {
    let insertMock: jest.SpyInstance;

    beforeEach(() => {
      insertMock = jest
        .spyOn(service, 'insert')
        .mockImplementation(() => Promise.resolve(td.mockExercise));
    });

    it("should pass it's parameters to exercises service", () => {
      resolver.addExercise(td.mockAddExerciseInput);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(td.mockAddExerciseInput);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.addExercise(td.mockAddExerciseInput);

      expect(result).toBe(td.mockExercise);
    });
  });

  describe('.updateExercise() mutation', () => {
    let updateMock: jest.SpyInstance;

    const { id } = td.mockExercise;

    beforeEach(() => {
      updateMock = jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(td.mockUpdatedExercise));
    });

    it("should pass it's parameters to exercises service", () => {
      resolver.updateExercise(id, td.mockUpdateExerciseInput);

      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(id, td.mockUpdateExerciseInput);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.updateExercise(
        id,
        td.mockUpdateExerciseInput,
      );

      expect(result).toBe(td.mockUpdatedExercise);
    });
  });
});
