import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { encodePassword } from 'src/common/utils/bcrypt';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { Member } from 'src/database/entities/member.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
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

  async findOne(options: FindOneOptions<Member>): Promise<ResponseMemberDto> {
    const member = await this.memberRepository.findOneOrFail(options);
    return plainToInstance(ResponseMemberDto, member);
  }

  async find(options: FindManyOptions<Member>): Promise<ResponseMemberDto[]> {
    const members = await this.memberRepository.find(options);
    return plainToInstance(ResponseMemberDto, members);
  }

  async create(dto: CreateMemberDto): Promise<void> {
    dto.password = encodePassword(dto.password);
    const newMember: Member = this.memberRepository.create(dto);
    await this.memberRepository.insert(newMember);
  }

  async update(username: string, dto: UpdateMemberDto): Promise<void> {
    const existing = await this.memberRepository.findOneByOrFail({ username });

    if (dto.password) dto.password = encodePassword(dto.password);

    const updated = this.memberRepository.merge(existing, dto);
    await this.memberRepository.save(updated);
  }

  async delete(username: Param): Promise<void> {
    const deleted = await this.memberRepository.delete({ username });
    if (deleted.affected === 0) throw new BadRequestException(`Member not found`);
  }

  async getCredentials(username: Param): Promise<AuthInfo | null> {
    return await this.memberRepository.findOne({
      where: { username },
      select: ['username', 'password'],
    });
  }

  async findOneFull(options: FindOptionsWhere<Member>): Promise<Member> {
    const member = await this.memberRepository.findOneBy(options);
    if (!member) throw new BadRequestException(`Member not found`);

    return member;
  }

  async findMemberForRelation(options: FindOptionsWhere<Member>): Promise<Member> {
    const member = await this.memberRepository.findOneOrFail({
      where: options,
      select: ['username', 'weight', 'height', 'gender', 'age', 'goal', 'additional_info'],
    });

    return member;
  }
}
