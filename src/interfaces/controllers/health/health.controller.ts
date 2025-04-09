import { Controller, Get } from '@nestjs/common';
import { IHealthController } from '../../../domain/interfaces/health.controller.interface';

@Controller('health')
export class HealthController implements IHealthController {
  constructor() {}

  @Get()
  checkHealth() {
    return { status: 'Hello from MCP AI Service! I am alive!' };
  }
}
