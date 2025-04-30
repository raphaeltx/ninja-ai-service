import { Module } from '@nestjs/common';
import { ChatController } from 'src/interfaces/controllers/chat/chat.controller';
import { AIModule } from './ai.module';

/**
 * ChatModule is responsible for handling chat-related endpoints.
 * It contains the ChatController which processes chat requests.
 */
@Module({
  imports: [AIModule],
  controllers: [ChatController],
})
export class ChatModule {}
