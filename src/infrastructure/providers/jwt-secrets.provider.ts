import { Provider } from '@nestjs/common';

// TODO: Remove this provider and use AWS Secrets provider instead
/**
 * JwtSecretProvider is a provider that retrieves the JWT secret from the JWT options.
 * It is used to configure the JWT module in the application.
 */
export const JwtSecretsProvider: Provider = {
  provide: 'JWT_SECRETS',
  useFactory: (jwtOptions: { secret: string }) => jwtOptions.secret,
  inject: ['JWT_OPTIONS'],
};
