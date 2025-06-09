import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Admin } from 'src/database/entities/admin.entity';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { FindOptionsWhere, Repository } from 'typeorm';
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

  async findOne(options: FindOptionsWhere<Admin>): Promise<ResponseAdminDto> {
    const admin = await this.adminsRepository.findOneBy(options);
    if (!admin) throw new BadRequestException(`Admin not found`);

    return plainToInstance(ResponseAdminDto, admin);
  }

  async find(options: FindOptionsWhere<Admin>): Promise<ResponseAdminDto[]> {
    const admins = await this.adminsRepository.findBy(options);
    return plainToInstance(ResponseAdminDto, admins);
  }

  async create(dto: CreateAdminDto): Promise<void> {
    try {
      dto.password = encodePassword(dto.password);
      const newAdmin: Admin = this.adminsRepository.create(dto);
      await this.adminsRepository.insert(newAdmin);
    } catch (err) {
      if (err.code === '23505') throw new UnauthorizedException();
      else throw err;
    }
  }

  async update(email: string, dto: UpdateAdminDto): Promise<ResponseAdminDto> {
    const existing = await this.adminsRepository.findOneBy({ email });
    if (!existing) throw new BadRequestException(`Admin not found`);

    if (dto.password) dto.password = encodePassword(dto.password);

    const updated = this.adminsRepository.merge(existing, dto);
    const saved = await this.adminsRepository.save(updated);
    return plainToInstance(ResponseAdminDto, saved);
  }

  async delete(email: Param): Promise<void> {
    const deleted = await this.adminsRepository.delete({ email });
    if (deleted.affected === 0) throw new BadRequestException(`Admin not found`);
  }

  async getCredentials(email: Param): Promise<AuthInfo | null> {
    return await this.adminsRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }
}
