import { formatAppError } from './app.errors';
import * as td from './test.data';

describe('formatAppError()', () => {
  it.each<string>(['message', 'path'])(
    'should return %p property of the original error',
    (property: string) => {
      const result = formatAppError(td.mockGqlError);

      expect(result[property]).toBe(td.mockGqlError[property]);
    },
  );

  it.each<string>(['locations', 'extensions'])(
    'should remove %p property of the original error',
    (property: string) => {
      const result = formatAppError(td.mockGqlError);

      expect(result).not.toHaveProperty(property);
    },
  );
});
