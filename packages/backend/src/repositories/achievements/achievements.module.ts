import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achivement } from 'src/database/entities/achivement.entity';
import { Member } from 'src/database/entities/member.entity';
import { ChallengesModule } from '../challenges/challenges.module';
import { AchivementsController } from './achievements.controller';
import { AchivementsService } from './achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Achivement, Member]), ChallengesModule],
  controllers: [AchivementsController],
  providers: [AchivementsService],
})
export class AchivementsModule {}
