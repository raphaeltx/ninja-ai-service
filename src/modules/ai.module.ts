import { Module } from '@nestjs/common';
import { OpenAIClientProvider } from 'src/infrastructure/providers/open-ai-client.provider';
import { OpenAIService } from 'src/infrastructure/services/open-ai.service';
import { AwsSecretsModule } from './aws-secrets.module';

@Module({
  imports: [AwsSecretsModule],
  providers: [OpenAIClientProvider, OpenAIService],
  exports: [OpenAIService],
})
export class AIModule {}
