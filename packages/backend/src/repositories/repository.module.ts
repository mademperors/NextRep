import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admin.module';
import { AuthFactory } from './factories/auth.factory';
import { MembersModule } from './members/member.module';

@Module({
  imports: [MembersModule, AdminsModule],
  providers: [AuthFactory],
  exports: [AuthFactory],
})
export class RepositoryModule {}
