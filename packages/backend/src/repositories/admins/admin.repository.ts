import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Admin } from 'src/database/entities/admin.entity';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { Repository } from 'typeorm';
import { IAUTH } from '../interfaces/iauth.interface';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateAdminDto } from './dtos/create-admin.dto';

@Injectable()
export class AdminsRepository implements ICRUD<Admin, { CreateDto: CreateAdminDto }>, IAUTH {
  constructor(@InjectRepository(Admin) private readonly adminsRepository: Repository<Admin>) {}
  async findOne(options: Record<string, string | number>): Promise<Admin | null> {
    return await this.adminsRepository.findOneBy(options);
  }

  async create(dto: CreateAdminDto): Promise<void> {
    try {
      dto.password = await encodePassword(dto.password);
      const newAdmin: Admin = this.adminsRepository.create(dto);
      await this.adminsRepository.insert(newAdmin);
    } catch (err) {
      if (err.code === '23505') throw new ConflictException();
      else throw err;
    }
  }

  async getCredentials(email: string): Promise<AuthInfo | null> {
    return await this.adminsRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }

  //TODO: violates SOLID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(options: Partial<Admin>): Promise<unknown[]> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(email: string, dto: unknown): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
