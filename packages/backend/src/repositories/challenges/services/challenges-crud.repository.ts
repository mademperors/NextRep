import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from 'src/database/entities/challenge.entity';
import { MemberChallenge } from 'src/database/entities/memberChallenge.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ICRUD } from '../../interfaces/icrud.interface';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ResponseChallengeDto } from '../dto/responce-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';

type Dtos = {
  CreateDto: CreateChallengeDto;
  UpdateDto: UpdateChallengeDto;
  ResponseDto: ResponseChallengeDto;
};
// type Param = number;

@Injectable()
export class ChallengesCrudRepository implements ICRUD<Challenge, Dtos> {
  constructor(
    @InjectRepository(Challenge) private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(MemberChallenge)
    private readonly membersChallengeRepository: Repository<MemberChallenge>,
  ) {}
  findOne(options: FindOneOptions<Challenge>): Promise<ResponseChallengeDto> {
    throw new Error('Method not implemented.');
  }
  find(options: FindManyOptions<Challenge>): Promise<ResponseChallengeDto[]> {
    throw new Error('Method not implemented.');
  }
  create(dto: CreateChallengeDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(param: string | number, dto: UpdateChallengeDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(param: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
