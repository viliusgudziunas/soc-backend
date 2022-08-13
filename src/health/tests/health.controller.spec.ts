import { Test, TestingModule } from '@nestjs/testing';
import { appData as data } from 'src/shared/test-data';
import { appMocks as mocks } from 'src/shared/test-mocks';
import { HealthController } from '../health.controller';
import { HealthService } from '../health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: mocks.HealthService }],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('.getPing()', () => {
    it("should return 'pong'", () => {
      expect(controller.getPing()).toBe('pong');
    });
  });

  describe('.getHealth()', () => {
    it('should get health status from health service', () => {
      controller.getHealth();

      expect(service.getHealth).toHaveBeenCalledTimes(1);
      expect(service.getHealth).toHaveBeenCalledWith();
    });

    it('should return the health status returned by health service', async () => {
      const result = await controller.getHealth();

      expect(result).toBe(data.appHealth);
    });
  });
});
