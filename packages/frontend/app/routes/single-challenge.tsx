import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { enrollInChallenge, getChallenge } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';
import { Challenge, ChallengeStatus } from '~/components/challenge/challenge';
import { FullScreenDnaLoader } from '~/components/ui/dna-loader';
import { Role } from '~/constants/enums/roles.enum';
import type { Route } from './+types/single-challenge';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Challenge ${params.challengeId}` },
    { name: 'description', content: 'Challenge' },
  ];
}

export default function SingleChallenge() {
  const { challengeId } = useParams();
  const { user } = useAuth();
  const { data: challenge, status } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId!),
  });
  const { mutate: enroll } = useMutation({
    mutationFn: () => enrollInChallenge(challengeId!, user!.username),
    onError: (error) => {
      console.error(error);
      toast.error('Failed to enroll in challenge');
    },
  });

  const getCurrentDay = () => {
    if (challenge?.status === ChallengeStatus.COMPLETED) {
      return challenge.days.length;
    }
    return challenge?.currentDay || 0;
  };

  if (status === 'success') {
    return (
      <Challenge
        days={challenge.days}
        currentDay={getCurrentDay()}
        status={challenge.status}
        title={challenge.name}
        description={challenge.description}
        dayDescriptions={challenge.tasks}
        onCompleteDay={() => {}}
        isEnrolled={
          (user?.role === Role.MEMBER &&
            user?.challenges?.some((challenge) => challenge === challengeId)) ||
          false
        }
        onEnroll={() => {}}
      />
    );
  }

  return <FullScreenDnaLoader />;
}

