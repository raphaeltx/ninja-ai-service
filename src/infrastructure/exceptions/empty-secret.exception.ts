import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception thrown when the SecretString is empty in AWS Secrets Manager.
 */
export class EmptySecretException extends HttpException {
  constructor(secretName: string) {
    super(
      `The secret "${secretName}" is empty or missing in AWS Secrets Manager.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
