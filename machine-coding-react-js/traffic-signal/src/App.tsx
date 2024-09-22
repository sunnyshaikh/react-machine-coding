import { useEffect, useRef, useState } from "react";

interface SignalType {
  time: number;
  next: string;
}

const initState = {
  red: { time: 5, next: "yellow" },
  yellow: { time: 3, next: "green" },
  green: { time: 10, next: "red" },
};

export default function App() {
  const [activeSignal, setActiveSignal] = useState("red");
  const [signal, setSignal] = useState<Record<string, SignalType>>(initState);
  const [currentTime, setCurrentTime] = useState(1);
  const timeRef = useRef(currentTime);
  timeRef.current = currentTime;
  const timerRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => prev + 1);
      if (timeRef.current === signal[activeSignal].time) {
        setActiveSignal(signal[activeSignal].next);
        setCurrentTime(1);
        setSignal(initState);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [signal, activeSignal]);

  const handleNext = () => {
    setActiveSignal(signal[activeSignal].next);
    setCurrentTime(1);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setSignal((prev) => {
        return {
          ...prev,
          [activeSignal]: {
            ...prev[activeSignal],
            time: parseInt(inputRef.current.value ?? ""),
          },
        };
      });
    }
  };

  console.log(inputRef.current);

  return (
    <div className="signal-container">
      <div
        className={`${
          activeSignal === "red" ? "signal red active" : "signal red"
        }`}
      >
        {!!(activeSignal === "red") && currentTime}
      </div>
      <div
        className={`${
          activeSignal === "yellow" ? "signal yellow active" : "signal yellow"
        }`}
      >
        {!!(activeSignal === "yellow") && currentTime}
      </div>
      <div
        className={`${
          activeSignal === "green" ? "signal green active" : "signal green"
        }`}
      >
        {!!(activeSignal === "green") && currentTime}
      </div>
      <div>
        <button onClick={handleNext}>Next</button>
        <input type="number" ref={inputRef} onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
}
