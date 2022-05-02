import { Test } from '@nestjs/testing';
import { challengesData as data } from 'src/shared/test-data';
import { challengesMocks as mocks } from 'src/shared/test-mocks';
import { ChallengesResolver } from '../challenges.resolver';
import { ChallengesService } from '../challenges.service';

describe('ChallengesResolver', () => {
  let service: ChallengesService;
  let resolver: ChallengesResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChallengesResolver,
        { provide: ChallengesService, useValue: mocks.mockChallengesService },
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
    resolver = module.get<ChallengesResolver>(ChallengesResolver);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.challenges() query', () => {
    it('should try get all challenges from challenges service', () => {
      resolver.challenges();

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith();
    });

    it('should return all challenges found by challenges service', async () => {
      const result = await resolver.challenges();

      expect(result).toBe(data.challenges);
    });
  });

  describe('.challenge() query', () => {
    const { id } = data.challenge;

    it('should pass id to challenges service', () => {
      resolver.challenge(id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the result it gets back from challenges service', async () => {
      const result = await resolver.challenge(id);

      expect(result).toBe(data.challenge);
    });
  });

  describe('.addChallenge() mutation', () => {
    const { id } = data.challenge;

    it('should try to insert challenge via challenges service', () => {
      resolver.addChallenge(data.addChallengeInput);

      expect(service.insert).toBeCalledTimes(1);
      expect(service.insert).toBeCalledWith(data.addChallengeInput);
    });

    it('should try to find the inserted challenge via challenges service', async () => {
      await resolver.addChallenge(data.addChallengeInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the challenge it gets back from challenges service', async () => {
      const result = await resolver.addChallenge(data.addChallengeInput);

      expect(result).toBe(data.challenge);
    });
  });

  describe('.updateChallenge() mutation', () => {
    const { id } = data.challenge;

    it('should try to update challenge via challenges service', () => {
      resolver.updateChallenge(id, data.updateChallengeInput);

      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, data.updateChallengeInput);
    });

    it('should try to find the updated challenge via challenges service', async () => {
      await resolver.updateChallenge(id, data.updateChallengeInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the challenge it gets back from challenges service', async () => {
      mocks.mockFindById(service, data.updatedChallenge);

      const result = await resolver.updateChallenge(
        id,
        data.updateChallengeInput,
      );

      expect(result).toBe(data.updatedChallenge);
    });
  });
});
