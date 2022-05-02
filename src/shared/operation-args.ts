import { Int } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';

export const operationArgs = {
  id: { name: 'id', type: (): GraphQLScalarType => Int },
};
