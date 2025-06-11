import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from 'src/database/entities/training.entity';
import { MembersRepository } from 'src/repositories/accounts/members/member.repository';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ICRUD } from '../../interfaces/icrud.interface';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';

type Dtos = {
  CreateDto: CreateTrainingDto;
  UpdateDto: UpdateTrainingDto;
  ResponseDto: Training;
};
type Param = number;

@Injectable()
export class TrainingsCrudRepository implements ICRUD<Training, Dtos, Param> {
  constructor(
    @InjectRepository(Training) private readonly trainingsRepository: Repository<Training>,
    private readonly membersRepository: MembersRepository,
  ) {}

  async findOne(options: FindOneOptions): Promise<Dtos['ResponseDto']> {
    const foundTraining = await this.trainingsRepository.findOneOrFail(options);
    return foundTraining;
  }

  async find(options: FindManyOptions<Training>): Promise<Dtos['ResponseDto'][]> {
    const foundTrainings = await this.trainingsRepository.find(options);
    return foundTrainings;
  }

  async create(createDto: Dtos['CreateDto']): Promise<void> {
    const creatorMember = await this.membersRepository.findMemberForRelation({
      username: createDto.creator,
    });

    const trainingEntity = this.trainingsRepository.create({
      title: createDto.title,
      trainingInfo: createDto.trainingInfo,
      creator: creatorMember,
    });

    await this.trainingsRepository.save(trainingEntity);
  }

  async update(id: Param, updateDto: Dtos['UpdateDto']): Promise<void> {
    const existing = await this.trainingsRepository.findOneByOrFail({ id });

    const updated = this.trainingsRepository.merge(existing, updateDto);
    await this.trainingsRepository.save(updated);
  }

  async delete(id: Param): Promise<void> {
    const deleted = await this.trainingsRepository.delete({ id });
    if (deleted.affected === 0) throw new NotFoundException(`Training not found`);
  }
}
