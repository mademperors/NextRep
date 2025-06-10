import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getChallenge } from '~/api/challenges';
import { Challenge } from '~/components/challenge/challenge';
import type { Route } from './+types/single-challenge';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Challenge ${params.challengeId}` },
    { name: 'description', content: 'Challenge' },
  ];
}

export default function SingleChallenge() {
  const { challengeId } = useParams();
  const { data: challenge } = useSuspenseQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId!),
  });

  return (
    <Challenge
      days={challenge.days}
      currentDay={challenge.currentDay}
      status={challenge.status}
      title={challenge.name}
      description={challenge.description}
      dayDescription={challenge.tasks[challenge.currentDay]}
      onCompleteDay={() => {}}
    />
  );
}
