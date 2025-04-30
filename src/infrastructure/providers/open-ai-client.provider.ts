import { Provider } from '@nestjs/common';
import { OpenAI } from 'openai';
import { AwsSecretModel } from 'src/domain/models/aws-secret.model';
import { EmptySecretException } from '../exceptions/empty-secret.exception';

export const OpenAIClientProvider: Provider = {
  provide: 'OPENAI_CLIENT',
  useFactory: (secrets: AwsSecretModel) => {
    if (!secrets.openAIApiKey) {
      throw new EmptySecretException('openAIApiKey');
    }

    return new OpenAI({
      apiKey: secrets.openAIApiKey,
    });
  },
  inject: ['AWS_SECRETS'],
};
