import { createMock } from '@golevelup/ts-jest';
import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const mockHost: ArgumentsHost = {
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToHttp: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

export const mockHostGetArgByIndex = (
  host: ArgumentsHost,
  args: { [key: string]: unknown },
): jest.SpyInstance =>
  jest.spyOn(host, 'getArgByIndex').mockImplementation(() => args);

export const executionContextMock: ExecutionContext = {
  ...mockHost,
  getClass: jest.fn(),
  getHandler: jest.fn(),
};

export const getInfoMock: jest.Mock = jest.fn().mockReturnValue({
  fieldNodes: [1],
});

export const getContext: jest.Mock = jest.fn().mockReturnValue({
  req: {},
});

export const mockGqlExecutionContextCreate = (gqlContextMock: {
  getInfo?: jest.Mock;
  getContext?: jest.Mock;
}): jest.SpyInstance =>
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(createMock<GqlExecutionContext>(gqlContextMock));
