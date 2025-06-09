import { Exclude } from 'class-transformer';
import { Member } from 'src/database/entities/member.entity';

export class ResponseTrainingDto {
  id: number;
  title: string;
  training_info: string;

  @Exclude()
  creator: Member;
}
