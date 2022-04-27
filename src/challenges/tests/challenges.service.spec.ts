import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../challenge.entity';
import { ChallengesService } from '../challenges.service';
import * as td from './test.data';
import * as tm from './test.mocks';

describe('ChallengesService', () => {
  let repository: Repository<Challenge>;
  let service: ChallengesService;

  const REPOSITORY_TOKEN = getRepositoryToken(Challenge);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChallengesService,
        { provide: REPOSITORY_TOKEN, useValue: tm.mockRepository },
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
      const findMock = jest.spyOn(repository, 'find');

      service.findAll();

      expect(findMock).toBeCalledTimes(1);
      expect(findMock).toBeCalledWith();
    });

    it('should return all challenges found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(td.mockChallenges);
    });

    it('should return empty array when no challenges exist in repository', async () => {
      tm.mockFindAll(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });
});
