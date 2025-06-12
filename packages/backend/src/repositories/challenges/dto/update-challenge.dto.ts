import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinDate,
} from 'class-validator';
import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class UpdateChallengeDto {
  @IsString()
  @IsOptional()
  challengeInfo?: string;

  @IsEnum(ChallengeType)
  @IsOptional()
  challengeType?: ChallengeType;

  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
  @MinDate(
    (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow;
    })(),
    { message: 'Challenge start date must be at least tomorrow' },
  )
  startDate?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Assuming a challenge must have at least one training
  trainingIds?: number[];
}
