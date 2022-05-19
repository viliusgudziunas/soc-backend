import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { challengesData as data } from 'src/shared/test-data';
import { challengesMocks as mocks } from 'src/shared/test-mocks';
import { Repository } from 'typeorm';
import { Challenge } from '../challenge.entity';
import { ChallengesService } from '../challenges.service';

describe('ChallengesService', () => {
  let repository: Repository<Challenge>;
  let service: ChallengesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Challenge);
  const relations = { relations: Challenge.relations };

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
    it('should try to get challenges and their relations from repository', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith(relations);
    });

    it('should return all challenges returned by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.challenges);
    });
  });

  describe('.findById()', () => {
    const { id } = data.challenge;

    it('should try to get challenge and its relations from repository', () => {
      service.findById(id);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id, relations);
    });

    it('should return the challenge returned by repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(data.challenge);
    });
  });

  describe('.insert()', () => {
    it('should try to insert challenge into repository', () => {
      service.insert(data.insertChallengeParams);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(data.insertChallengeParams);
    });

    it('should return the id returned by repository', async () => {
      const { id } = data.insertChallengeResponse.identifiers[0];

      const result = await service.insert(data.insertChallengeParams);

      expect(result).toBe(id);
    });
  });

  describe('.update()', () => {
    it('should try to update challenge via repository', () => {
      const { id } = data.challenge;

      service.update(id, data.updateChallengeParams);

      expect(repository.update).toBeCalledTimes(1);
      expect(repository.update).toBeCalledWith(id, data.updateChallengeParams);
    });
  });
});
