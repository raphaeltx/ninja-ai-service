import { Module } from '@nestjs/common';
import { HealthController } from '../interfaces/controllers/health/health.controller';

/**
 * HealthModule is responsible for health check endpoints.
 * It contains the HealthController which provides health status information.
 */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}
