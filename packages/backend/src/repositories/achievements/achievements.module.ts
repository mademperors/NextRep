import { Module } from '@nestjs/common';
import { AchivementsController } from './achievements.controller';
import { AchivementsService } from './achievements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achivement } from 'src/database/entities/achivement.entity';
import { Member } from 'src/database/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achivement, Member])],
  controllers: [AchivementsController],
  providers: [AchivementsService],
})
export class AchivementsModule {}
