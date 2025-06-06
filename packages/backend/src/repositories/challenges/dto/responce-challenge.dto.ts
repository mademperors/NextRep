import { Member } from 'src/database/entities/member.entity';
import { CreateChallengeDto } from './create-challenge.dto';

export class ResponseChallengeDto extends CreateChallengeDto {
  members: Member[];
}
