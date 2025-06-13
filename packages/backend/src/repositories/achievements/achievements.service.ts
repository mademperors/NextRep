import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achivement } from 'src/database/entities/achivement.entity';
import { Member } from 'src/database/entities/member.entity';
import { Repository } from 'typeorm';
import { ChallengesCrudRepository } from '../challenges/services/challenges-crud.repository';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { ResponseAchivementsDto } from './dto/responce-achivements.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AccountChallenge } from 'src/database/entities/account-challenge.entity';

@Injectable()
export class AchivementsService {
  constructor(
    @InjectRepository(Achivement)
    private readonly achivementRepository: Repository<Achivement>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly challengesRepository: ChallengesCrudRepository,
  ) {}

  async getMyAchievements(username: string) {
    return this.memberRepository
      .findOne({
        where: { username },
        relations: ['achivements'],
      })
      .then((member) => {
        if (!member) throw new BadRequestException('Member not found');
        return { achivements: member.achivements || [] };
      });
  }

  async getGenericAchievements(username: string): Promise<ResponseAchivementsDto> {
    // Find the member and their enrolled challenges
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['achivements'],
    });
    if (!member) throw new BadRequestException('Member not found');

    // Get all AccountChallenge records for this member
    const accountChallenges = await this.challengesRepository['challengeRepository'].manager.find(
      'account_challenge',
      {
        where: { accountUsername: username },
      },
    );

    const achievements: Achivement[] = [];

    // 1. Enrolled in first challenge
    if (accountChallenges.length > 0) {
      achievements.push({
        achievement_id: 0,
        achievement_info: 'Enrolled in first challenge',
      } as Achivement);
    }

    // 2. Completed the first day of any challenge
    const completedFirstDay = accountChallenges.some(
      (ac: AccountChallenge) => ac.completedDays && ac.completedDays[0],
    );
    if (completedFirstDay) {
      achievements.push({
        achievement_id: 0,
        achievement_info: 'Completed the first day of challenge',
      } as Achivement);
    }

    // 3. Completed one challenge (all days true in any challenge)
    const completedOneChallenge = accountChallenges.some(
      (ac: any) =>
        Array.isArray(ac.completedDays) &&
        ac.completedDays.length > 0 &&
        ac.completedDays.every((d: boolean) => d),
    );
    if (completedOneChallenge) {
      achievements.push({
        achievement_id: 0,
        achievement_info: 'Completed one challenge',
      } as Achivement);
    }

    return { achivements: achievements };
  }

  async create(createAchivementDto: CreateAchievementDto): Promise<ResponseAchivementsDto> {
    const achivement = this.achivementRepository.create();
    achivement.achievement_info = createAchivementDto.achievement_info;
    const res = await this.achivementRepository.save(achivement);
    return { achivements: [res] };
  }

  async addAchievement(username: string, achivementId: number): Promise<ResponseAchivementsDto> {
    const member = await this.memberRepository.findOne({
      where: { username },
      relations: ['achivements'],
    });
    if (!member) throw new BadRequestException('Member not found');

    const achivement = await this.achivementRepository.findOne({
      where: { achievement_id: achivementId },
    });
    if (!achivement) throw new BadRequestException('Achivement not found');

    member.achivements = member.achivements || [];
    member.achivements.push(achivement);
    await this.memberRepository.save(member);
    return { achivements: member.achivements };
  }

  async findAll(): Promise<ResponseAchivementsDto> {
    const res = await this.achivementRepository.find();
    return { achivements: res };
  }

  async findOne(achivement_id: number): Promise<ResponseAchivementsDto> {
    const achivement = await this.achivementRepository.findOne({
      where: { achievement_id: achivement_id },
    });
    if (!achivement) throw new BadRequestException('Achivement not found');
    return { achivements: [achivement] };
  }

  async update(
    achievementId: number,
    updateAchivementDto: UpdateAchievementDto,
  ): Promise<ResponseAchivementsDto> {
    const achivement = await this.achivementRepository.findOne({
      where: { achievement_id: achievementId },
    });
    if (!achivement) throw new BadRequestException('Achievement not found');
    const updatedAchievement = Object.assign(achivement, updateAchivementDto);
    const res = await this.achivementRepository.save(updatedAchievement);
    return { achivements: [res] };
  }

  async remove(achievementId: number) {
    const result = await this.achivementRepository.delete(achievementId);
    if (result.affected === 0) throw new BadRequestException('Achivement not found');
  }
}
