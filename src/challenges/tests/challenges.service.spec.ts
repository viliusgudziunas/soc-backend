import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { challengesData as data } from 'src/shared/test-data';
import { challengesMocks as mocks, sharedMocks } from 'src/shared/test-mocks';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { Challenge } from '../challenge.entity';
import { ChallengesService } from '../challenges.service';

describe('ChallengesService', () => {
  let repository: Repository<Challenge>;
  let service: ChallengesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Challenge);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChallengesService,
        { provide: REPOSITORY_TOKEN, useValue: mocks.mockRepository },
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
    repository = module.get<Repository<Challenge>>(REPOSITORY_TOKEN);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.findAll()', () => {
    it('should try get all challenges from repository', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith();
    });

    it('should return all challenges found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.mockChallenges);
    });

    it('should return empty array when no challenges exist in repository', async () => {
      sharedMocks.mockFind<Challenge>(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });

  describe('.findById()', () => {
    const { id } = data.mockChallenge;

    it('should try get a challenge from repository by id', () => {
      service.findById(id);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id);
    });

    it('should return the challenge it got back from repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(data.mockChallenge);
    });

    it('should not handle errors thrown by repository', async () => {
      const error = new EntityNotFoundError(Challenge, id);
      sharedMocks.mockFindOneOrFailError<Challenge>(repository, error);

      await expect(service.findById(id)).rejects.toThrowError(error);
    });
  });

  describe('.insert()', () => {
    let findByIdMock: jest.SpyInstance;

    beforeEach(() => {
      findByIdMock = mocks.mockFindById(service, data.mockChallenge);
    });

    it('should try insert a new challenge into repository', async () => {
      await service.insert(data.mockInsertChallengeParams);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(data.mockInsertChallengeParams);
    });

    it('should try to get an challenge from challenges service', async () => {
      await service.insert(data.mockInsertChallengeParams);
      const identifierId = data.mockInsertChallengeResponse.identifiers[0].id;

      expect(findByIdMock).toBeCalledTimes(1);
      expect(findByIdMock).toBeCalledWith(identifierId);
    });

    it('should return the challenge which was just added', async () => {
      const result = await service.insert(data.mockInsertChallengeParams);

      expect(result).toBe(data.mockChallenge);
    });

    it('should not handle errors thrown by repository', async () => {
      const error = new QueryFailedError('', [], {});
      sharedMocks.mockInsertError<Challenge>(repository, error);

      await expect(
        service.insert(data.mockInsertChallengeParams),
      ).rejects.toThrowError(error);
    });
  });
});