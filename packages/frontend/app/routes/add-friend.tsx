import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createFriendRequest } from '~/api/friends';
import { AddFriend } from '~/components/friends/add-friend';
import type { Route } from './+types/add-friend';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Add Friend' }, { name: 'description', content: 'Add a new friend' }];
}

export default function AddFriendPage() {
  const navigate = useNavigate();
  const { mutate: addFriend } = useMutation({
    mutationFn: (friendIdentifier: string) =>
      createFriendRequest({ friendUsername: friendIdentifier }),
    onSuccess: () => {
      toast.success('Friend request sent successfully');
      navigate('/friends');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Failed to send friend request');
    },
  });

  return (
    <div className="w-full mx-auto p-4">
      <AddFriend onSubmit={addFriend} />
    </div>
  );
}

