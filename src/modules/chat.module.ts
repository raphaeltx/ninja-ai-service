import { Module } from '@nestjs/common';
import { ChatController } from 'src/interfaces/controllers/chat/chat.controller';
import { McpModule } from './mcp.module';

/**
 * ChatModule is responsible for handling chat-related endpoints.
 * It contains the ChatController which processes chat requests.
 */
@Module({
  imports: [McpModule],
  controllers: [ChatController],
})
export class ChatModule {}
