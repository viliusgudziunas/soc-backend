import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { locale } from 'src/shared/locale';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter
  implements ExceptionFilter<QueryFailedError>
{
  catch(error: QueryFailedError, _: ArgumentsHost): HttpException {
    const { detail } = error.driverError;
    const message = this.makeMessage(detail);

    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  private makeMessage(detail: string): string {
    return locale.queryFailedMessage.replace('%detail', detail);
  }
}
