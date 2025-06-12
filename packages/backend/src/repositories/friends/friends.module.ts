import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/database/entities/member.entity';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [FriendsController],
  providers: [FriendsRepository],
})
export class FriendsModule {}
