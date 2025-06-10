import { useQuery } from '@tanstack/react-query';
import 'react-chrome-dino-ts/index.css';
import { useNavigate } from 'react-router';
import { getProfile } from '~/api/members';
import Profile from '~/components/profile/profile';
import { InlineDnaLoader } from '~/components/ui/dna-loader';
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

  //   const onEditProfile = useMutation({
  //     mutationKey: ['profile'],
  //     mutationFn: ({ username, user }: { username: string; user: Member }) =>
  //       updateMember(username, user),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ['profile'] });
  //       toast.success('Profile updated successfully');
  //     },
  //     onError: (error) => {
  //       toast.error('Failed to update profile');
  //       console.error(error);
  //     },
  //   });

  //   const handleEditProfile = () => {
  //     if (!user) return;
  //     onEditProfile.mutate({ username: user.username, user });
  //   };
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
        <Profile user={user} onEditProfile={onEditProfile} />
      </div>
    );
  }
}

