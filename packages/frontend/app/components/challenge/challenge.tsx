import { useState } from 'react';
import { InteractiveCalendar } from '../interactive-calendar';
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
  title: string;
  description: string;
  dayDescriptions: string[];
  onCompleteDay: () => void;
  isEnrolled: boolean;
  onEnroll: () => void;
}

export function Challenge({
  days,
  currentDay,
  status,
  title,
  description,
  dayDescriptions,
  onCompleteDay,
  isEnrolled,
  onEnroll,
}: ChallengeProps) {
  const [activeDay, setActiveDay] = useState(currentDay);
  const progress = (currentDay / days.length) * 100;
  const completedDays = days.filter((day) => day).length;
  const onDayClick = (day: number) => {
    if (status === ChallengeStatus.NOT_STARTED || status === ChallengeStatus.COMPLETED) {
      setActiveDay(day);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 max-w-4xl mx-auto">
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
        enableMissedDays={status === ChallengeStatus.ACTIVE}
      />

      <ChallengeTask
        isActive={status === ChallengeStatus.ACTIVE && !days[activeDay]}
        taskDescription={dayDescriptions[activeDay]}
        onCompleteTask={onCompleteDay}
      />

      {status === ChallengeStatus.NOT_STARTED &&
        (!isEnrolled ? (
          <Button onClick={onEnroll}>Enroll in Challenge</Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            You are enrolled in this challenge. The challenge will start soon.
          </p>
        ))}
    </div>
  );
}

