import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/database/entities/account.entity';
import { AccountRepository } from './accounts.repository';
import { AdminsModule } from './admins/admin.module';
import { MembersModule } from './members/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), AdminsModule, MembersModule],
  providers: [AccountRepository],
  exports: [AdminsModule, MembersModule, AccountRepository],
})
export class AccountsModule {}
