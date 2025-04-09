/**
 * @description JwtConfigModel is a model that represents the JWT configuration.
 * It contains properties for the JWT secret and sign options.
 * @property secret - The JWT secret used for signing tokens.
 * @property signOptions - The options for signing the JWT, including the expiration time.
 * @property signOptions.expiresIn - The expiration time for the JWT in seconds.
 */
export interface JwtConfigModel {
  secret: string;
  signOptions: { expiresIn: number };
}
