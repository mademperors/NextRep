import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/database/entities/member.entity';
import { MembersController } from './member.controller';
import { MembersRepository } from './member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [MembersRepository],
  exports: [MembersRepository],
})
export class MembersModule {}
