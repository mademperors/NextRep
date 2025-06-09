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
    const memberToUpdate = await this.memberRepository.findOneBy({ email });
    if (!memberToUpdate) throw new BadRequestException(`Member not found`);

    for (const key in dto) {
      const value = dto[key as keyof UpdateMemberDto];
      if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
        delete dto[key as keyof UpdateMemberDto];
      }
    }
    if (dto.password) dto.password = encodePassword(dto.password);

    const updatedMember = Object.assign(memberToUpdate, dto);
    const saved = await this.memberRepository.save(updatedMember);
    return plainToInstance(ResponseMemberDto, saved);
  }

  async delete(email: string): Promise<void> {
    await this.memberRepository.delete({ email });
  }

  async getCredentials(email: string): Promise<AuthInfo | null> {
    return await this.memberRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });
  }
}
