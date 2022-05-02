import { appData as data } from 'src/shared/test-data';
import { formatAppError } from './app.errors';

describe('formatAppError()', () => {
  it.each<string>(['message', 'path'])(
    'should return %p property of the original error',
    (property: string) => {
      const result = formatAppError(data.gqlError);

      expect(result[property]).toBe(data.gqlError[property]);
    },
  );

  it.each<string>(['locations', 'extensions'])(
    'should remove %p property of the original error',
    (property: string) => {
      const result = formatAppError(data.gqlError);

      expect(result).not.toHaveProperty(property);
    },
  );
});
