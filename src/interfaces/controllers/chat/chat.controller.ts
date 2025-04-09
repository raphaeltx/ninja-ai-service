import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { IChatController } from '../../../domain/interfaces/chat.controller.interface';
import { ChatRequestDto } from 'src/domain/dto/chat-request.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';

@Controller('chat')
export class ChatController implements IChatController {
  @UseGuards(JwtAuthGuard)
  @Post()
  chat(@Body() chatRequestDto: ChatRequestDto) {
    const { prompt } = chatRequestDto;

    // TODO: Replace this with actual AI service integration
    const aiResponse = `You said: ${prompt}`;
    return { response: aiResponse };
  }
}
