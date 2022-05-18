import { groupsData as data } from '../test-data';

export const mockGroupsService = {
  findAll: jest.fn().mockResolvedValue(data.groups),
};

export const mockRepository = {
  find: jest.fn().mockResolvedValue(data.groups),
};
