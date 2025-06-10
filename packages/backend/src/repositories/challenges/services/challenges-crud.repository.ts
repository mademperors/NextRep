import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MembersRepository } from 'src/repositories/members/member.repository';
import { TrainingsService } from 'src/repositories/trainings/services/training.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ICRUD } from '../../interfaces/icrud.interface';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';

type Dtos = {
  CreateDto: CreateChallengeDto;
  UpdateDto: UpdateChallengeDto;
  ResponseDto: Challenge;
};
type Param = number;

const DEFAULT_CHALLENGE_RELATIONS = ['creator', 'trainings', 'enrolledMembers.member'];

@Injectable()
export class ChallengesCrudRepository implements ICRUD<Challenge, Dtos, Param> {
  constructor(
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    private readonly membersRepository: MembersRepository,
    private readonly trainingsService: TrainingsService,
  ) {}

  async findOne(options: FindOneOptions<Challenge>): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOneOrFail({
      ...options,
      relations: DEFAULT_CHALLENGE_RELATIONS,
    });
    return challenge;
  }

  async find(options: FindManyOptions<Challenge>): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.find({
      ...options,
      relations: DEFAULT_CHALLENGE_RELATIONS,
    });
    return challenges;
  }

  async create(createDto: CreateChallengeDto): Promise<void> {
    const creatorMember = await this.membersRepository.findMemberForRelation({
      username: createDto.creator,
    });

    if (!createDto.trainingIds || createDto.trainingIds.length === 0)
      throw new BadRequestException('A challenge must include at least one training.');

    const trainingEntities = await this.trainingsService.findTrainingsByIds(createDto.trainingIds);

    if (trainingEntities.length !== createDto.trainingIds.length) {
      const foundIds = new Set(trainingEntities.map((t) => t.id));
      const missingIds = createDto.trainingIds.filter((id) => !foundIds.has(id));
      throw new BadRequestException(`Trainings not found with IDs: ${missingIds.join(', ')}.`);
    }

    const newChallenge = this.challengeRepository.create({
      challenge_info: createDto.challengeInfo,
      challenge_type: createDto.challengeType,
      creator: creatorMember,
      trainings: trainingEntities,
      duration: trainingEntities.length,
      current_day: 0,
    });

    await this.challengeRepository.save(newChallenge);
  }

  async update(id: Param | number, updateDto: UpdateChallengeDto): Promise<void> {
    const existingChallenge = await this.challengeRepository.findOneOrFail({
      where: { id: id as number },
      relations: DEFAULT_CHALLENGE_RELATIONS,
    });

    const scalarUpdates: { challenge_info?: string; challenge_type?: ChallengeType } = {};

    if (updateDto.challengeInfo !== undefined) {
      scalarUpdates.challenge_info = updateDto.challengeInfo;
    }
    if (updateDto.challengeType !== undefined) {
      scalarUpdates.challenge_type = updateDto.challengeType;
    }

    const mergedChallenge = this.challengeRepository.merge(existingChallenge, scalarUpdates);

    // If trainingIds are provided, fetch them and update the relation
    if (updateDto.trainingIds !== undefined) {
      // The validation for trainingIds (e.g., must not be empty, existence, and member's own trainings)
      // has been moved to the service. So here, we just fetch and assign.
      const newTrainingEntities = await this.trainingsService.findTrainingsByIds(
        updateDto.trainingIds,
      );
      mergedChallenge.trainings = newTrainingEntities;
      mergedChallenge.duration = newTrainingEntities.length; // Update duration based on new trainings
    }

    await this.challengeRepository.save(mergedChallenge);
  }

  async delete(id: Param | number): Promise<void> {
    const deleted = await this.challengeRepository.delete({ id });
    if (deleted.affected === 0) throw new NotFoundException(`Training not found`);
  }
}
