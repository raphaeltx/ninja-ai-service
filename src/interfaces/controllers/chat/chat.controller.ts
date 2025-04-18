import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { IChatController } from '../../../domain/interfaces/chat.controller.interface';
import { ChatRequestDto } from 'src/domain/dto/chat-request.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { McpService } from 'src/infrastructure/services/mcp.service';
import { ChatResponseModel } from 'src/domain/models/chat-response.model';

@Controller('chat')
export class ChatController implements IChatController {
  constructor(private readonly mcpService: McpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async chat(
    @Body() chatRequestDto: ChatRequestDto,
  ): Promise<ChatResponseModel> {
    const { prompt } = chatRequestDto;
    const completion = await this.mcpService.generateText(prompt, 1000);

    return { completion };
  }
}
