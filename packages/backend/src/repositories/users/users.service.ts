import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async findOneBy(options: Record<string, any>) {
    return await this.usersRepository.findOneBy(options);
  }
}
