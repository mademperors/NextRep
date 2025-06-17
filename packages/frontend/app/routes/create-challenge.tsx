import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createChallenge } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';
import { CreateChallenge, type CreateChallengeDto } from '~/components/challenge/challenge-create';
import { getTomorrowDate } from '~/components/challenge/utils';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import { Role } from '~/constants/enums/roles.enum';

export function meta() {
  return [{ title: 'Create Challenge' }, { name: 'description', content: 'Create Challenge' }];
}

export default function CreateChallengePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: createChallengeMutation } = useMutation({
    mutationFn: (data: CreateChallengeDto) => createChallenge(data),
    onSuccess: () => {
      toast.success('Challenge created successfully');
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Error creating challenge');
    },
  });

  const onSubmit = (data: CreateChallenge) => {
    if (!data.startDate) {
      toast.error('Please select a start date');
      return;
    }
    createChallengeMutation({
      challengeInfo: data.challengeInfo,
      challengeType: user?.role === Role.ADMIN ? ChallengeType.GLOBAL : data.visibility,
      creator: user?.username ?? '',
      startDate: data.startDate.toISOString().split('T')[0],
      trainingIds: data.trainingIds?.filter((id) => id !== undefined) || [],
    });
  };

  const initialData = {
    length: 1,
    challengeInfo: '',
    startDate: getTomorrowDate(),
    visibility: ChallengeType.PRIVATE,
    trainingIds: [undefined],
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <CreateChallenge
        submitText="Create Challenge"
        onSubmit={onSubmit}
        initialData={initialData}
      />
    </div>
  );
}

