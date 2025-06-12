import { IsString, ValidateIf } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  title: string;

  @ValidateIf(() => false)
  @IsString()
  creator: string;

  @IsString()
  trainingInfo: string;
}
