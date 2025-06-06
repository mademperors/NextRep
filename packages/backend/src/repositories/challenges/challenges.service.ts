import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  updateNewMember(id: number, memberId: string) {
    throw new Error('Method not implemented.');
  }

  createGlobal(createChallengeDto: CreateChallengeDto) {
    throw new Error('Method not implemented.');
  }

  deleteGlobal(id: number) {
    throw new Error('Method not implemented.');
  }
  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  delete(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
