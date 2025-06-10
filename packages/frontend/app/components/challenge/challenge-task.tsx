import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChallengeTaskProps {
  taskDescription: string;
  isActive: boolean;
  onCompleteTask: () => void;
}

export default function ChallengeTask({
  taskDescription,
  isActive,
  onCompleteTask,
}: ChallengeTaskProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Task</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground">{taskDescription}</p>
        {isActive && (
          <Button className="cursor-pointer" onClick={onCompleteTask}>
            Complete Task
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
