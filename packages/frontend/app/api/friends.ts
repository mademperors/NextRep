import { z } from 'zod';
import { FitnessGoal } from '~/constants/enums/fitness.enum';
import { Gender } from '~/constants/enums/genders.enum';
import apiFetch from './apiFetch';

// Zod schema for Member entity (excluding friends field to prevent infinite loops)
export const MemberSchema = z.object({
  username: z.string(),
  weight: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  gender: z.nativeEnum(Gender).optional().nullable(),
  age: z.number().optional().nullable(),
  goal: z.nativeEnum(FitnessGoal).optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
});

// Zod schema for friends API responses
export const FriendsResponseSchema = z.object({
  friends: z.array(MemberSchema),
});

export type FriendMember = z.infer<typeof MemberSchema>;
export type FriendsResponse = z.infer<typeof FriendsResponseSchema>;

export const CreateFriendRequestSchema = z.object({
  friendUsername: z.string(),
});

export const HandleFriendRequestSchema = z.object({
  requestId: z.number(),
});

export const FriendRequestResponseSchema = z.object({
  id: z.number(),
  senderUsername: z.string(),
  receiverUsername: z.string(),
  message: z.string().optional().nullable(),
  createdAt: z.date(),
});

export type CreateFriendRequest = z.infer<typeof CreateFriendRequestSchema>;
export type HandleFriendRequest = z.infer<typeof HandleFriendRequestSchema>;
export type FriendRequest = z.infer<typeof FriendRequestResponseSchema>;

export const createFriendRequest = async (friendRequest: CreateFriendRequest): Promise<void> => {
  await apiFetch('/friends/friend-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friendRequest),
  });
};

export const acceptFriendRequest = async (friendRequest: HandleFriendRequest): Promise<void> => {
  await apiFetch('/friends/friend-request/accept', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friendRequest),
  });
};

export const rejectFriendRequest = async (friendRequest: HandleFriendRequest): Promise<void> => {
  await apiFetch('/friends/friend-request/reject', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friendRequest),
  });
};

export const getFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await apiFetch('/friends/friend-requests', {
    method: 'GET',
  });

  return response.json();
};

export const getFriends = async (): Promise<FriendsResponse> => {
  const response = await apiFetch('/friends', {
    method: 'GET',
  });

  const data = await response.json();

  return data;
};

export const addNewFriends = async (newFriendUsernames: string[]): Promise<void> => {
  const response = await apiFetch('/friends/addNewFriends', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newFriendUsernames }),
  });
};

export const removeFriend = async (username: string): Promise<void> => {
  const response = await apiFetch(`/friends/remove/${username}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to remove friend: ${response.statusText}`);
  }
};

export const removeAllFriends = async (): Promise<void> => {
  const response = await apiFetch('/friends/removeAll', {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to remove all friends: ${response.statusText}`);
  }
};

