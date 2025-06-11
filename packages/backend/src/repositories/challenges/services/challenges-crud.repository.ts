import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { AccountRepository } from 'src/repositories/accounts/accounts.repository';
import { TrainingsService } from 'src/repositories/trainings/services/training.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ICRUD } from '../../interfaces/icrud.interface';
import { CreateChallengeDto, CreateChallengeDtoWithCreator } from '../dto/create-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';

type Dtos = {
  CreateDto: CreateChallengeDto;
  UpdateDto: UpdateChallengeDto;
  ResponseDto: Challenge;
};
type Param = number;

const DEFAULT_CHALLENGE_RELATIONS = ['creator', 'trainings', 'enrolled.account'];

@Injectable()
export class ChallengesCrudRepository implements ICRUD<Challenge, Dtos, Param> {
  constructor(
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    private readonly accountsRepository: AccountRepository,
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

  async create(createDto: CreateChallengeDtoWithCreator): Promise<void> {
    const creatorMember = await this.accountsRepository.findForRelation(createDto.creator);

    if (!createDto.trainingIds || createDto.trainingIds.length === 0)
      throw new BadRequestException('A challenge must include at least one training.');

    const trainingEntities = await this.trainingsService.findTrainingsByIds(createDto.trainingIds);

    // Check for both missing and unauthorized trainings in one validation
    const foundAuthorizedIds = new Set(
      trainingEntities
        .filter((training) => training.creator.username === creatorMember.username)
        .map((training) => training.id),
    );

    const invalidIds = createDto.trainingIds.filter((id) => !foundAuthorizedIds.has(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Trainings not found or unauthorized with IDs: ${invalidIds.join(', ')}.`,
      );
    }

    const newChallenge = this.challengeRepository.create({
      challengeInfo: createDto.challengeInfo,
      challengeType: createDto.challengeType,
      creator: creatorMember,
      trainings: trainingEntities,
      duration: trainingEntities.length,
      currentDay: 1,
    });

    await this.challengeRepository.save(newChallenge);
  }

  async update(id: Param | number, updateDto: UpdateChallengeDto): Promise<void> {
    const existingChallenge = await this.challengeRepository.findOneOrFail({
      where: { id: id as number },
      relations: DEFAULT_CHALLENGE_RELATIONS,
    });

    // Prepare scalar updates
    const scalarUpdates: Partial<Challenge> = {};

    if (updateDto.challengeInfo !== undefined) {
      scalarUpdates.challengeInfo = updateDto.challengeInfo;
    }

    if (updateDto.challengeType !== undefined) {
      scalarUpdates.challengeType = updateDto.challengeType;
    }

    // Merge scalar updates
    const mergedChallenge = this.challengeRepository.merge(existingChallenge, scalarUpdates);

    // If trainingIds are provided, fetch them and update the relation
    if (updateDto.trainingIds !== undefined) {
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
