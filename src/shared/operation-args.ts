import { Int } from '@nestjs/graphql';

export const operationArgs = {
  id: { name: 'id', type: () => Int },
};
