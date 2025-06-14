import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getCreatedChallenges, getEnrolledChallenges } from '~/api/challenges';
import { useAuth } from '~/components/auth/AuthProvider';
import { ChallengeList } from '~/components/challenge/challenge-list';
import { Button } from '~/components/ui/button';
import { Role } from '~/constants/enums/roles.enum';
import useListChallenges from '~/hooks/useListChallenges';

export function meta() {
  return [{ title: 'Dashboard' }];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'created' | 'enrolled'>('created');

  const { data: createdChallenges } = useSuspenseQuery({
    queryKey: ['createdChallenges'],
    queryFn: () => getCreatedChallenges(),
  });

  const { data: enrolledChallenges } = useSuspenseQuery({
    queryKey: ['enrolledChallenges'],
    queryFn: () => getEnrolledChallenges(),
  });

  const listCreatedChallenges = useListChallenges(createdChallenges);
  const listEnrolledChallenges = useListChallenges(enrolledChallenges);

  const currentChallenges =
    selectedTab === 'created' ? listCreatedChallenges : listEnrolledChallenges;
  const currentTitle =
    selectedTab === 'created' ? 'My Created Challenges' : 'My Enrolled Challenges';

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setSelectedTab('created')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            selectedTab === 'created'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Created Challenges ({listCreatedChallenges.length})
        </button>
        {user?.role === Role.MEMBER && (
          <button
            onClick={() => setSelectedTab('enrolled')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              selectedTab === 'enrolled'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Enrolled Challenges ({listEnrolledChallenges.length})
          </button>
        )}
      </div>

      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold">{currentTitle}</h2>
        <Button className="cursor-pointer" onClick={() => navigate('/challenges/create')}>
          Create Challenge
        </Button>
      </div>

      <ChallengeList challenges={currentChallenges} editEnabled={selectedTab === 'created'} />
    </div>
  );
}

