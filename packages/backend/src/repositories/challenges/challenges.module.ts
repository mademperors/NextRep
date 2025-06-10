import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { MembersModule } from '../members/member.module';
import { TrainingsModule } from '../trainings/training.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesAuxRepository } from './services/challenges-aux.repository';
import { ChallengesCrudRepository } from './services/challenges-crud.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, MemberChallenge]), MembersModule, TrainingsModule],
  controllers: [ChallengesController],
  providers: [ChallengesAuxRepository, ChallengesCrudRepository],
  exports: [ChallengesAuxRepository, ChallengesCrudRepository],
})
export class ChallengesModule {}
