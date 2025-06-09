import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TrainingOwnerGuard } from 'src/common/guards/training-owner.guard';
import { MembersRepository } from '../members/member.repository';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';
import { TrainingsRepository } from './training.repository';

@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingsRepository: TrainingsRepository,
    private readonly membersRepository: MembersRepository,
  ) {}

  @Get()
  async getTrainings(@Req() req: Request) {
    const memberEmail: string = req.user!.email;
    return await this.trainingsRepository.find({ creator: { email: memberEmail } });
  }

  @UseGuards(TrainingOwnerGuard)
  @Get('/:id')
  async getTraining(@Param('id', ParseIntPipe) id: number) {
    return await this.trainingsRepository.findOne({ id });
  }

  @Post()
  async createTraining(@Body() createDto: CreateTrainingDto, @Req() req: Request) {
    const memberEmail = req.user!.email;
    const member = await this.membersRepository.findOneFull({ email: memberEmail });

    createDto.creator = member;
    return await this.trainingsRepository.create(createDto);
  }

  @UseGuards(TrainingOwnerGuard)
  @Patch('/:id')
  async updateTraining(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingDto,
  ) {
    return await this.trainingsRepository.update(id, updateDto);
  }

  @UseGuards(TrainingOwnerGuard)
  @Delete('/:id')
  async deleteTraining(@Param('id', ParseIntPipe) id: number) {
    await this.trainingsRepository.delete(id);
  }
}
