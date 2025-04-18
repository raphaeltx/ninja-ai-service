import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health.module';
import { ChatModule } from './modules/chat.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { McpModule } from './modules/mcp.module';
import { AwsSecretsModule } from './modules/aws-secrets.module';

/**
 * AppModule is the root module of the application.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AwsSecretsModule,
    HealthModule,
    AuthModule,
    ChatModule,
    McpModule,
  ],
})
export class AppModule {}
