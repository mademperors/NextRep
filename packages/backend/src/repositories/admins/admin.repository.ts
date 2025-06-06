import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Admin } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';
import { IREST } from '../interfaces/irest.interface';
import { CreateAdminDto } from './dtos/create-admin.dto';

@Injectable()
export class AdminsRepository implements IREST<Admin, CreateAdminDto> {
  constructor(@InjectRepository(Admin) private readonly adminsRepository: Repository<Admin>) {}

  async findOne(options: Record<string, string | number>): Promise<Admin | null> {
    return await this.adminsRepository.findOneBy(options);
  }

  async create(dto: CreateAdminDto): Promise<void> {
    dto.password = await encodePassword(dto.password);
    const newAdmin: Admin = this.adminsRepository.create(dto);
    await this.adminsRepository.save(newAdmin);
  }
}
