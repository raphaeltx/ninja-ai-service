import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health.module';
import { ChatModule } from './modules/chat.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';

/**
 * AppModule is the root module of the application.
 * It imports the HealthModule and ChatModule to provide their functionalities.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    AuthModule,
    ChatModule,
  ],
})
export class AppModule {}
