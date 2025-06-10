import { ChallengeStatus } from '~/components/challenge/challenge';

const getChallenge = async (challengeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Mock data for now
  console.log('getChallenge', challengeId);
  return Promise.resolve({
    id: challengeId,
    name: 'Bicep curl challenge',
    description:
      'This is a challenge to help you stay on track with your goals. You will be able to complete tasks and earn points. You will also be able to see your progress and your ranking. You will also be able to see your friends progress and their ranking. Also, you will be able to see your friends and their progress.',
    days: [true, false, false, true, false, true, false, false, true, false],
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
    status: ChallengeStatus.NOT_STARTED,
  });
  //   const response = await apiFetch(`/challenges/${challengeId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return response.json();
};

export { getChallenge };

