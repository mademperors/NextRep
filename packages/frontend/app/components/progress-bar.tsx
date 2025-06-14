import { Progress } from './ui/progress';

interface ProgressBarProps {
  completed: number;
  total: number;
  progress: number;
  label: string;
}

export default function ProgressBar({ completed, total, progress, label }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between w-full text-sm">
        <span className="text-muted-foreground">
          {label}: {completed}/{total} completed
        </span>
        <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
          {Math.round(progress)}% Complete
        </div>
      </div>
      <div className="w-full">
        <Progress value={progress} />
      </div>
    </div>
  );
}

