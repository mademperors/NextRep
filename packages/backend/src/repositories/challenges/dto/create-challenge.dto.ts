import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class CreateChallengeDto {
  @IsString()
  challengeInfo: string;

  @IsOptional()
  @IsEnum(ChallengeType)
  challengeType?: ChallengeType;

  @ValidateIf(() => false)
  @IsString()
  creator: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds: number[];
}
