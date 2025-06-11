import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';
import { Role } from 'src/common/constants/enums/roles.enum';
import { AccountChallenge } from 'src/database/entities/account-challenge.entity';
import { Challenge } from 'src/database/entities/challenge.entity';
import { Member } from 'src/database/entities/member.entity';
import { ResponsePublicMemberDto } from 'src/repositories/accounts/members/dtos/response-public-member.dto';
import { MembersRepository } from 'src/repositories/accounts/members/member.repository';
import { ResponseTrainingDto } from 'src/repositories/trainings/dtos/response-training.dto';
import { TrainingsService } from 'src/repositories/trainings/services/training.service';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ResponseChallengeDto } from '../dto/response-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
import { ChallengesCrudRepository } from './challenges-crud.repository';

@Injectable()
export class ChallengesService {
  constructor(
    private readonly challengesCrudRepository: ChallengesCrudRepository,
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(AccountChallenge)
    private readonly accountChallengeRepository: Repository<AccountChallenge>,
    private readonly accountRepository: MembersRepository,
    private readonly trainingsService: TrainingsService,
  ) {}

  async getCreatedChallenges(accountUsername: string): Promise<ResponseChallengeDto[]> {
    const challenges = await this.challengesCrudRepository.find({
      where: { creator: { username: accountUsername } },
    });
    return challenges.map((challenge) => this.mapChallengeToResponseDto(challenge));
  }

  async getEnrolledChallenges(accountUsername: string): Promise<ResponseChallengeDto[]> {
    const member = await this.accountRepository.findMemberForRelation({
      username: accountUsername,
    });
    const challenges = await this.challengesCrudRepository.find({
      where: { enrolled: { account: { username: member.username } } },
    });

    return challenges.map((challenge) => {
      const mappedChallenge = this.mapChallengeToResponseDto(challenge);
      // Manually delete the property for this specific endpoint's output
      delete mappedChallenge.enrolledUsernames;
      return mappedChallenge;
    });
  }

  async getGlobalChallenges(): Promise<ResponseChallengeDto[]> {
    const challenges = await this.challengesCrudRepository.find({
      where: { challengeType: ChallengeType.GLOBAL },
    });
    return challenges.map((challenge) => this.mapChallengeToResponseDto(challenge));
  }

  async getChallengeById(id: number): Promise<ResponseChallengeDto> {
    const challenge = await this.challengesCrudRepository.findOne({ where: { id } });
    return this.mapChallengeToResponseDto(challenge);
  }

  async getEnrolledMembers(id: number): Promise<ResponsePublicMemberDto[]> {
    const challenge = await this.challengesCrudRepository.findOne({ where: { id } });
    return challenge.enrolled.map((enrolled) => ({
      username: enrolled.account.username,
    }));
  }

  async getChallengeTrainings(id: number): Promise<ResponseTrainingDto[]> {
    const challenge = await this.challengesCrudRepository.findOne({ where: { id } });

    // Assuming ResponseTrainingDto matches the structure of your Training entity
    return challenge.trainings.map((training) => ({
      id: training.id,
      title: training.title,
      trainingInfo: training.trainingInfo,
    }));
  }

  async createChallenge(dto: CreateChallengeDto, role: Role): Promise<void> {
    if (role === Role.MEMBER) {
      if (dto.challengeType && dto.challengeType !== ChallengeType.PRIVATE)
        throw new BadRequestException('Members can only create PRIVATE challenges.');

      dto.challengeType = ChallengeType.PRIVATE;
    } else if (role === Role.ADMIN) {
      dto.challengeType = ChallengeType.GLOBAL;
    }
    // The `creator` is already set in the controller based on `req.user!.username`
    // The CRUD repository handles the logic for setting challenge_type based on admin/member role
    await this.challengesCrudRepository.create(dto);
  }

  async updateChallenge(
    id: number,
    dto: UpdateChallengeDto,
    accountUsername: string,
    role: Role,
  ): Promise<void> {
    if (dto.trainingIds !== undefined) {
      if (dto.trainingIds.length === 0) {
        throw new BadRequestException('A challenge must include at least one training.');
      }

      // Fetch all trainings by the provided IDs
      const newTrainingEntities = await this.trainingsService.findTrainingsByIds(dto.trainingIds);

      // Check if all provided training IDs were found
      if (newTrainingEntities.length !== dto.trainingIds.length) {
        const foundIds = new Set(newTrainingEntities.map((t) => t.id));
        const missingIds = dto.trainingIds.filter((tid) => !foundIds.has(tid));
        throw new BadRequestException(
          `Some trainings not found with IDs: ${missingIds.join(', ')}.`,
        );
      }

      // Specific validation for members: Can only use their own trainings
      if (role === Role.MEMBER) {
        // Fetch all trainings created by the current member
        const memberTrainings = await this.trainingsService.findTrainings(accountUsername);
        const memberTrainingIds = new Set(memberTrainings.map((t) => t.id));

        const invalidTrainingIdsForMember = newTrainingEntities
          .filter((training) => !memberTrainingIds.has(training.id))
          .map((t) => t.id);

        if (invalidTrainingIdsForMember.length > 0) {
          throw new BadRequestException(
            `You can only include trainings you created. Invalid training IDs: ${invalidTrainingIdsForMember.join(', ')}.`,
          );
        }
      }
      // Admins are not restricted by this rule
    }

    await this.challengesCrudRepository.update(id, dto);
  }

  async enrollInChallenge(challengeId: number, accountUsername: string): Promise<void> {
    // const challenge = await this.challengesCrudRepository.findOne({ where: { id: challengeId } });
    // const account = await this.accountRepository.findOne({
    //   where: { username: accountUsername },
    // });
    // if (account.userType !== Role.MEMBER) {
    //   throw new ForbiddenException('Only members can enroll in challenges');
    // }
    // const existingEnrollment = await this.accountChallengeRepository.findOne({
    //   where: {
    //     accountUsername: accountUsername,
    //     challengeId: challengeId,
    //   },
    // });
    // if (existingEnrollment) {
    //   throw new BadRequestException('You are already enrolled in this challenge.');
    // }
    // await this.addMemberToChallenge(challenge, member);
  }

  async deleteChallenge(id: number): Promise<void> {
    await this.challengesCrudRepository.delete(id);
  }

  private async addMemberToChallenge(challenge: Challenge, member: Member): Promise<void> {
    // // Initialize completed_days array based on challenge duration
    // const completedDays = Array(challenge.duration).fill(false);
    // const newMemberChallenge = this.accountChallengeRepository.create({
    //   accountUsername: member.username,
    //   challengeId: challenge.id,
    //   member: member, // Establish relation to Member entity
    //   challenge: challenge, // Establish relation to Challenge entity
    //   completedDays: completedDays, // Set the initial state of completed days
    // });
    // await this.accountChallengeRepository.save(newMemberChallenge);
  }

  private mapChallengeToResponseDto(challenge: Challenge): ResponseChallengeDto {
    return {
      id: challenge.id,
      challengeInfo: challenge.challengeInfo,
      challengeType: challenge.challengeType,
      duration: challenge.duration,
      currentDay: challenge.currentDay,
      // Map creator object to its username string
      creator: challenge.creator.username,
      trainingIds: challenge.trainings ? challenge.trainings.map((training) => training.id) : [],
      // Map enrolledMembers (ChallengeEnrollment entities) to an array of usernames
      enrolledUsernames: challenge.enrolled
        ? challenge.enrolled
            .filter((enrollment) => enrollment.account) // Ensure member exists
            .map((enrollment) => enrollment.account.username)
        : [],
    };
  }

  //needed for guard
  async getChallengeCreatorUsername(challengeId: number): Promise<string> {
    const challenge = await this.challengeRepository.findOneOrFail({
      where: { id: challengeId },
      relations: ['creator'],
    });

    return challenge.creator.username;
  }
}
