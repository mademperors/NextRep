import type { Challenge, Training } from '~/api/challenges';
import { ChallengeStatus } from './challenge';

export const getDayDescriptions = (challenge: Challenge, trainings: Training[]) => {
  return challenge.trainingIds.map((trainingId) => {
    return (
      trainings.find((training) => training.id === trainingId)?.trainingInfo ??
      'No description available'
    );
  });
};

export const getChallengeStatus = (challenge: Challenge) => {
  const startDate = new Date(challenge.startDate);
  const today = new Date();
  if (today < startDate) {
    return ChallengeStatus.NOT_STARTED;
  }
  if (challenge.currentDay >= challenge.duration) {
    return ChallengeStatus.COMPLETED;
  }

  return ChallengeStatus.ACTIVE;
};

