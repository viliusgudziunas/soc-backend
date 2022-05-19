import { Group } from 'src/groups/group.entity';
import { GroupsService } from 'src/groups/groups.service';
import { groupsData as data } from 'src/shared/test-data';

export const mockGroupsService = {
  findAll: jest.fn().mockResolvedValue(data.groups),
  findById: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.group.id),
  update: jest.fn().mockResolvedValue(data.updatedGroup),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.groups),
  findOneOrFail: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.insertGroupResponse),
  update: jest.fn(),
};

export const mockFindById = (
  service: GroupsService,
  group: Group,
): jest.SpyInstance => jest.spyOn(service, 'findById').mockResolvedValue(group);
