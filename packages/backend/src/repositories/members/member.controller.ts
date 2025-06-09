import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SelfGuard } from 'src/common/guards/self.guard';
import { NotEmptyBodyPipe } from 'src/common/pipes/not-empty-body.pipe';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { MembersRepository } from './member.repository';

@Controller('members')
export class MembersController {
  constructor(private readonly membersRepository: MembersRepository) {}

  @Get('/:email')
  async findMember(@Param('email') email: string) {
    return await this.membersRepository.findOne({ email });
  }

  @UseGuards(SelfGuard)
  @Patch('/:email')
  async updateMember(
    @Param('email') email: string,
    @Body(NotEmptyBodyPipe) updateDto: UpdateMemberDto,
  ) {
    return await this.membersRepository.update(email, updateDto);
  }

  @UseGuards(SelfGuard)
  @Delete('/:email')
  async deleteMember(@Param('email') email: string) {
    return await this.membersRepository.delete(email);
  }

  @Get('/:email/challenges')
  async findChallenges(@Param('email') email: string) {
    console.log('TODO ', email); //will call repo method of member_challenge
  }
}
