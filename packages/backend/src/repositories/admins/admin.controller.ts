import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/constants/enums/roles.enum';
import { AccountOwnerGuard } from 'src/common/guards/account-owner.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { NotEmptyBodyPipe } from 'src/common/pipes/not-empty-body.pipe';
import { AdminsRepository } from './admin.repository';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  @Get('/:email')
  async findAdmin(@Param('email') email: string) {
    return await this.adminsRepository.findOne({ email });
  }

  @UseGuards(AccountOwnerGuard)
  @Patch('/:email')
  async updateAdmin(
    @Param('email') email: string,
    @Body(NotEmptyBodyPipe) updateDto: UpdateAdminDto,
  ) {
    return await this.adminsRepository.update(email, updateDto);
  }

  @UseGuards(AccountOwnerGuard)
  @Delete('/:email')
  async deleteAdmin(@Param('email') email: string) {
    return await this.adminsRepository.delete(email);
  }
}
