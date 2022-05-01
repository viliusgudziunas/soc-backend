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

      expect(result).toBe(data.mockChallenges);
    });
  });

  describe('.challenge() query', () => {
    const { id } = data.mockChallenge;

    it('should pass id to challenges service', () => {
      resolver.challenge(id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the result it gets back from challenges service', async () => {
      const result = await resolver.challenge(id);

      expect(result).toBe(data.mockChallenge);
    });
  });

  describe('.addChallenge() mutation', () => {
    it("should pass it's parameters to challenges service", () => {
      const insertMock = jest.spyOn(service, 'insert');

      resolver.addChallenge(data.mockAddChallengeInput);

      expect(insertMock).toBeCalledTimes(1);
      expect(insertMock).toBeCalledWith(data.mockAddChallengeInput);
    });

    it('should return the result it gets back from challenges service', async () => {
      const result = await resolver.addChallenge(data.mockAddChallengeInput);

      expect(result).toBe(data.mockChallenge);
    });
  });
});
