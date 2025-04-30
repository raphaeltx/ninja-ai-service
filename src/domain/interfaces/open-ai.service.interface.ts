/**
 * This interface defines the contract for an OpenAI service.
 */
export interface IOpenAIService {
  /**
   * Generates text based on the given prompt.
   * @param prompt The input prompt for the AI model.
   * @returns A promise that resolves to the generated text.
   */
  generateText(prompt: string): Promise<string>;
}
