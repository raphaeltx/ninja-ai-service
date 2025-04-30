import { Provider } from '@nestjs/common';
import { AwsSecretsService } from '../services/aws-secrets.service';
import { AwsSecretArnNotFoundException } from '../exceptions/aws-secret-arn-not-found.exception';

/**
 * This provider fetches secrets from AWS Secrets Manager
 * and makes them available for injection.
 */
export const AwsSecretsProvider: Provider = {
  provide: 'AWS_SECRETS',
  useFactory: async (awsSecretsService: AwsSecretsService) => {
    const secretArn = process.env.AWS_SECRET_ARN;

    if (!secretArn) {
      throw new AwsSecretArnNotFoundException();
    }

    const secrets = await awsSecretsService.getSecret(secretArn);
    return secrets;
  },
  inject: [AwsSecretsService],
};
