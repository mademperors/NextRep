import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/constants/enums/roles.enum';
import { AccountOwnerGuard } from 'src/common/guards/account-owner.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NotEmptyBodyPipe } from 'src/common/pipes/not-empty-body.pipe';
import { AdminsRepository } from './admin.repository';
import { ResponseAdminDto } from './dtos/response-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  @Get('/:username')
  async findAdmin(@Param('username') username: string): Promise<ResponseAdminDto> {
    return await this.adminsRepository.findOne({ where: { username } });
  }

  @UseGuards(AccountOwnerGuard)
  @Patch('/:username')
  async updateAdmin(
    @Param('username') username: string,
    @Body(NotEmptyBodyPipe) updateDto: UpdateAdminDto,
  ): Promise<void> {
    await this.adminsRepository.update(username, updateDto);
  }

  @UseGuards(AccountOwnerGuard)
  @Delete('/:username')
  async deleteAdmin(@Param('username') username: string): Promise<void> {
    await this.adminsRepository.delete(username);
  }
}
