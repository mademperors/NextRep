import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAchievementDto {
  @IsNotEmpty()
  @IsString()
  achievement_info: string;
}
