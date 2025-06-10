import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class CreateChallengeDto {
  @IsString()
  challenge_info: string;

  @IsEnum(ChallengeType)
  challenge_type: ChallengeType;

  @IsNumber()
  duration: number;

  @IsString()
  creator: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds: number[];
}
