import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AccountOwnerGuard } from 'src/common/guards/account-owner.guard';
import { NotEmptyBodyPipe } from 'src/common/pipes/not-empty-body.pipe';
import { ResponseMemberDto } from './dtos/response-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { MembersRepository } from './member.repository';

@Controller('members')
export class MembersController {
  constructor(private readonly membersRepository: MembersRepository) {}

  @Get('/:username')
  async findMember(@Param('username') username: string): Promise<ResponseMemberDto> {
    return await this.membersRepository.findOne({ where: { username } });
  }

  @UseGuards(AccountOwnerGuard)
  @Patch('/:username')
  async updateMember(
    @Param('username') username: string,
    @Body(NotEmptyBodyPipe) updateDto: UpdateMemberDto,
  ): Promise<void> {
    await this.membersRepository.update(username, updateDto);
  }

  @UseGuards(AccountOwnerGuard)
  @Delete('/:username')
  async deleteMember(@Param('username') username: string): Promise<void> {
    await this.membersRepository.delete(username);
  }
}
