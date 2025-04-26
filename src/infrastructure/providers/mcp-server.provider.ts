import { Provider } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AwsSecretModel } from 'src/domain/models/aws-secret.model';
import { McpApiKeyNotFoundException } from '../exceptions/mcp-api-key-not-found.exception';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * McpServerProvider provides an instance of the MCP server for AI model interactions.
 * It uses the AWS Secrets Manager to retrieve the API key and other configurations.
 */
export const McpServerProvider: Provider = {
  provide: 'MCP_SERVER',
  useFactory: async (secrets: AwsSecretModel) => {
    const provider = process.env.MCP_PROVIDER || 'openai';
    const apiKey = secrets.openAIApiKey;

    if (!apiKey) {
      throw new McpApiKeyNotFoundException();
    }

    const mcpServer = new McpServer({
      name: 'MCP Server',
      description: 'MCP Server for AI model interactions',
      version: '1.0.0',
      provider,
      apiKey,
    });

    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);

    return mcpServer;
  },
  inject: ['AWS_SECRETS'],
};
