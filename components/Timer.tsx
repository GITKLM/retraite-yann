"use client"
import React, { useEffect, useState } from "react";
import Confetti from "./Confetti"; // Import your Confetti component
import MyButton from "./MyButton";

interface TimeDisplayValuesType {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CounterType {
  displayValue: number;
  label: string;
}

// Target date: September 1st, 2028 00:00:00 UTC
const targetDate = new Date("September 1, 2028 00:00:00 UTC").getTime();

const generateTimeDisplay = (): TimeDisplayValuesType => {
  const now = new Date().getTime();
  const runway = targetDate - now;

  // Calculate remaining time
  const years = Math.floor(runway / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor((runway % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((runway % (1000 * 60)) / 1000);

  return {
    years,
    days,
    hours,
    minutes,
    seconds,
  };
};

const Counter: React.FC<CounterType> = ({ displayValue, label }) => (
  <div className="bg-gray-900 bg-opacity-30 rounded-lg flex flex-col text-red-400 font-mono text-4xl font-thin leading-none p-8 text-center">
    <h2 className="text-white font-bold text-2xl font-light uppercase mt-5 overflow-hidden text-ellipsis whitespace-nowrap w-full">
      {label}
    </h2>
    {displayValue}
  </div>
);

const Timer: React.FC = () => {
  const [timeDisplay, setTimeDisplay] = useState<TimeDisplayValuesType | null>(null);
  const [countdownFinished, setCountdownFinished] = useState<boolean>(false);

  useEffect(() => {
    setTimeDisplay(generateTimeDisplay());

    const interval = setInterval(() => {
      const newTimeDisplay = generateTimeDisplay();
      setTimeDisplay(newTimeDisplay);

      if (
        newTimeDisplay.years === 0 &&
        newTimeDisplay.days === 0 &&
        newTimeDisplay.hours === 0 &&
        newTimeDisplay.minutes === 0 &&
        newTimeDisplay.seconds === 0
      ) {
        setCountdownFinished(true);
        clearInterval(interval); 
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeDisplay) {
    return null; // Or a loading spinner, if preferred
  }

  return (
    <div className="text-white flex min-h-screen">
      <section className="m-auto p-2 md:p-16">
        <header className="mb-8">
          <h1 className="font-bold text-5xl sm:text-7xl text-center uppercase text-center tracking-widest">
            La retraite c'est dans :
          </h1>
        </header>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-x-8">
          <Counter displayValue={timeDisplay.years} label="Années" />
          <Counter displayValue={timeDisplay.days} label="Jours" />
          <Counter displayValue={timeDisplay.hours} label="Heures" />
          <Counter displayValue={timeDisplay.minutes} label="Minutes" />
          <Counter displayValue={timeDisplay.seconds} label="Secondes" />
        </div>
        {countdownFinished && <Confetti />} 
      </section>
    </div>
  );
};

export default Timer;
