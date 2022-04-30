import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { locale } from '../locale';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter
  implements ExceptionFilter<QueryFailedError>
{
  catch(error: QueryFailedError, _: ArgumentsHost): HttpException {
    const { detail } = error.driverError;

    const message = locale.queryFailedMessage.replace('%detail', detail);

    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
