import { Test } from '@nestjs/testing';
import { groupsData as data } from 'src/shared/test-data';
import { groupsMocks as mocks } from 'src/shared/test-mocks';
import { GroupsResolver } from '../groups.resolver';
import { GroupsService } from '../groups.service';

describe('GroupsResolver', () => {
  let service: GroupsService;
  let resolver: GroupsResolver;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsResolver,
        { provide: GroupsService, useValue: mocks.mockGroupsService },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    resolver = module.get<GroupsResolver>(GroupsResolver);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.groups() query', () => {
    it('should try to get all groups from groups service', () => {
      resolver.groups();

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith();
    });

    it('should return all groups returned by groups service', async () => {
      const result = await resolver.groups();

      expect(result).toBe(data.groups);
    });
  });

  describe('.group() query', () => {
    const { id } = data.group;

    it('should try to find group via groups service', () => {
      resolver.group(id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id);
    });

    it('should return the group returned by groups service', async () => {
      const result = await resolver.group(id);

      expect(result).toBe(data.group);
    });
  });
});
