import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { IREST } from '../interfaces/irest.interface';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MembersRepository implements IREST<Member, CreateMemberDto> {
  constructor(@InjectRepository(Member) private readonly usersRepository: Repository<Member>) {}

  async findOne(options: Record<string, string | number>): Promise<Member | null> {
    return await this.usersRepository.findOneBy(options);
  }

  async create(dto: CreateMemberDto): Promise<void> {
    dto.password = await encodePassword(dto.password);
    const newMember: Member = this.usersRepository.create(dto);
    await this.usersRepository.save(newMember);
  }
}
