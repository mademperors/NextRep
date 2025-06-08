import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { MembersModule } from '../members/member.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './challenges.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, MemberChallenge]),
    MembersModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesRepository],
  exports: [ChallengesRepository],
})
export class ChallengesModule {}
