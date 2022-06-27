import { Test } from '@nestjs/testing';
import { RelationsService } from 'src/services/relations.service';
import { groupsData as data } from 'src/shared/test-data';
import { groupsMocks as mocks } from 'src/shared/test-mocks';
import { GroupsResolver } from '../groups.resolver';
import { GroupsService } from '../groups.service';

describe('GroupsResolver', () => {
  let resolver: GroupsResolver;
  let service: GroupsService;
  let relationsService: RelationsService;

  const fieldMap = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsResolver,
        { provide: GroupsService, useValue: mocks.GroupsService },
        { provide: RelationsService, useValue: mocks.RelationsService },
      ],
    }).compile();

    resolver = module.get<GroupsResolver>(GroupsResolver);
    service = module.get<GroupsService>(GroupsService);
    relationsService = module.get<RelationsService>(RelationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('.groups() query', () => {
    it('should construct relations via relations service', () => {
      resolver.groups(fieldMap);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get all groups from groups service', () => {
      resolver.groups(fieldMap);

      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith(data.relations);
    });

    it('should return the groups returned by groups service', async () => {
      const result = await resolver.groups(fieldMap);

      expect(result).toBe(data.groups);
    });
  });

  describe('.group() query', () => {
    const { id } = data.group;

    it('should construct relations via relations service', () => {
      resolver.group(fieldMap, id);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get group via groups service', () => {
      resolver.group(fieldMap, id);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the group returned by groups service', async () => {
      const result = await resolver.group(fieldMap, id);

      expect(result).toBe(data.group);
    });
  });

  describe('.addGroup() mutation', () => {
    const { id } = data.group;

    it('should insert group via groups service', () => {
      resolver.addGroup(fieldMap, data.addGroupInput);

      expect(service.insert).toBeCalledTimes(1);
      expect(service.insert).toBeCalledWith(data.addGroupInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.addGroup(fieldMap, data.addGroupInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should get the inserted group via groups service', async () => {
      await resolver.addGroup(fieldMap, data.addGroupInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the group returned by groups service', async () => {
      const result = await resolver.addGroup(fieldMap, data.addGroupInput);

      expect(result).toBe(data.group);
    });
  });

  describe('.updateGroup() mutation', () => {
    const { id } = data.group;

    it('should update group via groups service', () => {
      resolver.updateGroup(fieldMap, id, data.updateGroupInput);

      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, data.updateGroupInput);
    });

    it('should construct relations via relations service', async () => {
      await resolver.updateGroup(fieldMap, id, data.updateGroupInput);

      expect(relationsService.constructRelations).toBeCalledTimes(1);
      expect(relationsService.constructRelations).toBeCalledWith(fieldMap);
    });

    it('should find the updated group via groups service', async () => {
      await resolver.updateGroup(fieldMap, id, data.updateGroupInput);

      expect(service.findById).toBeCalledTimes(1);
      expect(service.findById).toBeCalledWith(id, data.relations);
    });

    it('should return the group returned by groups service', async () => {
      mocks.mockFindById(service, data.updatedGroup);

      const result = await resolver.updateGroup(
        fieldMap,
        id,
        data.updateGroupInput,
      );

      expect(result).toBe(data.updatedGroup);
    });
  });
});
