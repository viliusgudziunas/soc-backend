import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { appData as data } from 'src/shared/test-data';
import { appMocks as mocks } from 'src/shared/test-mocks';
import { DB_PING_CHECK_KEY } from '../health.consts';
import { HealthService } from '../health.service';

describe('HealthService', () => {
  let service: HealthService;
  let healthCheckService: HealthCheckService;
  let dbHealthService: TypeOrmHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: HealthCheckService, useValue: mocks.HealthCheckService },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mocks.TypeOrmHealthIndicator,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
    dbHealthService = module.get<TypeOrmHealthIndicator>(
      TypeOrmHealthIndicator,
    );
  });

  afterEach(() => jest.clearAllMocks());

  describe('.getHealth()', () => {
    it('should call health service check', () => {
      service.getHealth();

      expect(healthCheckService.check).toHaveBeenCalledTimes(1);
      expect(healthCheckService.check).toHaveBeenCalledWith([
        expect.any(Function),
      ]);
    });

    it('should return db health check', async () => {
      const result = await service.getHealth();
      const dbHealthCheckResult = result[0]();

      expect(dbHealthService.pingCheck).toHaveBeenCalledTimes(1);
      expect(dbHealthService.pingCheck).toHaveBeenCalledWith(DB_PING_CHECK_KEY);
      expect(dbHealthCheckResult).toBe(data.dbHealthCheckResult);
    });
  });
});
