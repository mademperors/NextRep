import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/database/entities/training.entity';
import { MembersModule } from '../members/member.module';
import { TrainingsCrudRepository } from './services/training-crud.repository';
import { TrainingsService } from './services/training.service';
import { TrainingsController } from './training.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), MembersModule],
  controllers: [TrainingsController],
  providers: [TrainingsService, TrainingsCrudRepository],
  exports: [TrainingsService, TrainingsCrudRepository],
})
export class TrainingsModule {}
