import { JwtConfigModel } from '../models/jwt-config.model';

/**
 * Interface for the JwtConfigService.
 * Defines the contract for configuring the JWT module.
 */
export interface IJwtConfigService {
  /**
   * @description Creates the options for the JwtModule dynamically by fetching the secret from AWS Secrets Manager.
   * @returns A promise that resolves to the JWT module options as JwtConfigModel.
   */
  createJwtOptions(): Promise<JwtConfigModel>;
}
