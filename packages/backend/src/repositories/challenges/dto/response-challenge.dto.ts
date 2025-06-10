import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export class ResponseChallengeDto {
  id: number;
  challenge_info: string;
  challenge_type: ChallengeType;
  duration: number;
  current_day: number;

  creator: string;
  trainingIds: number[];
  enrolledUsernames: string[];
}
