import { formatAppError } from './app.errors';
import { mockGqlError } from './test-data';

describe('formatAppError()', () => {
  it.each<string>(['message', 'path'])(
    'should return %p property of the original error',
    (property: string) => {
      const result = formatAppError(mockGqlError);

      expect(result[property]).toBe(mockGqlError[property]);
    },
  );

  it.each<string>(['locations', 'extensions'])(
    'should remove %p property of the original error',
    (property: string) => {
      const result = formatAppError(mockGqlError);

      expect(result).not.toHaveProperty(property);
    },
  );
});
