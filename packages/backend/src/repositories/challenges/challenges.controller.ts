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
import { ChallengeOwnerGuard } from 'src/common/guards/challenge-owner.guard';
import { ResponsePublicMemberDto } from '../accounts/members/dtos/response-public-member.dto';
import { ResponseTrainingDto } from '../trainings/dtos/response-training.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ResponseChallengeDto } from './dto/response-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengesCrudRepository } from './services/challenges-crud.repository';
import { ChallengesService } from './services/challenges.service';

@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly challengesCrudRepository: ChallengesCrudRepository,
  ) {}

  @Get('created')
  async getCreatedChallenges(@Req() req: Request): Promise<ResponseChallengeDto[]> {
    const memberUsername: string = req.user!.username;
    return await this.challengesService.getCreatedChallenges(memberUsername);
  }

  @Get('me')
  async getEnrolledChallenges(@Req() req: Request): Promise<ResponseChallengeDto[]> {
    const memberUsername: string = req.user!.username;
    return await this.challengesService.getEnrolledChallenges(memberUsername);
  }

  @Get('global')
  async getGlobalChallenges(): Promise<ResponseChallengeDto[]> {
    return await this.challengesService.getGlobalChallenges();
  }

  @Get(':id')
  async getChallengeById(@Param('id', ParseIntPipe) id: number): Promise<ResponseChallengeDto> {
    return await this.challengesService.getChallengeById(id);
  }

  @Get(':id/enrolled')
  async getChallengeEnrolled(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponsePublicMemberDto[]> {
    return await this.challengesService.getEnrolledMembers(id);
  }

  @Get(':id/trainings')
  async getChallengeTrainings(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseTrainingDto[]> {
    return await this.challengesService.getChallengeTrainings(id);
  }

  @Post()
  async createChallenge(@Body() dto: CreateChallengeDto, @Req() req: Request): Promise<void> {
    const user = req.user!;
    dto.creator = user.username;
    await this.challengesService.createChallenge(dto, user.role);
  }

  @UseGuards(ChallengeOwnerGuard)
  @Patch('/:id')
  async updateChallenge(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChallengeDto,
    @Req() req: Request,
  ): Promise<void> {
    const user = req.user!;
    await this.challengesService.updateChallenge(id, dto, user.username, user.role);
  }

  @Patch(':id/enroll')
  async enrollInChallenge(@Param('id') id: number, @Req() req: Request): Promise<void> {
    await this.challengesService.enrollInChallenge(id, req.user!.username);
  }

  @UseGuards(ChallengeOwnerGuard)
  @Delete(':id')
  async deleteChallenge(@Param('id') id: number): Promise<void> {
    await this.challengesCrudRepository.delete(id);
  }

  // @UseGuards(ChallengeOwnerGuard)
  // @Post(':id/start')
  // async startChallenge(@Param('id') id: number) {

  // }
}
