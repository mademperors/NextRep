import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MembersRepository {
  constructor(@InjectRepository(Member) private readonly usersRepository: Repository<Member>) {}

  async findOneBy(options: Record<string, string | number>) {
    return await this.usersRepository.findOneBy(options);
  }

  async create(dto: CreateMemberDto) {
    const newMember = this.usersRepository.create(dto);
    this.usersRepository.save(newMember);
  }
}
