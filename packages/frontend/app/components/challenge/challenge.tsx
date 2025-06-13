import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ChallengeType } from '~/constants/enums/challenge-type.enum';
import { dayNames, InteractiveCalendar } from '../interactive-calendar';
import ProgressBar from '../progress-bar';
import { Button } from '../ui/button';
import ChallengeTask from './challenge-task';

export enum ChallengeStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  NOT_STARTED = 'not-started',
}

interface ChallengeProps {
  days: boolean[];
  currentDay: number;
  status: ChallengeStatus;
  type: ChallengeType;
  title: string;
  description: string;
  dayDescriptions: string[];
  onCompleteDay: () => void;
  isEnrolled: boolean;
  onEnroll: () => void;
  startDate: Date;
}

export function Challenge({
  days,
  currentDay,
  status,
  title,
  type,
  description,
  dayDescriptions,
  onCompleteDay,
  isEnrolled,
  onEnroll,
  startDate,
}: ChallengeProps) {
  const [activeDay, setActiveDay] = useState(currentDay < 0 ? 0 : currentDay);
  const progress = (currentDay / days.length) * 100;
  const completedDays = days.filter((day) => day).length;
  const onDayClick = (day: number) => {
    if (status === ChallengeStatus.NOT_STARTED) {
      setActiveDay(day);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Challenge URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy URL to clipboard:', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 max-w-4xl mx-auto relative">
      {type === ChallengeType.GROUP && (
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 z-10 cursor-pointer"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
        <p className="text-sm text-muted-foreground text-center">{description}</p>
        {status === ChallengeStatus.ACTIVE && (
          <ProgressBar
            completed={completedDays}
            total={days.length}
            progress={progress}
            label="Days"
          />
        )}
      </div>
      <InteractiveCalendar
        days={days}
        currentDay={activeDay}
        onDayClick={onDayClick}
        enableMissedDays={status !== ChallengeStatus.NOT_STARTED}
        startDay={dayNames[startDate.getDay()]}
      />

      {[ChallengeStatus.ACTIVE, ChallengeStatus.NOT_STARTED].includes(status) ? (
        <ChallengeTask
          isActive={status === ChallengeStatus.ACTIVE && !days[activeDay] && isEnrolled}
          isCompleted={days[activeDay] && status === ChallengeStatus.ACTIVE}
          taskDescription={dayDescriptions[activeDay]}
          onCompleteTask={onCompleteDay}
        />
      ) : (
        <p className="text-sm text-muted-foreground">This challenge is over.</p>
      )}

      {status === ChallengeStatus.NOT_STARTED &&
        (!isEnrolled ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              The challenge will start on {startDate.toLocaleDateString()}.
            </p>
            <Button onClick={onEnroll}>Enroll in Challenge</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            You are enrolled in this challenge. The challenge will start on{' '}
            {startDate.toLocaleDateString()}. See you there!
          </p>
        ))}
    </div>
  );
}

