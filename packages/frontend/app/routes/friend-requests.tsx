import FriendRequestsPage from '~/components/friends/friend-requests';
import { useFriendRequests } from '~/hooks/useFriendRequests';
import type { Route } from './+types/friend-requests';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Friend Requests' }, { name: 'description', content: 'Your friend requests' }];
}
export default function FriendRequests() {
  const friendRequests = useFriendRequests();
  return (
    <FriendRequestsPage
      requests={friendRequests.requests}
      handleAccept={friendRequests.acceptFriendRequest}
      handleDecline={friendRequests.rejectFriendRequest}
    />
  );
}

