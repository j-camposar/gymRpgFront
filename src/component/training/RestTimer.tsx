import React, { useState, useEffect, useRef } from "react";

interface RestTimerProps {
  onFinish?: (seconds: number) => void;
}

const RestTimer: React.FC<RestTimerProps> = ({ onFinish }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleClick = () => {
    if (isRunning) {
      setIsRunning(false);
      if (onFinish) onFinish(seconds);
    } else {
      setSeconds(0);
      setIsRunning(true);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{formatTime(seconds)}</h2>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: isRunning ? "#e74c3c" : "#2ecc71",
          color: "white",
        }}
      >
        {isRunning ? "Terminar" : "Iniciar"}
      </button>
    </div>
  );
};

export default RestTimer;
