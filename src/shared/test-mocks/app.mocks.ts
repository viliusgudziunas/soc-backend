import { appData as data } from 'src/shared/test-data';

export const HealthService = {
  getHealth: jest.fn().mockReturnValue(data.appHealth),
};

export const HealthCheckService = {
  check: jest.fn().mockImplementation((checks) => checks),
};

export const TypeOrmHealthIndicator = {
  pingCheck: jest.fn().mockReturnValue(data.dbHealthCheckResult),
};
