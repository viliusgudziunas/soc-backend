import { Group } from 'src/groups/group.entity';
import { GroupsService as RealGroupsService } from 'src/groups/groups.service';
import { groupsData as data } from 'src/shared/test-data';

export const GroupsService = {
  findAll: jest.fn().mockResolvedValue(data.groups),
  findById: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.group.id),
  update: jest.fn().mockResolvedValue(data.updatedGroup),
};

export const Repository = {
  find: jest.fn().mockResolvedValue(data.groups),
  findOneOrFail: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.insertGroupResponse),
  update: jest.fn(),
};

export const RelationsService = {
  constructRelations: jest.fn().mockReturnValue(data.relations),
};

export const mockFindById = (
  service: RealGroupsService,
  group: Group,
): jest.SpyInstance => jest.spyOn(service, 'findById').mockResolvedValue(group);
