import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('ping')
  getPing(): string {
    return 'pong';
  }

  @UseGuards(JwtAuthGuard)
  @Get('health')
  @HealthCheck()
  getHealth(): Promise<HealthCheckResult> {
    return this.healthService.getHealth();
  }
}
