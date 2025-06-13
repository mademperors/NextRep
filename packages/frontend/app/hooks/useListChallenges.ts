import type { Challenge } from '~/api/challenges';
import type { ListChallenge } from '~/components/challenge/challenge-list';
import { getChallengeStatus } from '~/components/challenge/utils';
import useIsEnrolledInChallenges from './useIsEnrolledInChallenges';

export default function useListChallenges(challenges: Challenge[]): ListChallenge[] {
  const isEnrolled = useIsEnrolledInChallenges(challenges);

  const listChallenges = challenges.map((challenge, index) => ({
    challenge,
    enrolled: isEnrolled[index],
    status: getChallengeStatus(challenge),
  }));

  return listChallenges;
}

