import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

export const mockHttpException = (
  message = 'Test exception',
  status = HttpStatus.INTERNAL_SERVER_ERROR,
): HttpException => new HttpException(message, status);

export const mockFind = <T>(
  repository: Repository<T>,
  result: T[],
): jest.SpyInstance => jest.spyOn(repository, 'find').mockResolvedValue(result);

export const mockFindOneOrFailError = <T>(
  repository: Repository<T>,
  error: Error,
): jest.SpyInstance =>
  jest.spyOn(repository, 'findOneOrFail').mockRejectedValue(error);
