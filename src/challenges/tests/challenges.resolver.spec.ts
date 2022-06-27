import { Test } from '@nestjs/testing';
import { RelationsService } from 'src/services/relations.service';
import { challengesData as data } from 'src/shared/test-data';
import { challengesMocks as mocks } from 'src/shared/test-mocks';
import { ChallengesResolver } from '../challenges.resolver';
import { ChallengesService } from '../challenges.service';

describe('ChallengesResolver', () => {
  let resolver: ChallengesResolver;
  let service: ChallengesService;
  let relationsService: RelationsService;

  const fieldMap = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChallengesResolver,
        { provide: ChallengesService, useValue: mocks.ChallengesService },
        { provide: RelationsService, useValue: mocks.RelationsService },
      ],
    }).compile();

    resolver = module.get<ChallengesResolver>(ChallengesResolver);
    service = module.get<ChallengesService>(ChallengesService);
    relationsService = module.get<RelationsService>(RelationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.challenges() query', () => {
    it('should construct relations via relations service', () => {
      resolver.challenges(fieldMap);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get all challenges from challenges service', () => {
      resolver.challenges(fieldMap);

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith(data.relations);
    });

    it('should return the challenges returned by challenges service', async () => {
      const result = await resolver.challenges(fieldMap);

      expect(result).toBe(data.challenges);
    });
  });

  describe('.challenge() query', () => {
    const { id } = data.challenge;

    it('should construct relations via relations service', () => {
      resolver.challenge(fieldMap, id);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get challenge via challenges service', () => {
      resolver.challenge(fieldMap, id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the challenge returned by challenges service', async () => {
      const result = await resolver.challenge(fieldMap, id);

      expect(result).toBe(data.challenge);
    });
  });

  describe('.addChallenge() mutation', () => {
    const { id } = data.challenge;

    it('should insert challenge via challenges service', () => {
      resolver.addChallenge(fieldMap, data.addChallengeInput);

      expect(service.insert).toBeCalledTimes(1);
      expect(service.insert).toBeCalledWith(data.addChallengeInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.addChallenge(fieldMap, data.addChallengeInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get the inserted challenge via challenges service', async () => {
      await resolver.addChallenge(fieldMap, data.addChallengeInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the challenge returned by challenges service', async () => {
      const result = await resolver.addChallenge(
        fieldMap,
        data.addChallengeInput,
      );

      expect(result).toBe(data.challenge);
    });
  });

  describe('.updateChallenge() mutation', () => {
    const { id } = data.challenge;

    it('should update challenge via challenges service', () => {
      resolver.updateChallenge(fieldMap, id, data.updateChallengeInput);

      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, data.updateChallengeInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.updateChallenge(fieldMap, id, data.updateChallengeInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should find the updated challenge via challenges service', async () => {
      await resolver.updateChallenge(fieldMap, id, data.updateChallengeInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the challenge returned by challenges service', async () => {
      mocks.mockFindById(service, data.updatedChallenge);

      const result = await resolver.updateChallenge(
        fieldMap,
        id,
        data.updateChallengeInput,
      );

      expect(result).toBe(data.updatedChallenge);
    });
  });
});
