import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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
  @IsIn(['private', 'group', 'global'])
  challenge_type: string;

  @IsOptional()
  @IsEmail()
  createdByEmail?: string;
}
