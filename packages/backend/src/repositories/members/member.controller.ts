import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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

  @Patch('/:email')
  async updateMember(
    @Param('email') email: string,
    @Body(NotEmptyBodyPipe) updateDto: UpdateMemberDto,
  ) {
    console.log('controller');
    return await this.membersRepository.update(email, updateDto);
  }

  @Delete('/:email')
  async deleteMember(@Param('email') email: string) {
    return await this.membersRepository.delete(email);
  }
}
