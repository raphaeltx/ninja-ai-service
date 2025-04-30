import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * OpenAIApiCompletionException is thrown when the OpenAI API failed.
 */
export class OpenAIApiCompletionException extends HttpException {
  constructor() {
    super(
      'OpenAI API failed to generate a completion.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
