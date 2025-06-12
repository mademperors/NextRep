import { z } from 'zod';
import type { CreateChallengeDto } from '~/components/challenge/challenge-create';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import apiFetch from './apiFetch';

// Updated to match ResponseChallengeDto from backend
const challengeResponseSchema = z.object({
  id: z.number(), // Changed from string to number
  challengeInfo: z.string().min(1, 'Description is required'),
  challengeType: z.nativeEnum(ChallengeType),
  duration: z.number(),
  currentDay: z.number(),
  creator: z.string(),
  trainingIds: z.array(z.number()).min(1),
  enrolledUsernames: z.array(z.string()).optional(),
});

const publicMemberResponseSchema = z.object({
  username: z.string(),
});

const trainingResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  trainingInfo: z.string(),
  creator: z.string().optional(),
});

const updateChallengeSchema = z.object({
  challengeInfo: z.string().optional(),
  challengeType: z.nativeEnum(ChallengeType).optional(),
  startDate: z.string().optional(), // Should be in YYYY-MM-DD format
  trainingIds: z.array(z.number()).min(1).optional(),
});

export type Challenge = z.infer<typeof challengeResponseSchema>;
export type PublicMember = z.infer<typeof publicMemberResponseSchema>;
export type Training = z.infer<typeof trainingResponseSchema>;
export type UpdateChallengeDto = z.infer<typeof updateChallengeSchema>;

// const challenge1 = {
//   id: '1',
//   name: 'Bicep curl challenge',
//   description:
//     'This is a challenge to help you stay on track with your goals. You will be able to complete tasks and earn points. You will also be able to see your progress and your ranking. You will also be able to see your friends progress and their ranking. Also, you will be able to see your friends and their progress.',
//   days: [true, false, false, true, true, false, false, false, false, false],
//   tasks: [
//     '100 pushups',
//     '100 situps',
//     '100 squats',
//     '100 burpees',
//     '100 lunges',
//     '100 planks',
//     '100 pushups',
//     '100 situps',
//     '100 squats',
//     '100 burpees',
//     '100 lunges',
//     '100 planks',
//   ],
//   currentDay: 5,
//   status: ChallengeStatus.ACTIVE,
// };
// const mockChallenges: Challenge[] = [
//   challenge1,
//   {
//     ...challenge1,
//     id: '2',
//     name: 'Pushup challenge',
//     description:
//       'This is a push up challenge. Also, you will be able to see your friends and their progress.',
//   },
//   {
//     ...challenge1,
//     id: '3',
//     name: 'Situp challenge',
//     description:
//       'This is a situp challenge. Also, you will be able to see your friends and their progress.',
//   },
// ];

// Get all global challenges
export const getChallenges = async (): Promise<Challenge[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return Promise.resolve(mockChallenges);
  const response = await apiFetch('/challenges/global', {
    method: 'GET',
  });
  return response.json();
};

// Get challenges created by the current user
export const getCreatedChallenges = async (): Promise<Challenge[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await apiFetch('/challenges/created', {
    method: 'GET',
  });
  return response.json();
};

// Get challenges enrolled by the current user
export const getEnrolledChallenges = async (): Promise<Challenge[]> => {
  const response = await apiFetch('/challenges/me', {
    method: 'GET',
  });
  return response.json();
};

// Get a specific challenge by ID
export const getChallenge = async (challengeId: string | number) => {
  // Mock data for now
  // console.log('getChallenge', challengeId);
  // return Promise.resolve(challenge1);
  const response = await apiFetch(`/challenges/${challengeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// Get members enrolled in a challenge
export const getChallengeEnrolled = async (
  challengeId: string | number,
): Promise<PublicMember[]> => {
  const response = await apiFetch(`/challenges/${challengeId}/enrolled`, {
    method: 'GET',
  });
  return response.json();
};

// Get trainings associated with a challenge
export const getChallengeTrainings = async (challengeId: string | number): Promise<Training[]> => {
  const response = await apiFetch(`/challenges/${challengeId}/trainings`, {
    method: 'GET',
  });
  return response.json();
};

// Enroll in a challenge
export const enrollInChallenge = async (challengeId: string | number) => {
  const response = await apiFetch(`/challenges/${challengeId}/enroll`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Create a new challenge
export const createChallenge = async (challenge: CreateChallengeDto) => {
  const response = await apiFetch('/challenges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(challenge),
  });
};

// Update an existing challenge
export const updateChallenge = async (
  challengeId: string | number,
  updateData: UpdateChallengeDto,
) => {
  const response = await apiFetch(`/challenges/${challengeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
};

// Delete a challenge
export const deleteChallenge = async (challengeId: string | number) => {
  const response = await apiFetch(`/challenges/${challengeId}`, {
    method: 'DELETE',
  });
};

// Mark today as completed for a challenge
export const markTodayAsCompleted = async (challengeId: string | number) => {
  const response = await apiFetch(`/challenges/${challengeId}/completed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Get challenge progress for the current user
export const getChallengeProgress = async (challengeId: string | number) => {
  const response = await apiFetch(`/challenges/${challengeId}/progress`, {
    method: 'GET',
  });
  return response.json();
};

