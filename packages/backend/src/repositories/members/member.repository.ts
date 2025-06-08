import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { encodePassword } from 'src/common/utils/bcrypt';
import { AuthInfo } from 'src/database/entities/auth-info.interface';
import { Member } from 'src/database/entities/member.entity';
import { DeepPartial, Repository } from 'typeorm';
import { IAUTH } from '../interfaces/iauth.interface';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { ResponseMemberDto } from './dtos/response-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Injectable()
export class MembersRepository
  implements
    ICRUD<
      Member,
      { CreateDto: CreateMemberDto; UpdateDto: UpdateMemberDto; ResponseDto: ResponseMemberDto }
    >,
    IAUTH
{
  constructor(@InjectRepository(Member) private readonly memberRepository: Repository<Member>) {}

  async findOne(options: Record<string, string | number>): Promise<ResponseMemberDto> {
    const member = await this.memberRepository.findOneBy(options);
    if (!member) throw new BadRequestException(`Member not found`);

    return plainToInstance(ResponseMemberDto, member);
  }

  async find(options: Partial<Member>): Promise<ResponseMemberDto[]> {
    const members = await this.memberRepository.findBy(options);
    return plainToInstance(ResponseMemberDto, members);
  }

  async create(dto: CreateMemberDto): Promise<void> {
    try {
      dto.password = await encodePassword(dto.password);
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
    console.log('HELP');
    if (dto.email && dto.email !== email) {
      const emailExists = await this.memberRepository.existsBy({ email: dto.email });
      if (emailExists) throw new ConflictException(`Email ${dto.email} is already taken`);
    }

    if (dto.password) dto.password = await encodePassword(dto.password);
    const updateData = { ...dto };
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof UpdateMemberDto] === undefined &&
        delete updateData[key as keyof UpdateMemberDto],
    );

    const partialUpdate = updateData as DeepPartial<Member>;
    const updatedMember = this.memberRepository.merge(memberToUpdate, partialUpdate);
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
