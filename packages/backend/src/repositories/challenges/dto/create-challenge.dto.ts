import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';
import { AtLeastTomorrow } from 'src/common/validators/at-least-tomorrow.validator';

export class CreateChallengeDto {
  @IsString()
  challengeInfo: string;

  @IsEnum(ChallengeType)
  challengeType: ChallengeType;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  @AtLeastTomorrow({ message: 'Start date must be at least tomorrow.' })
  startDate: string; // Date string in YYYY-MM-DD format

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds: number[];
}

export class CreateChallengeDtoWithCreator extends CreateChallengeDto {
  creator: string;
}
