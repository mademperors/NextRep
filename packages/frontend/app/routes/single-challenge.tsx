import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getChallenge } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';
import { Challenge } from '~/components/challenge/challenge';
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

  if (status === 'success') {
    return (
      <Challenge
        days={challenge.days}
        currentDay={challenge.currentDay}
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

