import { Controller } from '@nestjs/common';
import { ChallengesRepository } from './challenges.repository';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesRepository: ChallengesRepository) {}

  // // READ
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return await this.challengesRepository.findOne({ challenge_id: id });
  // }

  // @Get()
  // async findAll() {
  //   return await this.challengesRepository.findAll();
  // }

  // // CREATE

  // @Post() // available only for members
  // async create(@Body() createChallengeDto: CreateChallengeDto) {
  //   return await this.challengesRepository.create(createChallengeDto);
  // }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // @Post('/global') // available for admins
  // async createGlobal(@Body() createChallengeDto: CreateChallengeDto) {
  //   return await this.challengesRepository.createGlobal(createChallengeDto);
  // }

  // // UPDATE
  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateChallengeDto: UpdateChallengeDto,
  // ) {
  //   return await this.challengesRepository.update(id, updateChallengeDto);
  // }

  // // DELETE
  // @Delete(':id')
  // async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
  //   return await this.challengesRepository.delete(id, req.user.email);
  // }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // @Delete(':id/global') // available for admins
  // async deleteGlobal(@Param('id', ParseIntPipe) id: number) {
  //   return await this.challengesRepository.deleteGlobal(id);
  // }

  // // OTHER

  // @Get(':id/members')
  // async findMembers(@Param('id', ParseIntPipe) id: number) {
  //   return await this.challengesRepository.findMembers(id);
  // }

  // @Patch(':id/enroll')
  // async enrollToChallege(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() addMemberDto: AddMemberDto,
  // ) {
  //   return await this.challengesRepository.enrollToChallege(id, addMemberDto.memberEmail);
  // }
}
