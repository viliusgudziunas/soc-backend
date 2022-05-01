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
      resolver.exercises();

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith();
    });

    it('should return all exercises found by exercises service', async () => {
      const result = await resolver.exercises();

      expect(result).toBe(data.mockExercises);
    });
  });

  describe('.exercise() query', () => {
    const { id } = data.mockExercise;

    it('should pass id to exercises service', () => {
      resolver.exercise(id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the result it gets back from exercises service', async () => {
      const result = await resolver.exercise(id);

      expect(result).toBe(data.mockExercise);
    });
  });

  describe('.addExercise() mutation', () => {
    const { id } = data.mockExercise;

    it('should try to insert exercise via exercises service', () => {
      resolver.addExercise(data.mockAddExerciseInput);

      expect(service.insert).toBeCalledTimes(1);
      expect(service.insert).toBeCalledWith(data.mockAddExerciseInput);
    });

    it('should try to find the inserted exercise via exercises service', async () => {
      await resolver.addExercise(data.mockAddExerciseInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the exercise it gets back from exercises service', async () => {
      const result = await resolver.addExercise(data.mockAddExerciseInput);

      expect(result).toBe(data.mockExercise);
    });
  });

  describe('.updateExercise() mutation', () => {
    const { id } = data.mockExercise;

    it('should try to update exercise via exercises service', () => {
      resolver.updateExercise(id, data.mockUpdateExerciseInput);

      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, data.mockUpdateExerciseInput);
    });

    it('should try to find the updated exercise via exercises service', async () => {
      await resolver.updateExercise(id, data.mockUpdateExerciseInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the exercise it gets back from exercises service', async () => {
      mocks.mockFindById(service, data.mockUpdatedExercise);

      const result = await resolver.updateExercise(
        id,
        data.mockUpdateExerciseInput,
      );

      expect(result).toBe(data.mockUpdatedExercise);
    });
  });
});
