/**
 * Interface for the MCP (Model Control Protocol) service.
 * Defines the contract for interacting with AI models.
 * This interface is used to send prompts to the AI model and retrieve responses.
 */
export interface IMcpService {
  /**
   * Sends a prompt to the MCP provider and retrieves a response.
   * @param prompt - The input prompt for the AI model.
   * @param maxTokens - The maximum number of tokens for the response.
   * @returns The generated response from the AI model.
   */
  generateText(prompt: string, maxTokens: number): Promise<string>;
}
