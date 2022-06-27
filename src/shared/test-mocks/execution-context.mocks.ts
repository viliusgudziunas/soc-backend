import { createMock } from '@golevelup/ts-jest';
import {
  ArgumentsHost as RealArgumentsHost,
  ExecutionContext as RealExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ArgumentsHost: RealArgumentsHost = {
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToHttp: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

export const ExecutionContext: RealExecutionContext = {
  ...ArgumentsHost,
  getClass: jest.fn(),
  getHandler: jest.fn(),
};

export const mockGetArgByIndex = (
  host: RealArgumentsHost,
  args: { [key: string]: unknown },
): jest.SpyInstance =>
  jest.spyOn(host, 'getArgByIndex').mockImplementation(() => args);

export const mockCreateGqlContext = (
  gqlContext: Partial<GqlExecutionContext>,
): jest.SpyInstance =>
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(createMock<GqlExecutionContext>(gqlContext));

export const getInfoMock: jest.Mock = jest.fn().mockReturnValue({
  fieldNodes: [1],
});

export const getContext: jest.Mock = jest.fn().mockReturnValue({
  req: {},
});
