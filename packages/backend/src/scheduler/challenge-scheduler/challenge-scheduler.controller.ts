import { Controller, Get, Post } from '@nestjs/common';
import { ChallengeSchedulerService } from './challenge-scheduler.service';

@Controller('scheduler')
export class ChallengeSchedulerController {
  constructor(private readonly challengeSchedulerService: ChallengeSchedulerService) {}

  @Post('trigger')
  async triggerManualUpdate() {
    const result = await this.challengeSchedulerService.triggerManualUpdate();
    return {
      message: 'Challenge update triggered successfully',
      ...result,
    };
  }

  @Get('status')
  getSchedulerStatus() {
    return this.challengeSchedulerService.getSchedulerStatus();
  }

  @Get('today')
  async getChallengesForToday() {
    const challenges = await this.challengeSchedulerService.getChallengesForToday();
    return {
      count: challenges.length,
      challenges: challenges.map((c) => ({
        id: c.id,
        challengeInfo: c.challengeInfo,
        currentDay: c.currentDay,
        duration: c.duration,
        startDate: c.startDate,
      })),
    };
  }
}
