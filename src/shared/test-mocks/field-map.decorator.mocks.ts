import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as fieldMapFunctions from 'src/decorators/field-map.decorator';
import { FieldMapType } from 'src/decorators/field-map.types';
import { mockHost } from 'src/shared/test-mocks/exception-filters.mocks';

export const executionContextMock: ExecutionContext = {
  ...mockHost,
  getClass: jest.fn(),
  getHandler: jest.fn(),
};

export const getInfoMock: jest.Mock = jest.fn().mockReturnValue({
  fieldNodes: [1],
});

export const mockGqlExecutionContextCreate = (
  getInfoMock: jest.Mock,
): jest.SpyInstance =>
  jest
    .spyOn(GqlExecutionContext, 'create')
    .mockReturnValue(createMock<GqlExecutionContext>({ getInfo: getInfoMock }));

export const mockGetNodeData = (
  returnValue: FieldMapType = {},
): jest.SpyInstance =>
  jest.spyOn(fieldMapFunctions, 'getNodeData').mockReturnValue(returnValue);
