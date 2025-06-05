import { Module } from '@nestjs/common';
import { MembersModule } from './members/member.module';

@Module({
  imports: [MembersModule],
  exports: [MembersModule],
})
export class RepositoryModule {}
