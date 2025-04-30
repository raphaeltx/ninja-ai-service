import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { IOpenAIService } from 'src/domain/interfaces/open-ai.service.interface';
import { OpenAIApiCompletionException } from '../exceptions/openai-api-error.exception';

@Injectable()
export class OpenAIService implements IOpenAIService {
  constructor(@Inject('OPENAI_CLIENT') private readonly openai: OpenAI) {}

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.fetchCompletion(prompt);
      return this.extractContent(response);
    } catch (error) {
      this.handleError();
    }
  }

  /**
   * @description Fetches the completion from the OpenAI API.
   * @param prompt The input prompt for the AI model.
   * @returns The raw response from the OpenAI API.
   */
  private async fetchCompletion(prompt: string) {
    return this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });
  }

  /**
   * @description Extracts the content from the OpenAI API response.
   * @param response The response from the OpenAI API.
   * @returns The generated text content.
   */
  private extractContent(response: any): string {
    if (!response.choices || response.choices.length === 0) {
      this.handleError();
    }

    const message = response.choices[0].message;
    if (!message || !message.content) {
      this.handleError();
    }

    return message.content.trim();
  }

  /**
   * @description Handles errors during the OpenAI API call.
   */
  private handleError(): never {
    throw new OpenAIApiCompletionException();
  }
}
