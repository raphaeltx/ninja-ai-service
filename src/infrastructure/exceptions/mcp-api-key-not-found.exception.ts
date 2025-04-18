import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * McpApiKeyNotFoundException is thrown when the MCP_API_KEY is not defined in the secrets.
 */
export class McpApiKeyNotFoundException extends HttpException {
  constructor() {
    super(
      'MCP_API_KEY is not defined in the secrets.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
