import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty({ message: 'Duration is required.' })
  @IsInt({ message: 'Duration must be an integer.' })
  @Min(1, { message: 'Duration must be at least 0.' })
  @Type(() => Number)
  duration: number;

  @IsNotEmpty({ message: 'Challenge information is required.' })
  @IsString({ message: 'Challenge information must be a string.' })
  challenge_info: string;

  @IsNotEmpty({ message: 'Challenge type is required.' })
  @IsString({ message: 'Challenge type must be a string.' })
  @Length(3, 50, { message: 'Challenge type must be between 3 and 50 characters.' })
  @IsIn(['private', 'group', 'global'])
  challenge_type: string;

  @IsOptional()
  @IsInt({ message: 'challengeCreatorId must be an integer.' })
  @Type(() => Number)
  challengeCreatorId?: number;
}
