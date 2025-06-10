import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { MembersModule } from '../members/member.module';
import { TrainingsModule } from '../trainings/training.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesCrudRepository } from './services/challenges-crud.repository';
import { ChallengesService } from './services/challenges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, MemberChallenge]), MembersModule, TrainingsModule],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesCrudRepository],
  exports: [ChallengesService, ChallengesCrudRepository],
})
export class ChallengesModule {}
