import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import 'react-chrome-dino-ts/index.css';
import { useNavigate } from 'react-router';
import { getMyAchievements } from '~/api/achievements';
import { getEnrolledChallenges } from '~/api/challenges';
import { getProfile } from '~/api/members';
import Profile from '~/components/profile/profile';
import { InlineDnaLoader } from '~/components/ui/dna-loader';
import useListChallenges from '~/hooks/useListChallenges';
import type { Route } from './+types/profile';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Profile' }, { name: 'description', content: 'View your profile' }];
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    status,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: enrolledChallenges } = useSuspenseQuery({
    queryKey: ['enrolledChallenges'],
    queryFn: () => getEnrolledChallenges(),
  });
  const listEnrolledChallenges = useListChallenges(enrolledChallenges);

  const { data: achievements } = useSuspenseQuery({
    queryKey: ['achievements'],
    queryFn: () => getMyAchievements(),
  });

  const onEditProfile = () => {
    navigate('/profile/edit');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <InlineDnaLoader height={60} width={60} ariaLabel="Loading profile..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-screen w-full items-center justify-center">Error loading profile</div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Profile
          user={user}
          onEditProfile={onEditProfile}
          enrolledChallenges={listEnrolledChallenges}
          achievements={achievements.achivements}
        />
      </div>
    );
  }
}

