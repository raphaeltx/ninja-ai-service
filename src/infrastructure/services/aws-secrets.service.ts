import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { IAwsSecretsService } from 'src/domain/interfaces/aws-secrets.service.interface';
import { EmptySecretException } from '../exceptions/empty-secret.exception';
import { AwsSecretModel } from 'src/domain/models/aws-secret.model';
import { EmptyEnvVarException } from '../exceptions/empty-env-var.exception';

@Injectable()
export class AwsSecretsService implements IAwsSecretsService {
  private readonly secretsManagerClient: SecretsManagerClient;

  constructor(private readonly configService: ConfigService) {
    const awsRegion = this.getAwsRegion();
    this.secretsManagerClient = new SecretsManagerClient({ region: awsRegion });
  }

  async getSecret(secretArn: string): Promise<AwsSecretModel> {
    const command = new GetSecretValueCommand({ SecretId: secretArn });
    const response = await this.secretsManagerClient.send(command);

    if (!response.SecretString) {
      throw new EmptySecretException(secretArn);
    }

    const parsedSecret: AwsSecretModel = JSON.parse(response.SecretString);
    return parsedSecret;
  }

  /**
   * @description Retrieves the AWS region from the configuration service.
   * @returns The AWS region as a string.
   */
  private getAwsRegion(): string {
    const awsRegion = this.configService.get<string>('AWS_REGION');
    if (!awsRegion || awsRegion.trim() === '') {
      throw new EmptyEnvVarException('AWS_REGION');
    }
    return awsRegion;
  }
}
