"use client";
import { Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  examTimer?: number; // in minutes
  onTimerEnd?: () => void;
};

export default function ExamDuration({ examTimer, onTimerEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState((examTimer ?? 0) * 60);
  const hasEnded = useRef(false); // to ensure onTimerEnd runs only once

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasEnded.current) {
        hasEnded.current = true;
        onTimerEnd?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="timer flex items-center justify-center gap-[8px]">
      <Timer className="text-green-600" />
      <p className="text-sm text-green-600"> {formatTime(timeLeft)}</p>
    </div>
  );
}
