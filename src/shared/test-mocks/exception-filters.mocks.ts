import { ArgumentsHost } from '@nestjs/common';

export const mockHost = (): ArgumentsHost => ({
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToHttp: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
});

export const mockHostGetArgByIndex = (
  host: ArgumentsHost,
  args: { [key: string]: unknown },
) => jest.spyOn(host, 'getArgByIndex').mockImplementation(() => args);
