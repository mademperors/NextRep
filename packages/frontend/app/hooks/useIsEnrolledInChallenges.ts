import type { Challenge } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';

export default function useIsEnrolledInChallenges(challenges: Challenge[]) {
  const { user } = useAuth();

  return challenges.map(
    (challenge) =>
      challenge.enrolledUsernames?.some((username) => username === user?.username) ?? false,
  );
}

