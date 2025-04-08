import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ResponseTransformInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(),
  );
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
