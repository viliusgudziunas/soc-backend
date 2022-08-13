import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { DB_PING_CHECK_KEY } from './health.consts';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  getHealth(): Promise<HealthCheckResult> {
    return this.health.check([this.checkDbHealth]);
  }

  private checkDbHealth = (): Promise<HealthIndicatorResult> =>
    this.db.pingCheck(DB_PING_CHECK_KEY);
}
