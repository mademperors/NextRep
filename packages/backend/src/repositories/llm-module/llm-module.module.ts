import { Module } from '@nestjs/common';
import { LlmModuleController as LLMController } from './llm-module.controller';
import { LlmModuleService as LLMService } from './llm-module.service';
import { MembersModule } from '../members/member.module';

@Module({
  imports: [MembersModule],
  controllers: [LLMController],
  providers: [LLMService],
})
export class LLMModule {}
