import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getChallenges } from '~/api/challenges';
import { ChallengeList } from '~/components/challenge/challenge-list';
import { Button } from '~/components/ui/button';
import { FullScreenDnaLoader } from '~/components/ui/dna-loader';
import { useListChallenges } from '~/hooks/useListChallenges';
import { useMember } from '~/hooks/useMember';

export function meta() {
  return [{ title: 'Challenge List' }, { name: 'description', content: 'Challenge List' }];
}

export default function ChallengeListPage() {
  const navigate = useNavigate();
  const { data: challenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => getChallenges(),
  });

  const member = useMember();

  if (!challenges || !member) {
    return <FullScreenDnaLoader />;
  }

  const listChallenges = useListChallenges(challenges, member);

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Available Challenges</h1>
        <Button className="cursor-pointer" onClick={() => navigate('/challenges/create')}>
          Create Challenge
        </Button>
      </div>
      <ChallengeList challenges={listChallenges} />
    </div>
  );
}

