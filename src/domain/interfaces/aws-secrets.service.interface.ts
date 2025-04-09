import { AwsSecretModel } from '../models/aws-secret.model';

/**
 * Interface for the AwsSecretsService.
 * Defines the contract for fetching secrets from AWS Secrets Manager.
 */
export interface IAwsSecretsService {
  /**
   * @description Fetches a secret value from AWS Secrets Manager.
   * @param secretArn - The name of the secret to fetch.
   * @returns A promise that resolves to the secret value as a string.
   */
  getSecret(secretArn: string): Promise<AwsSecretModel>;
}
