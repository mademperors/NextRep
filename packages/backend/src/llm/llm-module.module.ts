import { Module } from '@nestjs/common';
import { MembersModule } from '../repositories/members/member.module';
import { LlmModuleController as LLMController } from './llm-module.controller';
import { LlmModuleService as LLMService } from './llm-module.service';

@Module({
  imports: [MembersModule],
  controllers: [LLMController],
  providers: [LLMService],
})
export class LLMModule {}
