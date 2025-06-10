import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admin.module';
import { AccountFactory } from './factories/account.factory';
import { AuthFactory } from './factories/auth.factory';
import { MembersModule } from './members/member.module';
import { TrainingsModule } from './trainings/training.module';

@Module({
  imports: [MembersModule, AdminsModule, TrainingsModule],
  providers: [AuthFactory, AccountFactory],
  exports: [AuthFactory, AccountFactory],
})
export class RepositoryModule {}
