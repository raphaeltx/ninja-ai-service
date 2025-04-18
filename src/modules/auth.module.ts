import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../infrastructure/strategies/jwt.strategy';
import { AwsSecretsService } from '../infrastructure/services/aws-secrets.service';
import { JwtConfigService } from '../infrastructure/services/jwt-config.service';
import { ConfigModule } from '@nestjs/config';
import { JwtOptionsProvider } from 'src/infrastructure/providers/jwt-options.provider';
import { JwtSecretProvider } from 'src/infrastructure/providers/jwt-sercet.provider';
import { AwsSecretsModule } from './aws-secrets.module';

/**
 * AuthModule handles JWT authentication and related configurations.
 */
@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (jwtOptions: {
        secret: string;
        signOptions: { expiresIn: number };
      }) => jwtOptions,
      inject: ['JWT_OPTIONS'],
    }),
    AwsSecretsModule,
  ],
  providers: [
    JwtStrategy,
    AwsSecretsService,
    JwtConfigService,
    JwtOptionsProvider,
    JwtSecretProvider,
  ],
  exports: [
    JwtModule,
    PassportModule,
    JwtConfigService,
    'JWT_OPTIONS',
    'JWT_SECRET',
  ],
})
export class AuthModule {}
