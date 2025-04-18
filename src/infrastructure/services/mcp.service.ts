import { Injectable, Inject } from '@nestjs/common';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { IMcpService } from 'src/domain/interfaces/mcp-service.interface';

@Injectable()
export class McpService implements IMcpService {
  constructor(@Inject('MCP_SERVER') private readonly mcpServer: McpServer) {}

  /**
   * Sends a prompt to the MCP server and retrieves a response.
   * @param prompt - The input prompt for the AI model.
   * @param model - The AI model to use (e.g., 'gpt-4').
   * @param maxTokens - The maximum number of tokens for the response.
   * @returns The generated response from the AI model.
   */
  async generateText(prompt: string, maxTokens: number): Promise<string> {
    // TODO: Handle the response and extract the text
    console.log('Generating text with MCP Server...', prompt);
    return new Promise((resolve, reject) => {
      try {
        this.mcpServer.prompt(
          prompt,
          z.string().parse(maxTokens.toString()),
          { maxTokens: z.string() },
          (args, extra) => {
            console.log('Response args:', args);

            return {
              messages: [
                {
                  role: 'assistant',
                  content: {
                    type: 'text',
                    text: 'Response processed successfully',
                  },
                },
              ],
            };
          },
        );
      } catch (error) {
        throw new Error('Failed to generate text with MCP Server');
      }
    });
  }
}
