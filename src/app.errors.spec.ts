import { appData as data } from 'src/shared/test-data';
import { formatAppError } from './app.errors';

describe('formatAppError()', () => {
  it.each<string>(['message', 'path'])(
    'should return %p property of the original error',
    (property: string) => {
      const result = formatAppError(data.mockGqlError);

      expect(result[property]).toBe(data.mockGqlError[property]);
    },
  );

  it.each<string>(['locations', 'extensions'])(
    'should remove %p property of the original error',
    (property: string) => {
      const result = formatAppError(data.mockGqlError);

      expect(result).not.toHaveProperty(property);
    },
  );
});
