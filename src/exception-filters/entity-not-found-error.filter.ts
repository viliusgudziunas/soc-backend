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
  catch(error: EntityNotFoundError, host: ArgumentsHost): HttpException {
    const entity = this.getEntity(error);
    const id = this.getId(host);
    const message = this.makeMessage(entity, id);

    return new HttpException(message, HttpStatus.NOT_FOUND);
  }

  private getEntity(error: EntityNotFoundError): string {
    const { message } = error;
    const left = message.indexOf('"') + 1;
    const right = message.indexOf('"', left);

    return message.slice(left, right);
  }

  private getId(host: ArgumentsHost): string {
    const { id } = host.getArgByIndex<{ id: number }>(1);
    return String(id);
  }

  private makeMessage(entity: string, id: string): string {
    return locale.entityNotFoundMessage
      .replace('%entity', entity)
      .replace('%id', id);
  }
}
