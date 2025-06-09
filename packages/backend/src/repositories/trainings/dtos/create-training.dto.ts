import { IsNotEmpty, IsString } from 'class-validator';
import { Member } from 'src/database/entities/member.entity';

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  creator: Member;

  @IsString()
  @IsNotEmpty()
  training_info: string;
}
