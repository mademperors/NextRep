import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ChallengesModule } from './challenges/challenges.module';
import { TrainingsModule } from './trainings/training.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [AccountsModule, ChallengesModule, TrainingsModule, FriendsModule],
  exports: [AccountsModule],
})
export class RepositoryModule {}
