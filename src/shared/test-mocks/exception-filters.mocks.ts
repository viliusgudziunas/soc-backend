import { ArgumentsHost } from '@nestjs/common';

export const mockHost = (
  args: { [key: string]: unknown },
  fieldName: string,
): ArgumentsHost => ({
  getArgs: jest.fn(),
  getArgByIndex: jest.fn().mockImplementation((index: number) => {
    if (index === 1) return { ...args };
    if (index === 3) return { fieldName };
  }),
  switchToRpc: jest.fn(),
  switchToHttp: jest.fn(),
  switchToWs: jest.fn(),
  getType: jest.fn(),
});
