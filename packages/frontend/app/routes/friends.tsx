import { FriendList } from '~/components/friends/friend-list';
import { useFriends } from '~/hooks/useFriends';
import type { Route } from './+types/friends';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Friends' }, { name: 'description', content: 'Your friends' }];
}
export default function Friends() {
  const friends = useFriends();
  return <FriendList friends={friends} />;
}

