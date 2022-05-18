import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { groupsData as data } from 'src/shared/test-data';
import { groupsMocks as mocks, sharedMocks } from 'src/shared/test-mocks';
import { Repository } from 'typeorm';
import { Group } from '../group.entity';
import { GroupsService } from '../groups.service';

describe('GroupsService', () => {
  let repository: Repository<Group>;
  let service: GroupsService;

  const REPOSITORY_TOKEN = getRepositoryToken(Group);

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: REPOSITORY_TOKEN, useValue: mocks.mockRepository },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    repository = module.get<Repository<Group>>(REPOSITORY_TOKEN);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.findAll()', () => {
    it('should try get all groups from repository', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith();
    });

    it('should return all groups found by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.groups);
    });

    it('should return empty array when no groups exist in repository', async () => {
      sharedMocks.mockFind<Group>(repository, []);

      const result = await service.findAll();

      expect(result).toStrictEqual([]);
    });
  });
});
