import { Provider } from '@nestjs/common';
import { JwtConfigService } from '../services/jwt-config.service';

/**
 * JwtOptionsProvider is a provider that creates JWT options using the JwtConfigService.
 * It is used to configure the JWT module in the application.
 */
export const JwtOptionsProvider: Provider = {
  provide: 'JWT_OPTIONS',
  useFactory: async (jwtConfigService: JwtConfigService) => {
    return jwtConfigService.createJwtOptions();
  },
  inject: [JwtConfigService],
};