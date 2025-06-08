import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/common/utils/bcrypt';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Injectable()
export class MembersRepository implements ICRUD<Member, CreateMemberDto, UpdateMemberDto> {
  constructor(@InjectRepository(Member) private readonly usersRepository: Repository<Member>) {}

  async findOne(options: Record<string, string | number>): Promise<Member | null> {
    return await this.usersRepository.findOneBy(options);
  }

  find(options: Partial<Member>): Promise<Member[]> {
    throw new Error('Method not implemented.');
  }

  async create(dto: CreateMemberDto): Promise<void> {
    dto.password = await encodePassword(dto.password);
    const newMember: Member = this.usersRepository.create(dto);
    await this.usersRepository.save(newMember);
  }

  update(email: string, dto: UpdateMemberDto): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  delete(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
