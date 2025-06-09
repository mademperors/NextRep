import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { encodePassword } from 'src/common/utils/bcrypt';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { Member } from 'src/database/entities/member.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IAUTH } from '../interfaces/iauth.interface';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ResponseMemberDto } from './dtos/response-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

type Dtos = {
  CreateDto: CreateMemberDto;
  UpdateDto: UpdateMemberDto;
  ResponseDto: ResponseMemberDto;
};
type Param = string;

@Injectable()
export class MembersRepository implements ICRUD<Member, Dtos, Param>, IAUTH {
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}

  async findOne(options: FindOptionsWhere<Member>): Promise<ResponseMemberDto> {
    const member = await this.memberRepository.findOneBy(options);
    if (!member) throw new BadRequestException(`Member not found`);

    return plainToInstance(ResponseMemberDto, member);
  }

  async find(options: FindOptionsWhere<Member>): Promise<ResponseMemberDto[]> {
    const members = await this.memberRepository.findBy(options);
    return plainToInstance(ResponseMemberDto, members);
  }

  async create(dto: CreateMemberDto): Promise<void> {
    try {
      dto.password = encodePassword(dto.password);
      const newMember: Member = this.memberRepository.create(dto);
      await this.memberRepository.insert(newMember);
    } catch (err) {
      if (err.code === '23505') throw new ConflictException();
      else throw err;
    }
  }

  async update(email: string, dto: UpdateMemberDto): Promise<ResponseMemberDto> {
    const existing = await this.memberRepository.findOneBy({ email });
    if (!existing) throw new BadRequestException(`Member not found`);

    if (dto.password) dto.password = encodePassword(dto.password);

    const updated = this.memberRepository.merge(existing, dto);
    const saved = await this.memberRepository.save(updated);
    return plainToInstance(ResponseMemberDto, saved);
  }

  async delete(email: Param): Promise<void> {
    const deleted = await this.memberRepository.delete({ email });
    if (deleted.affected === 0) throw new BadRequestException(`Member not found`);
  }

  async getCredentials(email: Param): Promise<AuthInfo | null> {
    return await this.memberRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }

  async findOneFull(options: FindOptionsWhere<Member>): Promise<Member> {
    const member = await this.memberRepository.findOneBy(options);
    if (!member) throw new BadRequestException(`Member not found`);

    return member;
  }
}
