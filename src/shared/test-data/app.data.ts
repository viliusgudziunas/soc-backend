import { HealthCheckResult, HealthIndicatorResult } from '@nestjs/terminus';
import { GraphQLError } from 'graphql';

export const gqlError: GraphQLError = {
  message: "GraphQLError: Exercise was not found with ID '112'",
  path: ['exercise'],
  extensions: {
    code: 'INTERNAL_SERVER_ERROR',
    exception: { code: '0', stacktrace: ['Array'] },
  },
  [Symbol.toStringTag]: undefined,
  locations: [{ line: 24, column: 3 }],
  name: undefined,
  nodes: undefined,
  originalError: undefined,
  positions: undefined,
  source: undefined,
  toJSON: undefined,
};

export const appHealth: HealthCheckResult = {
  status: 'ok',
  info: { database: { status: 'up' } },
  error: {},
  details: { database: { status: 'up' } },
};

export const dbHealthCheckResult: HealthIndicatorResult = {
  database: { status: 'up' },
};
