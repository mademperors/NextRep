import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { Repository } from 'typeorm';
import { MembersRepository } from '../members/member.repository';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ResponseChallengeDto } from './dto/responce-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesRepository {
  constructor(
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(MemberChallenge)
    private readonly membersChallengeRepository: Repository<MemberChallenge>,
    private readonly membersRepository: MembersRepository,
  ) {}

  async addNewMember(challenge_id: number, memberEmail: string): Promise<MemberChallenge> {
    if (!memberEmail) {
      throw new BadRequestException('memberEmail is required');
    }
    const member = await this.membersRepository.findOne({ email: memberEmail });
    if (!member) {
      throw new BadRequestException(`Member with email ${memberEmail} does not exist`);
    }

    const challenge = await this.challengeRepository.findOne({ where: { challenge_id } });
    if (!challenge) {
      throw new BadRequestException(`Challenge with id ${challenge_id} does not exist`);
    }

    const existingMemberChallenge = await this.membersChallengeRepository.findOne({
      where: {
        member_email: member.email,
        challenge_id: challenge.challenge_id,
      },
    });

    if (existingMemberChallenge) {
      throw new BadRequestException(
        `Member with email ${member.email} is already part of the challenge with id ${challenge.challenge_id}`,
      );
    }

    const memberChallenge = new MemberChallenge();
    memberChallenge.member_email = member.email;
    memberChallenge.duration = 0;
    memberChallenge.challenge_id = challenge.challenge_id;

    return await this.membersChallengeRepository.save(memberChallenge);
  }

  async createGlobal(createChallengeDto: CreateChallengeDto): Promise<ResponseChallengeDto> {
    const newChallenge = await this.challengeRepository.create(createChallengeDto);
    const savedChallenge = await this.challengeRepository.save(newChallenge);

    const response = new ResponseChallengeDto();
    response.challenge_id = savedChallenge.challenge_id;
    response.duration = savedChallenge.duration;
    response.challenge_info = savedChallenge.challenge_info;
    response.challenge_type = 'global';
    response.createdByEmail = '';
    response.members = [];
    return response;
  }

  async deleteGlobal(challenge_id: number): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne({ where: { challenge_id } });
    if (!challenge) {
      throw new BadRequestException(`Challenge with id ${challenge_id} does not exist`);
    }

    const memberChallenges = await this.membersChallengeRepository.find({
      where: { challenge_id },
    });

    if (memberChallenges.length > 0) {
      await this.membersChallengeRepository.remove(memberChallenges);
    }

    return await this.challengeRepository.remove(challenge);
  }

  async create(createChallengeDto: CreateChallengeDto): Promise<ResponseChallengeDto> {
    if (!createChallengeDto.createdByEmail) {
      throw new BadRequestException('createdByEmail is required');
    }

    const memberEmail = createChallengeDto.createdByEmail;
    if (!memberEmail) {
      throw new BadRequestException('createdByEmail is required');
    }

    const memberByEmail = await this.membersRepository.findOne({ email: memberEmail });
    if (!memberByEmail) {
      throw new BadRequestException(`Member with email ${memberEmail} does not exist`);
    }

    const newChallenge = await this.challengeRepository.create(createChallengeDto);
    newChallenge.createdBy = memberByEmail;
    const savedChallenge = await this.challengeRepository.save(newChallenge);

    const response = new ResponseChallengeDto();
    response.challenge_id = savedChallenge.challenge_id;
    response.duration = savedChallenge.duration;
    response.challenge_info = savedChallenge.challenge_info;
    response.challenge_type = savedChallenge.challenge_type;
    response.createdByEmail = memberByEmail.email;
    response.members = [];
    return response;
  }

  async findAll(): Promise<ResponseChallengeDto[]> {
    const allChallenges = await this.challengeRepository.find({
      relations: ['createdBy'],
    });

    const allmemberChallenge = await this.membersChallengeRepository.find();

    const responseChallenges = allChallenges.map((challenge) => {
      const response = new ResponseChallengeDto();
      response.challenge_id = challenge.challenge_id;
      response.duration = challenge.duration;
      response.challenge_info = challenge.challenge_info;
      response.challenge_type = challenge.challenge_type;
      response.createdByEmail = challenge.createdBy?.email || '';

      response.members = allmemberChallenge
        .filter((memberChallenge) => memberChallenge.challenge_id === challenge.challenge_id)
        .map((memberChallenge) => memberChallenge.member_email);
      return response;
    });

    return responseChallenges;
  }

  async findOne(challengeId: number): Promise<ResponseChallengeDto> {
    const challenge = await this.challengeRepository.findOne({
      where: { challenge_id: challengeId },
      relations: ['createdBy'],
    });

    if (!challenge) {
      throw new BadRequestException(`Challenge with id ${challengeId} does not exist`);
    }

    const allmemberChallenge = await this.membersChallengeRepository.find({
      where: { challenge_id: challenge.challenge_id },
    });

    const response = new ResponseChallengeDto();
    response.challenge_id = challenge.challenge_id;
    response.duration = challenge.duration;
    response.challenge_info = challenge.challenge_info;
    response.challenge_type = challenge.challenge_type;
    response.createdByEmail = challenge.createdBy?.email || '';

    response.members = allmemberChallenge
      .filter((memberChallenge) => memberChallenge.challenge_id === challenge.challenge_id)
      .map((memberChallenge) => memberChallenge.member_email);
    return response;
  }

  async update(
    challengeId: number,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<ResponseChallengeDto> {
    const challenge = await this.challengeRepository.findOne({
      where: { challenge_id: challengeId },
    });
    if (!challenge) {
      throw new BadRequestException(`Challenge with id ${challengeId} does not exist`);
    }

    const updatedChallenge = Object.assign(challenge, updateChallengeDto);
    await this.challengeRepository.save(updatedChallenge);

    return await this.findOne(challengeId);
  }

  async delete(challengeId: number, createdBy?: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne({
      where: { challenge_id: challengeId },
      relations: ['createdBy'],
    });

    if (!challenge) {
      throw new BadRequestException(`Challenge with id ${challengeId} does not exist`);
    }

    if (!createdBy || (createdBy && createdBy !== challenge.createdBy?.email)) {
      throw new BadRequestException(
        `You are not authorized to delete this challenge. Created by: ${challenge.createdBy?.email}`,
      );
    }

    return await this.deleteGlobal(challengeId);
  }
}
