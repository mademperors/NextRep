import { type Challenge } from '~/api/challenges';
import type { Member } from '~/api/members';
import type { ListChallenge } from '~/components/challenge/challenge-list';
import { useIsEnrolledInChallenge } from './useIsEnrolledInChallenge';

export const useListChallenges = (
  originalChallenges: Challenge[],
  member: Member,
): ListChallenge[] => {
  return originalChallenges.map((challenge) => ({
    id: challenge.id,
    name: challenge.name,
    description: challenge.description,
    days: challenge.days.length,
    enrolled: useIsEnrolledInChallenge(challenge.id, member) ?? false,
  }));
};

