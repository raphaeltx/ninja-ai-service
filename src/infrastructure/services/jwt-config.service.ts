import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsSecretsService } from './aws-secrets.service';
import { IJwtConfigService } from 'src/domain/interfaces/jwt-config.service.interfaces';
import { EmptyEnvVarException } from '../exceptions/empty-env-var.exception';
import { JwtConfigModel } from 'src/domain/models/jwt-config.model';

@Injectable()
export class JwtConfigService implements IJwtConfigService {
  constructor(
    private readonly awsSecretsService: AwsSecretsService,
    private readonly configService: ConfigService,
  ) {}

  async createJwtOptions(): Promise<JwtConfigModel> {
    const secretArn = this.getSecretArn();
    const secret = await this.awsSecretsService.getSecret(secretArn);

    return {
      secret: secret.authServiceJwtSecret,
      signOptions: { expiresIn: secret.authServiceAccessTokenValidity },
    };
  }

  /**
   * @description Retrieves the secret ARN from the configuration service.
   * @returns The secret ARN as a string.
   * @throws EmptyEnvVarException if the secret ARN is not set or empty.
   */
  private getSecretArn(): string {
    const awsRegion = this.configService.get<string>('AWS_SECRET_ARN');
    if (!awsRegion || awsRegion.trim() === '') {
      throw new EmptyEnvVarException('AWS_SECRET_ARN');
    }
    return awsRegion;
  }
}
