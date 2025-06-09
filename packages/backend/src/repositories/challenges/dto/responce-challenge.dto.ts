import { CreateChallengeDto } from './create-challenge.dto';

export class ResponseChallengeDto extends CreateChallengeDto {
  challenge_id: number;
}
