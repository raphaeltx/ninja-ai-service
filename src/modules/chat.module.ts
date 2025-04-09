import { Module } from '@nestjs/common';
import { ChatController } from 'src/interfaces/controllers/chat/chat.controller';

/**
 * ChatModule is responsible for handling chat-related endpoints.
 * It contains the ChatController which processes chat requests.
 */
@Module({
  controllers: [ChatController],
})
export class ChatModule {}
