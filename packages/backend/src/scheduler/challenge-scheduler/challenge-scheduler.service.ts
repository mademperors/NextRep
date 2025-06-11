import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/constants/enums/status.enum';
import { Challenge } from 'src/database/entities/challenge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengeSchedulerService {
  private readonly logger = new Logger(ChallengeSchedulerService.name);

  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
  ) {}

  // Run every day at 6:00 AM
  @Cron('0 6 * * *', {
    name: 'updateChallenges',
    timeZone: 'UTC', // Adjust to your timezone
  })
  async handleChallengeUpdates() {
    this.logger.log('Starting daily challenge updates at 6:00 AM');

    try {
      const now = new Date();
      now.setHours(6, 0, 0, 0); // Set to today 6:00 AM for comparison

      // Find all challenges that should be updated today
      const challengesToUpdate = await this.challengeRepository
        .createQueryBuilder('challenge')
        .where('challenge.startDate <= :now', { now })
        .andWhere('challenge.currentDay < challenge.duration')
        .andWhere('challenge.status != :status', { status: Status.ENDED })
        .getMany();

      this.logger.log(`Found ${challengesToUpdate.length} challenges to update`);

      let updatedCount = 0;
      let completedCount = 0;

      for (const challenge of challengesToUpdate) {
        const result = await this.updateChallengeDay(challenge, now);
        if (result.updated) {
          updatedCount++;
          if (result.completed) {
            completedCount++;
          }
        }
      }

      this.logger.log(
        `Daily challenge updates completed: ${updatedCount} updated, ${completedCount} completed`,
      );
    } catch (error) {
      this.logger.error('Error during daily challenge updates:', error);
      throw error;
    }
  }

  private async updateChallengeDay(
    challenge: Challenge,
    currentTime: Date,
  ): Promise<{ updated: boolean; completed: boolean }> {
    try {
      // Calculate which day the challenge should be on
      const timeDiff = currentTime.getTime() - challenge.startDate.getTime();
      const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

      // Only update if we need to advance the day
      if (daysSinceStart > challenge.currentDay && daysSinceStart <= challenge.duration) {
        const previousDay = challenge.currentDay;
        challenge.currentDay = daysSinceStart;

        // Set to STARTED if first update
        if (challenge.currentDay === 1 && challenge.status === Status.ENROLLMENT) {
          challenge.status = Status.STARTED;
          this.logger.log(`Challenge ${challenge.id} status changed to STARTED`);
        }

        // Check for completion
        const isCompleted = challenge.currentDay === challenge.duration;
        if (isCompleted && challenge.status !== Status.ENDED) {
          challenge.status = Status.ENDED;
          this.logger.log(`Challenge ${challenge.id} status changed to ENDED`);
        }

        await this.challengeRepository.save(challenge);

        this.logger.log(
          `Challenge ${challenge.id}: advanced from day ${previousDay} to day ${challenge.currentDay}/${challenge.duration}`,
        );

        if (isCompleted) {
          await this.handleChallengeCompletion(challenge);
        }

        return { updated: true, completed: isCompleted };
      }

      return { updated: false, completed: false };
    } catch (error) {
      this.logger.error(`Failed to update challenge ${challenge.id}:`, error);
      throw error;
    }
  }

  private async handleChallengeCompletion(challenge: Challenge) {
    this.logger.log(`🎉 Challenge ${challenge.id} has been completed!`);

    try {
      // Add your completion logic here:
      // - Send notifications to participants
      // - Update user achievements
      // - Generate completion certificates
      // - Update challenge status
      // - etc.
      // Example: You could emit an event here for other services to handle
      // this.eventEmitter.emit('challenge.completed', { challengeId: challenge.id });
    } catch (error) {
      this.logger.error(`Error handling completion for challenge ${challenge.id}:`, error);
    }
  }

  // Optional: Get challenges scheduled for today
  async getChallengesForToday(): Promise<Challenge[]> {
    const today = new Date();
    today.setHours(6, 0, 0, 0);

    return this.challengeRepository
      .createQueryBuilder('challenge')
      .where('challenge.startDate <= :today', { today })
      .andWhere('challenge.currentDay < challenge.duration')
      .getMany();
  }

  // Optional: Manual trigger for testing
  async triggerManualUpdate(): Promise<{ updated: number; completed: number }> {
    this.logger.log('Manual challenge update triggered');

    const now = new Date();
    const challengesToUpdate = await this.getChallengesForToday();

    let updatedCount = 0;
    let completedCount = 0;

    for (const challenge of challengesToUpdate) {
      const result = await this.updateChallengeDay(challenge, now);
      if (result.updated) {
        updatedCount++;
        if (result.completed) {
          completedCount++;
        }
      }
    }

    return { updated: updatedCount, completed: completedCount };
  }

  // Optional: Get scheduler status
  getSchedulerStatus() {
    return {
      serviceName: 'ChallengeSchedulerService',
      cronExpression: '0 6 * * *',
      timezone: 'UTC',
      description: 'Updates challenge progress daily at 6:00 AM',
      lastRun: new Date().toISOString(),
    };
  }
}
