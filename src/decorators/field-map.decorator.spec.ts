import { FieldNode } from 'graphql';
import { fieldMapDecoratorData as data } from 'src/shared/test-data';
import { fieldMapDecoratorMocks as mocks } from 'src/shared/test-mocks';
import { getNodeData, makeFieldMap } from './field-map.decorator';

describe('FieldMap decorator', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getNodeData()', () => {
    it('should return null if selectionNode was not provided', () => {
      const result = getNodeData(null as FieldNode);

      expect(result).toBeNull();
    });

    it('should return null if selectionSet is falsy in provided node', () => {
      const result = getNodeData(data.fieldNode);

      expect(result).toBeNull();
    });

    it("should return empty object if selectionSet doesn't have selections in provided node", () => {
      const result = getNodeData(data.fieldNodeWithEmptySelections);

      expect(result).toStrictEqual({});
    });

    it('should return object with fields if selectionSet has selections in provided node', () => {
      const result = getNodeData(data.fieldNodeWithSelections);

      expect(result).toStrictEqual(data.fieldMap);
    });

    it('should support nested nodes', () => {
      const result = getNodeData(data.fieldNodeWithNestedSelections);

      expect(result).toStrictEqual(data.fieldMapWithNestedSelections);
    });
  });

  describe('makeFieldMap()', () => {
    const ctx = mocks.executionContextMock;
    const getInfoMock = mocks.getInfoMock;

    it('should create graphQL execution context with the passed in context', () => {
      const createContextMock =
        mocks.mockGqlExecutionContextCreate(getInfoMock);

      makeFieldMap(null, ctx);

      expect(createContextMock).toHaveBeenCalledTimes(1);
      expect(createContextMock).toHaveBeenCalledWith(ctx);
    });

    it('should get info from graphQL execution context', () => {
      mocks.mockGqlExecutionContextCreate(getInfoMock);

      makeFieldMap(null, ctx);

      expect(getInfoMock).toHaveBeenCalledTimes(1);
      expect(getInfoMock).toHaveBeenCalledWith();
    });

    it('should call getNodeData with the first node found in graphQL execution context info', () => {
      const getNodeDataMock = mocks.mockGetNodeData();
      mocks.mockGqlExecutionContextCreate(getInfoMock);

      makeFieldMap(null, ctx);

      const node = getInfoMock().fieldNodes[0];

      expect(getNodeDataMock).toHaveBeenCalledTimes(1);
      expect(getNodeDataMock).toHaveBeenCalledWith(node);
    });

    it('should return the object returned by getNodeData', () => {
      mocks.mockGetNodeData({});
      mocks.mockGqlExecutionContextCreate(getInfoMock);

      const result = makeFieldMap(null, ctx);

      expect(result).toStrictEqual({});
    });
  });
});
