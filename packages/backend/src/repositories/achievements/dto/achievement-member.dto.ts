import { IsNumber, IsString } from 'class-validator';

export class AchievementMemberDto {
  @IsString()
  username: string;

  @IsNumber()
  achivementId: number;
}
