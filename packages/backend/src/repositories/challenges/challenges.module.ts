import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountChallenge } from 'src/database/entities/account-challenge.entity';
import { Challenge } from 'src/database/entities/challenge.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { TrainingsModule } from '../trainings/training.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesCrudRepository } from './services/challenges-crud.repository';
import { ChallengesService } from './services/challenges.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, AccountChallenge]),
    AccountsModule,
    TrainingsModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesCrudRepository],
  exports: [ChallengesService, ChallengesCrudRepository],
})
export class ChallengesModule {}
