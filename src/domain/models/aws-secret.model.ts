/**
 * @description AwsSecretModel is a model that represents the JWT secret configuration.
 * It contains properties for the JWT secret and access token validity.
 * @property authServiceJwtSecret - The JWT secret used for signing tokens.
 * @property authServiceAccessTokenValidility - The validity period of the access token in seconds.
 */
export interface AwsSecretModel {
  authServiceJwtSecret: string;
  authServiceAccessTokenValidity: number;
  openAIApiKey: string;
}
