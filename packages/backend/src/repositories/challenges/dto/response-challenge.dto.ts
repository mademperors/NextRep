import { ChallengeType } from 'src/common/constants/enums/challenge-types.enum';

export const CHALLENGE_GROUPS = {
  ENROLLED_CHALLENGES: 'enrolled-challenges',
};

export class ResponseChallengeDto {
  id: number;
  challengeInfo: string;
  challengeType: ChallengeType;
  duration: number;
  currentDay: number;
  startDate: string;

  creator: string;
  trainingIds: number[];
  enrolledUsernames?: string[];
}

