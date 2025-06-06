import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ChallengesService as ChallengesRepository } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  @Post()
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesRepository.create(createChallengeDto);
  }

  @Post("/global")
  createGlobal(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesRepository.createGlobal(createChallengeDto);
  }

  @Get()
  findAll() {
    return this.challengesRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengesRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesRepository.update(+id, updateChallengeDto);
  }

  @Patch(':id/newMember')
  updateNewMember(@Param('id') id: string,  
    @Query('memberId') memberId: string ) {
    return this.challengesRepository.updateNewMember(+id, memberId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.challengesRepository.delete(+id);
  }

  @Delete(':id/global')
  deleteGlobal(@Param('id') id: string) {
    return this.challengesRepository.deleteGlobal(+id);
  }
}
