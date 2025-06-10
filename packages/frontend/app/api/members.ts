import { z } from 'zod';
import { FitnessGoal } from '~/constants/enums/fitness.enum';
import { Gender } from '~/constants/enums/genders.enum';
import apiFetch from './apiFetch';

const memberSchema = z.object({
  username: z.string(),
  weight: z.number().optional(),
  height: z.number().optional(),
  gender: z.nativeEnum(Gender).optional(),
  age: z.number().optional(),
  goal: z.nativeEnum(FitnessGoal).optional(),
  additional_info: z.string().optional(),
});
export type Member = z.infer<typeof memberSchema>;

// Update member type to match UpdateMemberDto
const updateMemberSchema = z.object({
  weight: z.number().optional(),
  height: z.number().optional(),
  gender: z.nativeEnum(Gender).optional(),
  age: z.number().optional(),
  goal: z.nativeEnum(FitnessGoal).optional(),
  additional_info: z.string().optional(),
  password: z.string().optional(),
});
export type UpdateMember = z.infer<typeof updateMemberSchema>;

export const getProfile = async (): Promise<Member> => {
  const response = await apiFetch('/auth/me', {
    method: 'GET',
  });

  return response.json();
};

// GET /members/:username - Find a member by username
export const getMember = async (username: string): Promise<Member> => {
  const response = await apiFetch(`/members/${username}`, {
    method: 'GET',
  });

  return response.json();
};

// PATCH /members/:username - Update a member (requires AccountOwnerGuard)
export const updateMember = async (username: string, updateData: UpdateMember): Promise<void> => {
  const response = await apiFetch(`/members/${username}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update member: ${response.statusText}`);
  }
};

// DELETE /members/:username - Delete a member (requires AccountOwnerGuard)
export const deleteMember = async (username: string): Promise<void> => {
  const response = await apiFetch(`/members/${username}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete member: ${response.statusText}`);
  }
};

