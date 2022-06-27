import { configData as data } from 'src/shared/test-data';

export const configServiceMock = { get: jest.fn((key) => data.config[key]) };
