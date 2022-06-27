import { executionContextMocks as mocks } from 'src/shared/test-mocks';
import { JwtAuthGuard } from '../jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('.getRequest()', () => {
    const context = mocks.ExecutionContext;
    const getContextMock = mocks.getContext;
    const gqlContextMock = { getContext: getContextMock };

    it('should create graphQL execution context with the passed in context', () => {
      const createContextMock = mocks.mockCreateGqlContext({});

      guard.getRequest(context);

      expect(createContextMock).toHaveBeenCalledTimes(1);
      expect(createContextMock).toHaveBeenCalledWith(context);
    });

    it('should get context from graphQL execution context', () => {
      mocks.mockCreateGqlContext(gqlContextMock);

      guard.getRequest(context);

      expect(getContextMock).toHaveBeenCalledTimes(1);
      expect(getContextMock).toHaveBeenCalledWith();
    });

    it('should return req from graphQL execution context', () => {
      mocks.mockCreateGqlContext(gqlContextMock);

      const request = guard.getRequest(context);

      expect(request).toBe(mocks.getContext().req);
    });
  });
});
