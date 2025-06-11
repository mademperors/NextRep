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
import { Role } from 'src/common/constants/enums/roles.enum';
import { TrainingOwnerGuard } from 'src/common/guards/training-owner.guard';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { ResponseTrainingDto } from './dtos/response-training.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';
import { TrainingsService } from './services/training.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  async getTrainings(@Req() req: Request): Promise<ResponseTrainingDto[]> {
    const user = req.user as { username: string };
    return await this.trainingsService.findTrainings(user.username);
  }

  @UseGuards(TrainingOwnerGuard)
  @Get('/:id')
  async getTraining(@Param('id', ParseIntPipe) id: number): Promise<ResponseTrainingDto> {
    return await this.trainingsService.findOneTraining(id);
  }

  @Post()
  async createTraining(@Body() createDto: CreateTrainingDto, @Req() req: Request): Promise<void> {
    const user = req.user as { username: string; role: Role };
    createDto.creator = user.username;
    await this.trainingsService.createTraining(createDto, user.role);
  }

  @UseGuards(TrainingOwnerGuard)
  @Patch('/:id')
  async updateTraining(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTrainingDto,
  ): Promise<void> {
    await this.trainingsService.updateTraining(id, updateDto);
  }

  @UseGuards(TrainingOwnerGuard)
  @Delete('/:id')
  async deleteTraining(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.trainingsService.deleteTraining(id);
  }
}
