import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import {
  enrollInChallenge,
  getChallenge,
  getChallengeProgress,
  getChallengeTrainings,
  markTodayAsCompleted,
} from '~/api/challenges';
import { Challenge } from '~/components/challenge/challenge';
import { getChallengeStatus, getDayDescriptions } from '~/components/challenge/utils';
import useIsEnrolledInChallenge from '~/hooks/useIsEnrolledInChallenge';
import type { Route } from './+types/single-challenge';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Challenge ${params.challengeId}` },
    { name: 'description', content: 'Challenge' },
  ];
}

export default function SingleChallenge() {
  const { challengeId } = useParams();
  const queryClient = useQueryClient();
  const { data: challenge } = useSuspenseQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId!),
  });
  const { data: trainings } = useSuspenseQuery({
    queryKey: ['trainings', challengeId],
    queryFn: () => getChallengeTrainings(challengeId!),
  });
  const isEnrolled = useIsEnrolledInChallenge(challenge);
  const { data: completedDays } = useSuspenseQuery({
    queryKey: ['completedDays', challengeId, isEnrolled],
    queryFn: () => {
      if (isEnrolled) {
        return getChallengeProgress(challengeId!);
      }

      return Array(challenge.duration).fill(false);
    },
  });

  const { mutate: enroll } = useMutation({
    mutationFn: () => enrollInChallenge(challengeId!),
    onError: (error) => {
      console.error(error);
      toast.error('Failed to enroll in challenge');
    },
    onSuccess: () => {
      toast.success('Enrolled in challenge!', {
        description: 'Waiting for the challenge to start',
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { mutate: completeDay } = useMutation({
    mutationFn: () => markTodayAsCompleted(challengeId!),
    onError: (error) => {
      console.error(error);
      toast.error('Failed to complete day');
    },
    onSuccess: () => {
      toast.success('Day completed!');
      queryClient.invalidateQueries({ queryKey: ['completedDays', challengeId, isEnrolled] });
    },
  });

  return (
    <Challenge
      days={completedDays}
      currentDay={challenge.currentDay - 1}
      status={getChallengeStatus(challenge)}
      title={`Challenge ${challenge.id}`}
      description={challenge.challengeInfo}
      dayDescriptions={getDayDescriptions(challenge, trainings)}
      onCompleteDay={completeDay}
      isEnrolled={isEnrolled}
      onEnroll={enroll}
      startDate={new Date(challenge.startDate)}
    />
  );
}

