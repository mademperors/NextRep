import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import 'react-chrome-dino-ts/index.css';
import { useParams } from 'react-router';
import { getEnrolledChallengesByUsername } from '~/api/challenges';
import { getMember } from '~/api/members';
import Profile from '~/components/profile/profile';
import { InlineDnaLoader } from '~/components/ui/dna-loader';
import useListChallenges from '~/hooks/useListChallenges';
import type { Route } from './+types/profile';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profile' }, { name: 'description', content: 'View your profile' }];
}

export default function ProfilePage() {
  const { username } = useParams();
  const {
    data: user,
    isLoading,
    status,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getMember(username!),
  });

  const { data: enrolledChallenges } = useSuspenseQuery({
    queryKey: ['enrolledChallenges', username],
    queryFn: () => getEnrolledChallengesByUsername(username!),
  });
  const listEnrolledChallenges = useListChallenges(enrolledChallenges);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <InlineDnaLoader height={60} width={60} ariaLabel="Loading profile..." />
      </div>
    );
  }

  if (status === 'error') {
    return <div className="flex w-full items-center justify-center">Error loading profile</div>;
  }

  if (status === 'success') {
    return (
      <div className="flex w-full items-center justify-center py-10">
        <Profile user={user} enrolledChallenges={listEnrolledChallenges} />
      </div>
    );
  }
}

