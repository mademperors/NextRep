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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/constants/enums/roles.enum';
import { ChallengesRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { AddMemberDto } from './dto/new-member-in-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  @Post() // available only for members
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengesRepository.create(createChallengeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/global') // available for admins
  async createGlobal(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengesRepository.createGlobal(createChallengeDto);
  }

  @Get()
  async findAll() {
    return await this.challengesRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.challengesRepository.findOne({ challenge_id: id });
  }

  @Get(':id/members')
  async findMembers(@Param('id', ParseIntPipe) id: number) {
    return await this.challengesRepository.findMembers(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.challengesRepository.update(id, updateChallengeDto);
  }

  @Patch(':id/enroll')
  async enrollToChallege(
    @Param('id', ParseIntPipe) id: number,
    @Body() addMemberDto: AddMemberDto,
  ) {
    return await this.challengesRepository.enrollToChallege(id, addMemberDto.memberEmail);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.challengesRepository.delete(id, req.user.email);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id/global') // available for admins
  async deleteGlobal(@Param('id', ParseIntPipe) id: number) {
    return await this.challengesRepository.deleteGlobal(id);
  }
}
