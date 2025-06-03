"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

// CalendarButton.tsx
interface CalendarButtonProps {
  isDay: boolean;
  onClick?: () => void;
}

export default function CalendarButton({ isDay, onClick }: CalendarButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.(); // Trigger parent callback
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-offset-1 overflow-hidden bg-white shadow-md ${
        isDay ? "focus:ring-yellow-400 shadow-yellow-400/20" : "focus:ring-purple-400 shadow-purple-500/20"
      }`}
      aria-label="Calendar"
    >
      <Calendar
        size={14}
        className={`transition-all duration-500 drop-shadow-sm ${
          isDay ? "text-yellow-500" : "text-purple-600"
        } ${isClicked ? "scale-90" : "scale-100"}`}
      />
      {isClicked && (
        <div
          className={`absolute inset-0 rounded-full animate-ping ${isDay ? "bg-yellow-400/30" : "bg-purple-500/30"}`}
        />
      )}
    </button>
  );
}
