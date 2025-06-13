import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Challenge } from '~/api/challenges';
import { Badge } from '~/components/ui/badge';
import { Card } from '~/components/ui/card';

export interface ListChallenge {
  challenge: Challenge;
  enrolled: boolean;
}

interface ChallengeListProps {
  challenges: ListChallenge[];
}

function ChallengeItem({ challenge, enrolled }: ListChallenge) {
  const navigate = useNavigate();
  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card
      className="flex flex-row items-center p-6 cursor-pointer"
      onClick={() => navigate(`/challenges/${challenge.id}`)}
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">Challenge {challenge.id}</h3>
          <Badge variant={enrolled ? 'default' : 'outline'}>
            {enrolled ? 'Enrolled' : 'Not Enrolled'}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">By: {challenge.creator}</p>
        <p className="text-muted-foreground mb-4">{truncateText(challenge.challengeInfo)}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{challenge.duration} days</span>
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
        />
      ))}
    </div>
  );
}

export type { ChallengeListProps };

