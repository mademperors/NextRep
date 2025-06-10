import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from 'src/database/entities/member.entity';
import { Training } from 'src/database/entities/training.entity';
import { In, Repository } from 'typeorm';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { ResponseTrainingDto } from '../dtos/response-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { TrainingsCrudRepository } from './training-crud.repository';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training) private readonly trainingsRepository: Repository<Training>,
    private readonly trainingsCrudRepository: TrainingsCrudRepository,
  ) {}

  // --- NEW SERVICE METHODS ---

  async findTrainings(memberUsername: string): Promise<ResponseTrainingDto[]> {
    const trainingEntities = await this.trainingsCrudRepository.find({
      where: { creator: { username: memberUsername } },
      relations: ['creator'],
    });
    return this.mapToResponseDto(trainingEntities);
  }

  async findOneTraining(id: number): Promise<ResponseTrainingDto> {
    const trainingEntity = await this.getTrainingEntityWithCreator(id);
    return this.mapToResponseDto(trainingEntity);
  }

  async createTraining(createDto: CreateTrainingDto): Promise<void> {
    await this.trainingsCrudRepository.create(createDto);
  }

  async updateTraining(id: number, updateDto: UpdateTrainingDto): Promise<void> {
    await this.trainingsCrudRepository.update(id, updateDto);
  }

  async deleteTraining(id: number): Promise<void> {
    await this.trainingsCrudRepository.delete(id);
  }

  // --- AUX METHODS ---

  public async findTrainingsByIds(ids: number[]): Promise<Training[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    // Using the direct repository to find by IDs with relations
    return await this.trainingsRepository.find({
      where: { id: In(ids) }, // Use TypeORM's 'In' operator for multiple IDs
      relations: ['creator'], // Load creator as it's needed for challenge creation/update contexts
    });
  }

  public async getTrainingEntityWithCreator(id: number): Promise<Training> {
    const training = await this.trainingsRepository.findOneOrFail({
      where: { id },
      relations: ['creator'],
    });

    return training;
  }

  public async getTrainingCreatorUsername(trainingId: number): Promise<string> {
    const training = await this.trainingsRepository.findOneOrFail({
      where: { id: trainingId },
      relations: ['creator'],
    });
    return training.creator.username;
  }

  public mapToResponseDto(training: Training): ResponseTrainingDto;
  public mapToResponseDto(trainings: Training[]): ResponseTrainingDto[];
  public mapToResponseDto(
    data: Training | Training[],
  ): ResponseTrainingDto | ResponseTrainingDto[] {
    if (Array.isArray(data)) {
      const dtos = plainToInstance(ResponseTrainingDto, data);
      dtos.forEach((dto, index) => {
        const originalEntity = data[index];
        if (originalEntity.creator && (originalEntity.creator as Member).username) {
          dto.creator = (originalEntity.creator as Member).username;
        }
      });
      return dtos;
    } else {
      const dto = plainToInstance(ResponseTrainingDto, data);
      if (data.creator && (data.creator as Member).username) {
        dto.creator = (data.creator as Member).username;
      }
      return dto;
    }
  }
}
