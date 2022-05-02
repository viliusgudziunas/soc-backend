import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { exceptionFiltersMocks as mocks } from 'src/shared/test-mocks';
import { EntityNotFoundError } from 'typeorm';
import { locale } from '../locale';
import { EntityNotFoundErrorFilter } from './entity-not-found-error.filter';

describe('EntityNotFoundErrorFilter', () => {
  let filter: EntityNotFoundErrorFilter;
  let host: ArgumentsHost;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EntityNotFoundErrorFilter],
    }).compile();

    filter = module.get<EntityNotFoundErrorFilter>(EntityNotFoundErrorFilter);
    host = mocks.mockHost();
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('handle()', () => {
    const id = 1;
    const expectedMessage = locale.entityNotFoundMessage
      .replace('%entity', 'Object')
      .replace('%id', String(id));

    let error: EntityNotFoundError;

    beforeEach(() => {
      error = new EntityNotFoundError(Object, id);
      mocks.mockHostGetArgByIndex(host, { id });
    });

    it('should return HttpException', () => {
      const result = filter.catch(error, host);

      expect(result).toBeInstanceOf(HttpException);
    });

    it('should return NOT_FOUND status', () => {
      const result = filter.catch(error, host);

      expect(result.getStatus()).toBe(HttpStatus.NOT_FOUND);
    });

    it('should return correct entityNotFoundMessage', () => {
      const result = filter.catch(error, host);

      expect(result.getResponse()).toBe(expectedMessage);
    });
  });
});
