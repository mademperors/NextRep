import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { acceptFriendRequest, getFriendRequests, rejectFriendRequest, type FriendRequest } from '~/api/friends';

interface FriendRequests {
    requests: FriendRequest[];
    acceptFriendRequest: (requestId: number) => void;
    rejectFriendRequest: (requestId: number) => void;
}

export const useFriendRequests = (): FriendRequests => {
    const queryClient = useQueryClient();
    const { data: friendRequests } = useSuspenseQuery({
        queryKey: ['friend-requests'],
        queryFn: () => getFriendRequests(),
    });
    const { mutate: acceptFriendRequestMutation } = useMutation({
        mutationFn: (requestId: number) => acceptFriendRequest({ requestId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
            toast.success('Friend request accepted');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const { mutate: rejectFriendRequestMutation } = useMutation({
        mutationFn: (requestId: number) => rejectFriendRequest({ requestId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friend-requests'] });
            toast.success('Friend request rejected');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { requests: friendRequests, acceptFriendRequest: acceptFriendRequestMutation, rejectFriendRequest: rejectFriendRequestMutation };
};

