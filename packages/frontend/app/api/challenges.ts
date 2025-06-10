import { z } from 'zod';
import { ChallengeStatus } from '~/components/challenge/challenge';
import apiFetch from './apiFetch';

const challengeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  days: z.array(z.boolean()),
  tasks: z.array(z.string()),
  currentDay: z.number(),
  status: z.nativeEnum(ChallengeStatus),
});

export type Challenge = z.infer<typeof challengeSchema>;

const challenge1 = {
  id: '1',
  name: 'Bicep curl challenge',
  description:
    'This is a challenge to help you stay on track with your goals. You will be able to complete tasks and earn points. You will also be able to see your progress and your ranking. You will also be able to see your friends progress and their ranking. Also, you will be able to see your friends and their progress.',
  days: [true, false, false, true, true, false, false, false, false, false],
  tasks: [
    '100 pushups',
    '100 situps',
    '100 squats',
    '100 burpees',
    '100 lunges',
    '100 planks',
    '100 pushups',
    '100 situps',
    '100 squats',
    '100 burpees',
    '100 lunges',
    '100 planks',
  ],
  currentDay: 4,
  status: ChallengeStatus.COMPLETED,
};
const mockChallenges: Challenge[] = [
  challenge1,
  {
    ...challenge1,
    id: '2',
    name: 'Pushup challenge',
    description:
      'This is a push up challenge. Also, you will be able to see your friends and their progress.',
  },
  {
    ...challenge1,
    id: '3',
    name: 'Situp challenge',
    description:
      'This is a situp challenge. Also, you will be able to see your friends and their progress.',
  },
];

export const getChallenges = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Promise.resolve(mockChallenges);
  // const response = await apiFetch('/challenges', {
  //   method: 'GET',
  // });
  // return response.json();
};

export const getChallenge = async (challengeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock data for now
  console.log('getChallenge', challengeId);
  return Promise.resolve(challenge1);
  //   const response = await apiFetch(`/challenges/${challengeId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return response.json();
};

export const enrollInChallenge = async (challengeId: string, username: string) => {
  const response = await apiFetch(`/challenges/${challengeId}/enroll`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
};

