import { Test } from '@nestjs/testing';
import { exercisesData as data } from 'src/shared/test-data';
import { exerciseMocks as mocks } from 'src/shared/test-mocks';
import { ExercisesResolver } from '../exercises.resolver';
import { ExercisesService } from '../exercises.service';

describe('ExercisesResolver', () => {
  let service: ExercisesService;
  let resolver: ExercisesResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesResolver,
        { provide: ExercisesService, useValue: mocks.mockExercisesService },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    resolver = module.get<ExercisesResolver>(ExercisesResolver);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.exercises() query', () => {
    it('should try get all exercises from exercises service', () => {
      const findAllMock = jest.spyOn(service, 'findAll');

      resolver.exercises();

      expect(findAllMock).toBeCalledTimes(1);
      expect(findAllMock).toBeCalledWith();
    });

    it('should return all exercises found by exercises service', async () => {
      const result = await resolver.exercises();

      expect(result).toBe(data.mockExercises);
    });
  });

  describe('.exercise() query', () => {
    const { id } = data.mockExercise;

    it('should pass id to exercises service', () => {
      const findByIdMock = jest.spyOn(service, 'findById');

      resolver.exercise(id);

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(id);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.exercise(id);

      expect(result).toBe(data.mockExercise);
    });
  });

  describe('.addExercise() mutation', () => {
    it("should pass it's parameters to exercises service", () => {
      const insertMock = jest.spyOn(service, 'insert');

      resolver.addExercise(data.mockAddExerciseInput);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(data.mockAddExerciseInput);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.addExercise(data.mockAddExerciseInput);

      expect(result).toBe(data.mockExercise);
    });
  });

  describe('.updateExercise() mutation', () => {
    const { id } = data.mockExercise;

    it("should pass it's parameters to exercises service", () => {
      const updateMock = jest.spyOn(service, 'update');

      resolver.updateExercise(id, data.mockUpdateExerciseInput);

      expect(updateMock).toBeCalledTimes(1);
      expect(updateMock).toBeCalledWith(id, data.mockUpdateExerciseInput);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.updateExercise(
        id,
        data.mockUpdateExerciseInput,
      );

      expect(result).toBe(data.mockUpdatedExercise);
    });
  });
});
