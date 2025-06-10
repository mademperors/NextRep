import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admin.module';
import { AccountFactory } from './factories/account.factory';
import { AuthFactory } from './factories/auth.factory';
import { LLMModule as LlmModule } from './llm-module/llm-module.module';
import { MembersModule } from './members/member.module';
import { TrainingsModule } from './trainings/training.module';

@Module({
  imports: [MembersModule, AdminsModule, TrainingsModule, LlmModule],
  providers: [AuthFactory, AccountFactory],
  exports: [AuthFactory, AccountFactory],
})
export class RepositoryModule {}
