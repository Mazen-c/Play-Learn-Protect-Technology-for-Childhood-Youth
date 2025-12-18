import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

interface SessionTimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

export function SessionTimer({ isRunning, onTimeUpdate, className = "" }: SessionTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const onTimeUpdateRef = useRef(onTimeUpdate);
  
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (seconds > 0) {
      onTimeUpdateRef.current?.(seconds);
    }
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 bg-muted rounded-full ${className}`}
      data-testid="session-timer"
    >
      <Clock className="w-5 h-5 text-muted-foreground" />
      <span className="text-xl font-bold tabular-nums text-foreground" data-testid="text-timer-value">
        {formatTime(seconds)}
      </span>
    </div>
  );
}
