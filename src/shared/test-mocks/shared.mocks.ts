import { Repository } from 'typeorm';

export const mockFind = <T>(
  repository: Repository<T>,
  result: T[],
): jest.SpyInstance => jest.spyOn(repository, 'find').mockResolvedValue(result);
