import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { locale } from 'src/shared/locale';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter
  implements ExceptionFilter<EntityNotFoundError>
{
  catch(_: EntityNotFoundError, host: ArgumentsHost): HttpException {
    const { fieldName } = host.getArgByIndex<{ fieldName: string }>(3);
    const entity = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    const { id } = host.getArgByIndex<{ id: number }>(1);

    const message = locale.entityNotFoundMessage
      .replace('%entity', entity)
      .replace('%id', String(id));

    return new HttpException(message, HttpStatus.NOT_FOUND);
  }
}
