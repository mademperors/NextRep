import { type Challenge } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';

export default function useIsEnrolledInChallenge(challenge: Challenge) {
  const { user } = useAuth();

  return challenge.enrolledUsernames?.some((username) => username === user?.username) ?? false;
}

