import { HttpException, HttpStatus } from '@nestjs/common';

export const mockHttpException = (
  message = 'Test exception',
  status = HttpStatus.INTERNAL_SERVER_ERROR,
): HttpException => new HttpException(message, status);
