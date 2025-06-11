import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class CreateChallengeDto {
  @IsString()
  challengeInfo: string;

  @IsEnum(ChallengeType)
  challengeType: ChallengeType;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds: number[];
}

export class CreateChallengeDtoWithCreator extends CreateChallengeDto {
  creator: string;
}
