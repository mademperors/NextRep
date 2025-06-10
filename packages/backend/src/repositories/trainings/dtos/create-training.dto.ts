import { IsString, ValidateIf } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  title: string;

  @ValidateIf(() => false)
  @IsString()
  creator: string;

  @IsString()
  training_info: string;
}
