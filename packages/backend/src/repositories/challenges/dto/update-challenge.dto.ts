import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class UpdateChallengeDto {
  @IsString()
  @IsOptional()
  challengeInfo?: string;

  @IsEnum(ChallengeType)
  @IsOptional()
  challengeType?: ChallengeType;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds?: number[];
}
