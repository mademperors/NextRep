import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getChallenges, getCreatedChallenges } from '~/api/challenges';
import { ChallengeStatus } from '~/components/challenge/challenge';
import { ChallengeList } from '~/components/challenge/challenge-list';
import { Button } from '~/components/ui/button';
import useListChallenges from '~/hooks/useListChallenges';

export function meta() {
  return [{ title: 'Challenge List' }, { name: 'description', content: 'Challenge List' }];
}

export default function ChallengeListPage() {
  const navigate = useNavigate();
  const { data: createdChallenges } = useSuspenseQuery({
    queryKey: ['createdChallenges'],
    queryFn: () => getCreatedChallenges(),
  });
  const { data: globalChallenges } = useSuspenseQuery({
    queryKey: ['globalChallenges'],
    queryFn: () => getChallenges(),
  });

  const listCreatedChallenges = useListChallenges(createdChallenges);
  const listGlobalChallenges = useListChallenges(globalChallenges);

  const avaiableChallenges = [...listGlobalChallenges, ...listCreatedChallenges].filter(
    (challenge) => challenge.status === ChallengeStatus.NOT_STARTED && !challenge.enrolled,
  );

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Available Challenges</h1>
        <Button className="cursor-pointer" onClick={() => navigate('/challenges/create')}>
          Create Challenge
        </Button>
      </div>
      <ChallengeList challenges={avaiableChallenges} />
    </div>
  );
}

