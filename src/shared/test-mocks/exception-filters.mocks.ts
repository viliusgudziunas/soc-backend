import { ArgumentsHost } from '@nestjs/common';

export const mockHost = (
  args: { [key: string]: unknown },
  fieldName: string,
): ArgumentsHost => ({
  getArgByIndex: jest.fn().mockImplementation((index: number) => {
    if (index === 1) return { ...args };
    if (index === 3) return { fieldName };
  }),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToHttp: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
});
