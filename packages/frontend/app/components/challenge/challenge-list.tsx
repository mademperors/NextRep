import { Clock, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import type { Challenge } from '~/api/challenges';
import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';
import { Button } from '../ui/button';
import { ChallengeStatus } from './challenge';

export interface ListChallenge {
  challenge: Challenge;
  enrolled: boolean;
  status: ChallengeStatus;
}

interface ChallengeListProps {
  challenges: ListChallenge[];
}

function StatusBadge({ status }: { status: ChallengeStatus }) {
  const statusText = {
    [ChallengeStatus.ACTIVE]: 'Active',
    [ChallengeStatus.COMPLETED]: 'Completed',
    [ChallengeStatus.NOT_STARTED]: 'Not Started',
  };
  const statusColor = {
    [ChallengeStatus.ACTIVE]: 'bg-blue-500 text-white',
    [ChallengeStatus.COMPLETED]: 'bg-green-500 text-white',
    [ChallengeStatus.NOT_STARTED]: 'bg-gray-500 text-white',
  };

  return (
    <Badge variant="default" className={statusColor[status]}>
      {statusText[status]}
    </Badge>
  );
}

function ChallengeItem({ challenge, enrolled, status }: ListChallenge) {
  const navigate = useNavigate();
  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const startDate = new Date(challenge.startDate);

  return (
    <Card className="flex flex-row items-center p-6 cursor-pointer">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">
            <Link to={`/challenges/${challenge.id}`}>Challenge {challenge.id}</Link>
          </h3>
          {status === ChallengeStatus.NOT_STARTED && (
            <Link to={`/challenges/${challenge.id}/edit`}>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        {status === ChallengeStatus.NOT_STARTED && (
          <p className="text-muted-foreground mb-2">Starts on {startDate.toLocaleDateString()}</p>
        )}
        <p className="text-muted-foreground mb-2">By: {challenge.creator}</p>
        <p className="text-muted-foreground mb-2">{truncateText(challenge.challengeInfo)}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
            <Badge variant={enrolled ? 'default' : 'outline'}>
              {enrolled ? 'Enrolled' : 'Not Enrolled'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <ChallengeItem
          key={challenge.challenge.id}
          challenge={challenge.challenge}
          enrolled={challenge.enrolled}
          status={challenge.status}
        />
      ))}
    </div>
  );
}

export type { ChallengeListProps };

