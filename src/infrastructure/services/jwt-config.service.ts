import { Injectable, Inject } from '@nestjs/common';
import { IJwtConfigService } from 'src/domain/interfaces/jwt-config.service.interfaces';
import { AwsSecretModel } from 'src/domain/models/aws-secret.model';
import { JwtConfigModel } from 'src/domain/models/jwt-config.model';

@Injectable()
export class JwtConfigService implements IJwtConfigService {
  constructor(
    @Inject('AWS_SECRETS') private readonly secrets: AwsSecretModel,
  ) {}

  createJwtOptions(): JwtConfigModel {
    const secret = this.secrets.authServiceJwtSecret;
    const accessTokenValidity = this.secrets.authServiceAccessTokenValidity;

    if (!secret || !accessTokenValidity) {
      throw new Error(
        'JWT_SECRET or JWT_ACCESS_TOKEN_VALIDITY is not defined in the secrets.',
      );
    }

    return {
      secret,
      signOptions: { expiresIn: accessTokenValidity },
    };
  }
}
