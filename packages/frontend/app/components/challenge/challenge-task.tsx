import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChallengeTaskProps {
  taskDescription: string;
  isActive: boolean;
  isCompleted: boolean;
  onCompleteTask: () => void;
}

export default function ChallengeTask({
  taskDescription,
  isActive,
  isCompleted,
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
        {isCompleted && (
          <Button variant="outline" disabled>
            You have completed today's task. See you tomorrow!
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

