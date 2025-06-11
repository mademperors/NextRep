import { IsOptional, IsString } from 'class-validator';

export class UpdateTrainingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  trainingInfo?: string;
}
