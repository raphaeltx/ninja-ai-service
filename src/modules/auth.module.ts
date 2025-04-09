import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../infrastructure/strategies/jwt.strategy';
import { AwsSecretsService } from '../infrastructure/services/aws-secrets.service';
import { JwtConfigService } from '../infrastructure/services/jwt-config.service';
import { ConfigModule } from '@nestjs/config';

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
      useFactory: async (jwtConfigService: JwtConfigService) =>
        jwtConfigService.createJwtOptions(),
      inject: [JwtConfigService],
    }),
  ],
  providers: [JwtStrategy, AwsSecretsService, JwtConfigService],
  exports: [JwtModule, PassportModule, JwtConfigService],
})
export class AuthModule {}
