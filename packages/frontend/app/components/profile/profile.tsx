import type { Achievement } from '~/api/achievements';
import type { Member } from '~/api/members';
import { ChallengeList } from '~/components/challenge/challenge-list';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import type { ListChallenge } from '../challenge/challenge-list';
import { capitalize } from './utils';

interface ProfileProps {
  user: Member;
  onEditProfile?: () => void;
  enrolledChallenges: ListChallenge[];
  achievements?: Achievement[];
}

export default function Profile({
  user,
  onEditProfile,
  enrolledChallenges,
  achievements,
}: ProfileProps) {
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
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Profile</CardTitle>
          {onEditProfile && (
            <Button onClick={onEditProfile} variant="outline">
              Edit Profile
            </Button>
          )}
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

      {achievements && achievements.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.achievement_id} className="p-2 px-4 w-fit">
                <CardContent className="p-0">
                  <p className="text-base font-medium">{achievement.achievement_info}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Enrolled Challenges
      </h3>
      <ChallengeList challenges={enrolledChallenges} />
    </div>
  );
}

