'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';

interface InteractiveCalendarProps {
  days: boolean[];
  currentDay: number;
  title?: string;
  onDayClick: (day: number) => void;
  enableMissedDays?: boolean;
}

export function InteractiveCalendar({
  days,
  currentDay,
  title = 'Calendar',
  enableMissedDays = false,
  onDayClick,
}: InteractiveCalendarProps) {
  const getDayName = (index: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[index % 7];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {days.map((day, index) => {
            const isActive = index === currentDay;
            const isChecked = days[index];
            const isMissed = enableMissedDays && !days[index] && index < currentDay;

            return (
              <div
                key={index}
                className={`
                  flex flex-col items-center p-2 sm:p-4 rounded-lg border transition-all duration-200 h-full min-h-[100px] sm:min-h-[120px]
                  ${isActive ? 'border-primary shadow-md' : 'border-border'}
                  ${!isActive ? 'opacity-60' : ''}
                  ${isMissed ? 'bg-red-500/50' : ''}
                  ${isChecked ? 'bg-green-500/50' : ''}
                `}
                onClick={() => onDayClick(index)}
              >
                <div className="text-xs text-muted-foreground mb-1">{getDayName(index)}</div>
                <div className="text-lg font-semibold mb-2">{index + 1}</div>
                <Checkbox
                  checked={isChecked}
                  className={`
                    w-6 h-6 border-primary rounded-full
                  `}
                />
                <div className="text-xs mt-1 font-medium h-4 flex items-center">
                  {isActive ? <span className="text-primary">Today</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

