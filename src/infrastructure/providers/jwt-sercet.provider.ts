import { Provider } from '@nestjs/common';

/**
 * JwtSecretProvider is a provider that retrieves the JWT secret from the JWT options.
 * It is used to configure the JWT module in the application.
 */
export const JwtSecretProvider: Provider = {
  provide: 'JWT_SECRET',
  useFactory: (jwtOptions: { secret: string }) => jwtOptions.secret,
  inject: ['JWT_OPTIONS'],
};
