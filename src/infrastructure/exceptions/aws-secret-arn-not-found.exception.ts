import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * AwsSecretArnNotFoundException is thrown when the AWS_SECRET_ARN
 * environment variable is not defined.
 */
export class AwsSecretArnNotFoundException extends HttpException {
  constructor() {
    super(
      'AWS_SECRET_ARN is not defined in the environment variables.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
