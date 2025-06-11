import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { ChallengeSchedulerService } from './challenge-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengeSchedulerService],
  exports: [ChallengeSchedulerService],
})
export class ChallengeSchedulerModule {}
