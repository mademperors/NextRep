import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { getChallenge, updateChallenge, type UpdateChallengeDto } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';
import {
  CreateChallenge,
  type CreateChallenge as CreateChallengeType,
} from '~/components/challenge/challenge-create';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import { Role } from '~/constants/enums/roles.enum';

export function meta() {
  return [{ title: 'Edit Challenge' }, { name: 'description', content: 'Edit Challenge' }];
}

export default function EditChallengePage() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const { user } = useAuth();

  if (!challengeId) {
    throw new Error('Challenge ID is required');
  }

  // Fetch the challenge data
  const { data: challenge } = useSuspenseQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallenge(challengeId),
  });

  const { mutate: updateChallengeMutation } = useMutation({
    mutationFn: (data: UpdateChallengeDto) => updateChallenge(challengeId, data),
    onSuccess: () => {
      toast.success('Challenge updated successfully');
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Error updating challenge');
    },
  });

  const onSubmit = (data: CreateChallengeType) => {
    if (!data.startDate) {
      toast.error('Please select a start date');
      return;
    }
    updateChallengeMutation({
      challengeInfo: data.challengeInfo,
      challengeType: user?.role === Role.ADMIN ? ChallengeType.GLOBAL : data.visibility,
      startDate: data.startDate.toISOString().split('T')[0],
      trainingIds: data.trainingIds?.filter((id) => id !== undefined) || [],
    });
  };

  // Transform challenge data to match CreateChallenge initialData format
  const initialData = {
    length: challenge.trainingIds.length,
    challengeInfo: challenge.challengeInfo,
    startDate: new Date(challenge.startDate),
    visibility: challenge.challengeType,
    trainingIds: challenge.trainingIds,
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <CreateChallenge
        submitText="Update Challenge"
        onSubmit={onSubmit}
        initialData={initialData}
      />
    </div>
  );
}

