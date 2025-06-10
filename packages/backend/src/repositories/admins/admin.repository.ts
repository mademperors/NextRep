import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Admin } from 'src/database/entities/admin.entity';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IAUTH } from '../interfaces/iauth.interface';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { ResponseAdminDto } from './dtos/response-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

type Dtos = {
  CreateDto: CreateAdminDto;
  UpdateDto: UpdateAdminDto;
  ResponseDto: ResponseAdminDto;
};
type Param = string;

@Injectable()
export class AdminsRepository implements ICRUD<Admin, Dtos, Param>, IAUTH {
  constructor(@InjectRepository(Admin) private readonly adminsRepository: Repository<Admin>) {}

  async findOne(options: FindOneOptions<Admin>): Promise<ResponseAdminDto> {
    const admin = await this.adminsRepository.findOneOrFail(options);
    return plainToInstance(ResponseAdminDto, admin);
  }

  async find(options: FindManyOptions<Admin>): Promise<ResponseAdminDto[]> {
    const admins = await this.adminsRepository.find(options);
    return plainToInstance(ResponseAdminDto, admins);
  }

  async create(dto: CreateAdminDto): Promise<void> {
    dto.password = encodePassword(dto.password);
    const newAdmin: Admin = this.adminsRepository.create(dto);
    await this.adminsRepository.insert(newAdmin);
  }

  async update(username: string, dto: UpdateAdminDto): Promise<void> {
    const existing = await this.adminsRepository.findOneByOrFail({ username });

    if (dto.password) dto.password = encodePassword(dto.password);

    const updated = this.adminsRepository.merge(existing, dto);
    await this.adminsRepository.save(updated);
  }

  async delete(username: Param): Promise<void> {
    const deleted = await this.adminsRepository.delete({ username });
    if (deleted.affected === 0) throw new NotFoundException(`Admin not found`);
  }

  async getCredentials(username: Param): Promise<AuthInfo | null> {
    return await this.adminsRepository.findOne({
      where: { username },
      select: ['username', 'password'],
    });
  }
}
