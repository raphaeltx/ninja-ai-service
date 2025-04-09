import { ChatRequestDto } from 'src/domain/dto/chat-request.dto';

/**
 * Interface for the Chat Controller.
 * Defines the contract for handling chat requests.
 */
export interface IChatController {
  /**
   * @description Handles chat requests by sending a prompt to the AI and returning a response.
   * @param chatRequestDto - The DTO containing the input prompt for the AI.
   * @returns An object containing the AI's response.
   */
  chat(chatRequestDto: ChatRequestDto): { response: string };
}
