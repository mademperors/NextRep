import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Training } from 'src/database/entities/training.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ICRUD } from '../interfaces/icrud.interface';
import { CreateTrainingDto } from './dtos/create-training.dto';
import { ResponseTrainingDto } from './dtos/response-training.dto';
import { UpdateTrainingDto } from './dtos/update-training.dto';

type Dtos = {
  CreateDto: CreateTrainingDto;
  UpdateDto: UpdateTrainingDto;
  ResponseDto: ResponseTrainingDto;
};
type Param = number;

@Injectable()
export class TrainingsRepository implements ICRUD<Training, Dtos, Param> {
  constructor(
    @InjectRepository(Training) private readonly trainingsRepository: Repository<Training>,
  ) {}

  async findOne(options: Partial<Training>): Promise<Dtos['ResponseDto']> {
    const foundTraining = await this.trainingsRepository.findOneBy(options);
    if (!foundTraining) throw new BadRequestException('Training not found');

    return plainToInstance(ResponseTrainingDto, foundTraining);
  }

  async find(options: FindOptionsWhere<Training>): Promise<Dtos['ResponseDto'][]> {
    const foundTraining = await this.trainingsRepository.findBy(options);

    return plainToInstance(ResponseTrainingDto, foundTraining);
  }

  async create(createDto: Dtos['CreateDto']): Promise<void | Dtos['ResponseDto']> {
    const trainingEntity = this.trainingsRepository.create(createDto);
    await this.trainingsRepository.save(trainingEntity);
  }

  async update(id: Param, updateDto: Dtos['UpdateDto']): Promise<Dtos['ResponseDto']> {
    const existing = await this.trainingsRepository.findOneBy({ id });
    if (!existing) throw new BadRequestException(`Training not found`);

    const updated = this.trainingsRepository.merge(existing, updateDto);
    const saved = await this.trainingsRepository.save(updated);

    return plainToInstance(ResponseTrainingDto, saved);
  }

  async delete(id: Param): Promise<void> {
    const deleted = await this.trainingsRepository.delete({ id });
    if (deleted.affected === 0) throw new BadRequestException(`Training not found`);
  }

  async findCreator(options: Partial<Training>) {
    const foundTraining = await this.trainingsRepository.findOne({
      where: options,
      relations: ['creator'],
    });
    if (!foundTraining) throw new BadRequestException('Training not found');

    return foundTraining.creator;
  }
}
