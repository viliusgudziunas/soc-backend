import { groupsData as data } from 'src/shared/test-data';

export const mockGroupsService = {
  findAll: jest.fn().mockResolvedValue(data.groups),
  findById: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.group.id),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.groups),
  findOneOrFail: jest.fn().mockResolvedValue(data.group),
  insert: jest.fn().mockResolvedValue(data.insertGroupResponse),
};
