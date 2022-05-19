import { Group } from 'src/groups/group.entity';

export const group: Group = {
  id: 1,
  name: 'Test group',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const groups: Group[] = [group];
