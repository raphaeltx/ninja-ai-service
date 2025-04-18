import { Provider } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AwsSecretModel } from 'src/domain/models/aws-secret.model';
import { McpApiKeyNotFoundException } from '../exceptions/mcp-api-key-not-found.exception';

/**
 * McpServerProvider provides an instance of the MCP server for AI model interactions.
 * It uses the AWS Secrets Manager to retrieve the API key and other configurations.
 */
export const McpServerProvider: Provider = {
  provide: 'MCP_SERVER',
  useFactory: (secrets: AwsSecretModel) => {
    const provider = process.env.MCP_PROVIDER || 'openai';
    const apiKey = secrets.openAIApiKey;

    if (!apiKey) {
      throw new McpApiKeyNotFoundException();
    }

    return new McpServer({
      name: 'MCP Server',
      description: 'MCP Server for AI model interactions',
      version: '1.0.0',
      provider,
      apiKey,
    });
  },
  inject: ['AWS_SECRETS'],
};
