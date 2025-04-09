import { IsNotEmpty } from 'class-validator';

/**
 * DTO for chat requests.
 */
export class ChatRequestDto {
  /**
   * The input prompt for the AI.
   * This field is required.
   */
  @IsNotEmpty({ message: 'The prompt field is required.' })
  prompt: string;
}
