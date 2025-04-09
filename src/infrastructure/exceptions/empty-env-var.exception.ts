import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * EmptyEnvVarException is thrown when an environment variable is empty or missing.
 */
export class EmptyEnvVarException extends HttpException {
  constructor(envVar: string) {
    super(
      `The environment variable "${envVar}" is empty or missing.`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
