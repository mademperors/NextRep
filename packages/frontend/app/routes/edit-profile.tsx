import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { getProfile, updateMember, type Member } from '~/api/members';
import EditProfile from '~/components/profile/edit-profile';

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
    return <div>Loading...</div>; // TODO: add a loader
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

