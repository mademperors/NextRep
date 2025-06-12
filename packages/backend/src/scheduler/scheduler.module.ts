import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ChallengeSchedulerModule } from './challenge-scheduler/challenge-scheduler.module';

@Module({
  imports: [ScheduleModule.forRoot(), ChallengeSchedulerModule],
  exports: [ChallengeSchedulerModule],
})
export class SchedulerModule {}
