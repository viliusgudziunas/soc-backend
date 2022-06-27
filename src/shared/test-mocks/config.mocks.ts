import { configData as data } from 'src/shared/test-data';

export const ConfigService = { get: jest.fn((key) => data.config[key]) };
