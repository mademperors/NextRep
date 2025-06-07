import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  @Post('/global') // available for admins
  async createGlobal(@Body() createChallengeDto: CreateChallengeDto) {
    return await this.challengesRepository.createGlobal(createChallengeDto);
  }

  @Get()
  async findAll() {
    return await this.challengesRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.challengesRepository.findOne(+id);
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

  @Delete(':id/global') // available for admins
  async deleteGlobal(@Param('id') id: string) {
    return await this.challengesRepository.deleteGlobal(+id);
  }
}
