import { Module, Global } from '@nestjs/common';
import { McpServerProvider } from 'src/infrastructure/providers/mcp-server.provider';
import { AwsSecretsModule } from './aws-secrets.module';
import { McpService } from 'src/infrastructure/services/mcp.service';

@Global()
@Module({
  imports: [AwsSecretsModule],
  providers: [McpServerProvider, McpService],
  exports: ['MCP_SERVER', McpService],
})
export class McpModule {}
