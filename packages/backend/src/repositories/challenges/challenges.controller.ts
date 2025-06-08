import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/constants/enums/roles.enum';
import { ChallengesRepository } from './challenges.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return await this.challengesRepository.update(+id, updateChallengeDto);
  }

  @Patch(':id/newMember')
  async addNewMember(@Param('id') id: string, @Query('memberEmail') memberEmail: string) {
    return await this.challengesRepository.addNewMember(+id, memberEmail);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Query('createdBy') createdBy: string) {
    return await this.challengesRepository.delete(+id, createdBy);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id/global') // available for admins
  async deleteGlobal(@Param('id') id: string) {
    return await this.challengesRepository.deleteGlobal(+id);
  }
}
