import { InstanceToken } from '@nestjs/core/injector/module';
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
      providers: [ChallengesResolver],
    })
      .useMocker((token: InstanceToken) => {
        if (token === ChallengesService) {
          return mocks.mockChallengesService;
        }
      })
      .compile();

    service = module.get<ChallengesService>(ChallengesService);
    resolver = module.get<ChallengesResolver>(ChallengesResolver);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.challenges() query', () => {
    it('should try get all challenges from challenges service', () => {
      const findAllMock = jest.spyOn(service, 'findAll');

      resolver.challenges();

      expect(findAllMock).toBeCalledTimes(1);
      expect(findAllMock).toBeCalledWith();
    });

    it('should return all challenges found by challenges service', async () => {
      const result = await resolver.challenges();

      expect(result).toBe(data.mockChallenges);
    });
  });
});
