import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { groupsData as data } from 'src/shared/test-data';
import { groupsMocks as mocks } from 'src/shared/test-mocks';
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
    it('should try to get groups from repository', () => {
      service.findAll();

      expect(repository.find).toBeCalledTimes(1);
      expect(repository.find).toBeCalledWith();
    });

    it('should return all groups returned by repository', async () => {
      const result = await service.findAll();

      expect(result).toBe(data.groups);
    });
  });

  describe('.findById()', () => {
    const { id } = data.group;

    it('should try to get group from repository', () => {
      service.findById(id);

      expect(repository.findOneOrFail).toBeCalledTimes(1);
      expect(repository.findOneOrFail).toBeCalledWith(id);
    });

    it('should return the group returned by repository', async () => {
      const result = await service.findById(id);

      expect(result).toBe(data.group);
    });
  });

  describe('.insert()', () => {
    it('should try to insert group into repository', () => {
      service.insert(data.insertGroupParams);

      expect(repository.insert).toBeCalledTimes(1);
      expect(repository.insert).toBeCalledWith(data.insertGroupParams);
    });

    it('should return the id returned by repository', async () => {
      const { id } = data.insertGroupResponse.identifiers[0];

      const result = await service.insert(data.insertGroupParams);

      expect(result).toBe(id);
    });
  });
});
