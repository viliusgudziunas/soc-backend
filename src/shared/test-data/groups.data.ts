import { AddGroupInput, Group } from 'src/groups/group.entity';
import { GroupParams } from 'src/groups/groups.types';
import { InsertResult } from 'typeorm';

export const group: Group = {
  id: 1,
  name: 'Test group',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const groups: Group[] = [group];

export const addGroupInput: AddGroupInput = { name: 'Test group' };

export const insertGroupParams: GroupParams = addGroupInput;

export const insertGroupResponse: InsertResult = {
  identifiers: [{ id: 1 }],
  generatedMaps: [],
  raw: {},
};
