import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AdminsRepository
  implements
    ICRUD<
      Admin,
      { CreateDto: CreateAdminDto; UpdateDto: UpdateAdminDto; ResponseDto: ResponseAdminDto }
    >,
    IAUTH
{
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
      if (err.code === '23505') throw new ConflictException();
      else throw err;
    }
  }

  async update(email: string, dto: UpdateAdminDto): Promise<ResponseAdminDto> {
    const adminToUpdate = await this.adminsRepository.findOneBy({ email });
    if (!adminToUpdate) throw new BadRequestException(`Member not found`);

    for (const key in dto) {
      const value = dto[key as keyof UpdateAdminDto];
      if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
        delete dto[key as keyof UpdateAdminDto];
      }
    }
    if (dto.password) dto.password = encodePassword(dto.password);

    const updatedMember = Object.assign(adminToUpdate, dto);
    const saved = await this.adminsRepository.save(updatedMember);
    return plainToInstance(ResponseAdminDto, saved);
  }

  async delete(email: string): Promise<void> {
    await this.adminsRepository.delete({ email });
  }

  async getCredentials(email: string): Promise<AuthInfo | null> {
    return await this.adminsRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }
}
