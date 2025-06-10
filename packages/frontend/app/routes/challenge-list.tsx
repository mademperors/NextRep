import { useQuery } from '@tanstack/react-query';
import { getChallenges } from '~/api/challenges';
import { ChallengeList } from '~/components/challenge/challenge-list';
import { FullScreenDnaLoader } from '~/components/ui/dna-loader';
import { useListChallenges } from '~/hooks/useListChallenges';
import { useMember } from '~/hooks/useMember';

export function meta() {
  return [{ title: 'Challenge List' }, { name: 'description', content: 'Challenge List' }];
}

export default function ChallengeListPage() {
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
      <h1 className="text-2xl font-bold">Available Challenges</h1>
      <ChallengeList challenges={listChallenges} />
    </div>
  );
}

