import { Test } from '@nestjs/testing';
import { RelationsService } from 'src/services/relations.service';
import { exercisesData as data } from 'src/shared/test-data';
import { exercisesMocks as mocks } from 'src/shared/test-mocks';
import { ExercisesResolver } from '../exercises.resolver';
import { ExercisesService } from '../exercises.service';

describe('ExercisesResolver', () => {
  let resolver: ExercisesResolver;
  let service: ExercisesService;
  let relationsService: RelationsService;

  const fieldMap = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExercisesResolver,
        { provide: ExercisesService, useValue: mocks.mockExercisesService },
        { provide: RelationsService, useValue: mocks.relationsServiceMock },
      ],
    }).compile();

    resolver = module.get<ExercisesResolver>(ExercisesResolver);
    service = module.get<ExercisesService>(ExercisesService);
    relationsService = module.get<RelationsService>(RelationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.exercises() query', () => {
    it('should construct relations via relations service', () => {
      resolver.exercises(fieldMap);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get all exercises from exercises service', () => {
      resolver.exercises(fieldMap);

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith(data.relations);
    });

    it('should return the exercises returned by exercises service', async () => {
      const result = await resolver.exercises(fieldMap);

      expect(result).toBe(data.exercises);
    });
  });

  describe('.exercise() query', () => {
    const { id } = data.exercise;

    it('should construct relations via relations service', () => {
      resolver.exercise(fieldMap, id);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get exercise via exercises service', () => {
      resolver.exercise(fieldMap, id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the exercise returned by exercises service', async () => {
      const result = await resolver.exercise(fieldMap, id);

      expect(result).toBe(data.exercise);
    });
  });

  describe('.addExercise() mutation', () => {
    const { id } = data.exercise;

    it('should insert exercise via exercises service', () => {
      resolver.addExercise(fieldMap, data.addExerciseInput);

      expect(service.insert).toBeCalledTimes(1);
      expect(service.insert).toBeCalledWith(data.addExerciseInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.addExercise(fieldMap, data.addExerciseInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get the inserted exercise via exercises service', async () => {
      await resolver.addExercise(fieldMap, data.addExerciseInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the exercise returned by exercises service', async () => {
      const result = await resolver.addExercise(
        fieldMap,
        data.addExerciseInput,
      );

      expect(result).toBe(data.exercise);
    });
  });

  describe('.updateExercise() mutation', () => {
    const { id } = data.exercise;

    it('should update exercise via exercises service', () => {
      resolver.updateExercise(fieldMap, id, data.updateExerciseInput);

      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, data.updateExerciseInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.updateExercise(fieldMap, id, data.updateExerciseInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should find the updated exercise via exercises service', async () => {
      await resolver.updateExercise(fieldMap, id, data.updateExerciseInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the exercise returned by exercises service', async () => {
      mocks.mockFindById(service, data.updatedExercise);

      const result = await resolver.updateExercise(
        fieldMap,
        id,
        data.updateExerciseInput,
      );

      expect(result).toBe(data.updatedExercise);
    });
  });
});
