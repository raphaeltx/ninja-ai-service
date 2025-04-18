import { Module } from '@nestjs/common';
import { AwsSecretsService } from '../infrastructure/services/aws-secrets.service';
import { AwsSecretsProvider } from 'src/infrastructure/providers/aws-secrets.provider';

/**
 * This module provides the AWS Secrets Manager service.
 * It retrieves secrets from AWS Secrets Manager
 * and makes them available for injection.
 */
@Module({
  providers: [AwsSecretsService, AwsSecretsProvider],
  exports: ['AWS_SECRETS'],
})
export class AwsSecretsModule {}
