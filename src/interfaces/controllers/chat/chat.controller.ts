import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { IChatController } from '../../../domain/interfaces/chat.controller.interface';
import { ChatRequestDto } from 'src/domain/dto/chat-request.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { ChatResponseModel } from 'src/domain/models/chat-response.model';
import { OpenAIService } from 'src/infrastructure/services/open-ai.service';

@Controller('chat')
export class ChatController implements IChatController {
  constructor(private readonly aiService: OpenAIService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async chat(
    @Body() chatRequestDto: ChatRequestDto,
  ): Promise<ChatResponseModel> {
    const { prompt } = chatRequestDto;
    const completion = await this.aiService.generateText(prompt);

    return { completion };
  }
}
