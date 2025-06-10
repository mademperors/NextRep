import type { Member } from '~/api/members';

export const useIsEnrolledInChallenge = (challengeId: string, member: Member) => {
  return member.challenges?.some((challenge) => challenge === challengeId);
};

