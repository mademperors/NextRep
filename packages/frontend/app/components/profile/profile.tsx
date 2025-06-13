import type { Member } from '~/api/members';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { capitalize } from './utils';

interface ProfileProps {
  user: Member;
  onEditProfile: () => void;
}

export default function Profile({ user, onEditProfile }: ProfileProps) {
  const formatHeight = (height: number | undefined) => {
    return height ? `${height} cm` : 'Not specified';
  };

  const getFitnessGoalDisplay = (goal: string) => {
    return capitalize(goal.replace('_', ' '));
  };

  const getGenderDisplay = (gender: string) => {
    return capitalize(gender);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <Button onClick={onEditProfile} variant="outline">
          Edit Profile
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Name
            </h3>
            <p className="text-lg font-medium">{user.username}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Gender
            </h3>
            <p className="text-lg font-medium">
              {getGenderDisplay(user.gender ?? 'Not specified')}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Weight
            </h3>
            <p className="text-lg font-medium">
              {user.weight ? `${user.weight} kg` : 'Not specified'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Height
            </h3>
            <p className="text-lg font-medium">{formatHeight(user.height)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Fitness Goal
          </h3>
          <p className="text-lg font-medium">
            {getFitnessGoalDisplay(user.goal ?? 'Not specified')}
          </p>
        </div>

        {user.additionalInfo && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Additional Information
            </h3>
            <p className="text-base leading-relaxed">{user.additionalInfo}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

