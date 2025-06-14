import type { Member } from '~/api/members';
import { FitnessGoal } from '~/constants/enums/fitness.enum';
import { Gender } from '~/constants/enums/genders.enum';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useEditProfile } from './useEditProfile';
import { capitalize } from './utils';

interface EditProfileProps {
  user: Member;
  onSave: (editedUser: Member) => void;
}

export default function editProfile({ user, onSave }: EditProfileProps) {
  const {
    weight,
    gender,
    height,
    fitnessGoal,
    additionalInfo,
    setWeight,
    setGender,
    setHeight,
    setFitnessGoal,
    setAdditionalInfo,
  } = useEditProfile(user);

  const handleSave = () => {
    onSave({
      username: user.username,
      weight,
      height,
      gender,
      age: 20,
      goal: fitnessGoal,
      additionalInfo: additionalInfo,
    });
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <Button onClick={handleSave} variant="outline">
          Save
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
            <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Gender).map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {capitalize(gender)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Weight
            </h3>
            <Input value={weight} type="number" onChange={(e) => setWeight(+e.target.value)} />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Height (cm)
            </h3>
            <Input value={height} type="number" onChange={(e) => setHeight(+e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Fitness Goal
          </h3>
          <Select
            value={fitnessGoal}
            onValueChange={(value) => setFitnessGoal(value as FitnessGoal)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a fitness goal" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(FitnessGoal).map((goal) => (
                <SelectItem key={goal} value={goal}>
                  {capitalize(goal.replace('_', ' '))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Additional Information
          </h3>
          <Input value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}

