import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from 'src/database/entities/training.entity';
import { MembersModule } from '../members/member.module';
import { TrainingsController } from './training.controller';
import { TrainingsRepository } from './training.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Training]), MembersModule],
  controllers: [TrainingsController],
  providers: [TrainingsRepository],
  exports: [TrainingsRepository],
})
export class TrainingsModule {}
