import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PingRepository } from '../service/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly primsaHealth: PrismaHealthIndicator,
    private prisma: PingRepository,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // () => this.primsaHealth.pingCheck('prisma', this.prisma),
    ]);
  }
}
