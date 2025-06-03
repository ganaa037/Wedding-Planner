"use client"

import { useState } from "react"
import { Sun, Moon } from "lucide-react"

interface SimpleThemeToggleProps {
  isDay: boolean
  onToggle: () => void
}

export default function SimpleThemeToggle({ isDay, onToggle }: SimpleThemeToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleToggle = () => {
    if (isDisabled) return

    setIsDisabled(true)
    setIsAnimating(true)
    onToggle()

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)

    setTimeout(() => {
      setIsDisabled(false)
    }, 1000) // Disable for 2 seconds
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isDisabled}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-1 focus:ring-offset-1 overflow-hidden ${
        isDay
          ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md shadow-yellow-400/20 focus:ring-yellow-400"
          : "bg-gradient-to-br from-indigo-600 to-purple-700 shadow-md shadow-purple-500/20 focus:ring-purple-400"
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isDay
            ? "bg-gradient-to-br from-yellow-300/40 to-orange-300/40"
            : "bg-gradient-to-br from-purple-400/40 to-indigo-400/40"
        }`}
      />

      {/* Icon container */}
      <div
        className={`relative z-10 transition-all duration-500 ${isAnimating ? "scale-125 rotate-180" : "scale-100"}`}
      >
        {isDay ? (
          <Sun size={14} className="text-white drop-shadow-sm" />
        ) : (
          <Moon size={14} className="text-white drop-shadow-sm" />
        )}
      </div>

      {/* Pulse effect on click */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isAnimating ? "scale-150 opacity-0" : "scale-100 opacity-0"
        } ${isDay ? "bg-yellow-300" : "bg-purple-300"}`}
      />
    </button>
  )
}
