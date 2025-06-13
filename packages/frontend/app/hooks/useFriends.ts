import { useSuspenseQuery } from '@tanstack/react-query';
import { getFriends } from '~/api/friends';
import type { Friend } from '~/components/friends/friend-list';
import { Gender } from '~/constants/enums/genders.enum';

export const useFriends = (): Friend[] => {
  const { data: friends } = useSuspenseQuery({
    queryKey: ['friends'],
    queryFn: () => getFriends(),
  });

  return friends.friends.map((friend) => ({
    id: friend.username,
    name: friend.username,
    gender: friend.gender ?? Gender.MALE,
    weight: friend.weight ?? undefined,
    height: friend.height ?? undefined,
    fitnessGoal: friend.goal ?? undefined,
  }));
};

