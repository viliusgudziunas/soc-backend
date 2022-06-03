import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { locale } from 'src/shared/locale';
import { exceptionFiltersMocks as mocks } from 'src/shared/test-mocks';
import { QueryFailedError } from 'typeorm';
import { QueryFailedErrorFilter } from './query-failed-error.filter';

describe('QueryFailedErrorFilter', () => {
  let filter: QueryFailedErrorFilter;
  let host: ArgumentsHost;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [QueryFailedErrorFilter],
    }).compile();

    filter = module.get<QueryFailedErrorFilter>(QueryFailedErrorFilter);
    host = mocks.mockHost;
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('handle()', () => {
    const detail = 'Key (testKey)=(TestValue) already exists.';

    let error: QueryFailedError;

    beforeEach(() => {
      error = new QueryFailedError('', [], { detail });
    });

    it('should return HttpException', () => {
      const result = filter.catch(error, host);

      expect(result).toBeInstanceOf(HttpException);
    });

    it('should return BAD_REQUEST status', () => {
      const result = filter.catch(error, host);

      expect(result.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should return correct entityNotFoundMessage', () => {
      const expectedMessage = locale.queryFailedMessage.replace(
        '%detail',
        detail,
      );

      const result = filter.catch(error, host);

      expect(result.getResponse()).toBe(expectedMessage);
    });
  });
});
