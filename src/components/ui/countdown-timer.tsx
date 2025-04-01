'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CountdownTimerProps {
  deadline: Date;
}

export function CountdownTimer({ deadline }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const distance = formatDistanceToNow(deadline, { addSuffix: true });
      setTimeLeft(distance);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="text-sm font-medium text-muted-foreground">
      {timeLeft}
    </div>
  );
} 