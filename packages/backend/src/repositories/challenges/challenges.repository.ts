import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ICRUD } from '../interfaces/icrud.interface';
import { MembersRepository } from '../members/member.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ResponseChallengeDto } from './dto/responce-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

type Dtos = {
  CreateDto: CreateChallengeDto;
  UpdateDto: UpdateChallengeDto;
  ResponseDto: ResponseChallengeDto;
};
type Param = string;

@Injectable()
export class ChallengesRepository implements ICRUD<Challenge, Dtos, Param> {
  constructor(
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(MemberChallenge)
    private readonly membersChallengeRepository: Repository<MemberChallenge>,
    private readonly membersRepository: MembersRepository,
  ) {}
  findOne(options: FindOptionsWhere<Challenge>): Promise<ResponseChallengeDto> {
    throw new Error('Method not implemented.');
  }
  find(options: FindOptionsWhere<Challenge>): Promise<ResponseChallengeDto[]> {
    throw new Error('Method not implemented.');
  }
  create(dto: CreateChallengeDto): Promise<void | ResponseChallengeDto> {
    throw new Error('Method not implemented.');
  }
  update(param: string, dto: UpdateChallengeDto): Promise<ResponseChallengeDto> {
    throw new Error('Method not implemented.');
  }
  delete(param: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // // READ
  // async findOne(options: Record<string, string | number>): Promise<Dtos['ResponseDto']> {
  //   const challenge = await this.challengeRepository.findOne({
  //     where: options,
  //     relations: ['createdBy'],
  //   });
  //   if (!challenge) {
  //     return null;
  //   }

  //   challenge.createdBy.password = '';
  //   return challenge;
  // }

  // async findAll(): Promise<Dtos['ResponseDto'][]> {
  //   return await this.challengeRepository.find({
  //     relations: ['createdBy'],
  //   });
  // }

  // // CREATE
  // async create(createChallengeDto: CreateChallengeDto): Promise<Dtos['ResponseDto'] | void> {
  //   const memberEmail = createChallengeDto.createdByEmail;
  //   if (!memberEmail) {
  //     throw new BadRequestException('createdByEmail is required');
  //   }

  //   const memberByEmail = await this.membersRepository.findOne({ email: memberEmail });
  //   if (!memberByEmail) {
  //     throw new BadRequestException(`Member not found`);
  //   }

  //   const newChallenge = await this.challengeRepository.create(createChallengeDto);
  //   newChallenge.createdBy = memberByEmail;
  //   const savedChallenge = await this.challengeRepository.save(newChallenge);

  //   savedChallenge.createdBy.password = '';

  //   return savedChallenge;
  // }

  // async createGlobal(createChallengeDto: CreateChallengeDto): Promise<Challenge | void> {
  //   const newChallenge = await this.challengeRepository.create(createChallengeDto);

  //   newChallenge.challenge_type = ChallengeType.GLOBAL;
  //   return await this.challengeRepository.save(newChallenge);
  // }

  // // UPDATE
  // async update(challengeId: number, updateDto: UpdateChallengeDto): Promise<Dtos['ResponseDto']> {
  //   const challenge = await this.challengeRepository.findOne({
  //     where: { challenge_id: challengeId },
  //   });
  //   if (!challenge) {
  //     throw new BadRequestException(`Challenge not found`);
  //   }

  //   // const updatedChallenge = Object.assign(challenge, updateDto);
  //   const updated = this.challengeRepository.merge(challenge, updateDto);
  //   await this.challengeRepository.save(updated);

  //   return await this.findOne({ challenge_id: challengeId });
  // }

  // // DELETE
  // async delete(challengeId: number, createdBy?: string): Promise<void> {
  //   const challenge = await this.challengeRepository.findOne({
  //     where: { challenge_id: challengeId },
  //     relations: ['createdBy'],
  //   });

  //   if (!challenge) {
  //     throw new BadRequestException(`Challenge not found`);
  //   }

  //   if (!createdBy || (createdBy && createdBy !== challenge.createdBy?.email)) {
  //     throw new BadRequestException(`You are not authorized to delete this challenge.`);
  //   }

  //   return await this.deleteGlobal(challengeId);
  // }

  // async deleteGlobal(challenge_id: number): Promise<Challenge> {
  //   const challenge = await this.challengeRepository.findOne({ where: { challenge_id } });
  //   if (!challenge) {
  //     throw new BadRequestException(`Challenge not found`);
  //   }

  //   const memberChallenges = await this.membersChallengeRepository.find({
  //     where: { challenge_id },
  //   });

  //   if (memberChallenges.length > 0) {
  //     await this.membersChallengeRepository.remove(memberChallenges);
  //   }

  //   return await this.challengeRepository.remove(challenge);
  // }

  // // OTHER
  // async findMembers(challenge_id: number): Promise<string[]> {
  //   const memberChallenges = await this.membersChallengeRepository.find({
  //     where: { challenge_id },
  //     relations: ['member'],
  //   });

  //   return memberChallenges.map((memberChallenge) => {
  //     return memberChallenge.member.email;
  //   });
  // }

  // async enrollToChallege(challenge_id: number, memberEmail: string): Promise<MemberChallenge> {
  //   const member = await this.membersRepository.findOne({ email: memberEmail });
  //   if (!member) {
  //     throw new BadRequestException(`Member not found`);
  //   }

  //   const challenge = await this.challengeRepository.findOne({ where: { challenge_id } });
  //   if (!challenge) {
  //     throw new BadRequestException(`Challenge not found`);
  //   }

  //   const existingMemberChallenge = await this.membersChallengeRepository.findOne({
  //     where: {
  //       member_email: member.email,
  //       challenge_id: challenge.challenge_id,
  //     },
  //   });

  //   if (existingMemberChallenge) {
  //     throw new BadRequestException(
  //       `Member with email ${member.email} is already part of the challenge with id ${challenge.challenge_id}`,
  //     );
  //   }

  //   const memberChallenge = await this.membersChallengeRepository.create();
  //   memberChallenge.member_email = member.email;
  //   memberChallenge.duration = 0;
  //   memberChallenge.challenge_id = challenge.challenge_id;

  //   return await this.membersChallengeRepository.save(memberChallenge);
  // }
}
