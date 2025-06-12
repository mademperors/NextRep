import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { ChallengeSchedulerController } from './challenge-scheduler.controller';
import { ChallengeSchedulerService } from './challenge-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengeSchedulerController],
  providers: [ChallengeSchedulerService],
  exports: [ChallengeSchedulerService],
})
export class ChallengeSchedulerModule {}
