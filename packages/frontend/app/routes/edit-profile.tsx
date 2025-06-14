import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { Member } from '~/api/members';
import { getProfile, updateMember } from '~/api/members';
import EditProfile from '~/components/profile/edit-profile';
import { InlineDnaLoader } from '~/components/ui/dna-loader';
import type { Route } from './+types/edit-profile';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Edit Profile' },
    { name: 'description', content: 'Edit your profile information' },
  ];
}

export default function EditProfileRoute() {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (user: Member) => updateMember(user.username, user),
    onSuccess: () => {
      navigate('/profile');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update profile');
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <InlineDnaLoader height={60} width={60} ariaLabel="Loading profile data..." />
      </div>
    );
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  if (!isSuccess) {
    return <div>No user found</div>;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <EditProfile user={user} onSave={updateProfile} />
    </div>
  );
}

