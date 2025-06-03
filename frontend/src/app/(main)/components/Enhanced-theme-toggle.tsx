"use client"

import { useState } from "react"
import { Sun, Moon, Sparkles } from "lucide-react"

interface EnhancedThemeToggleProps {
  isDay: boolean
  onToggle: () => void
}

export default function EnhancedThemeToggle({ isDay, onToggle }: EnhancedThemeToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleToggle = () => {
    setIsAnimating(true)

    // Create ripple effect
    const newRipple = {
      id: Date.now(),
      x: isDay ? 10 : 42,
      y: 12,
    }
    setRipples((prev) => [...prev, newRipple])

    onToggle()

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)

    // Remove ripple
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`relative w-16 h-8 rounded-full flex items-center transition-all duration-700 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 overflow-hidden ${
          isDay
            ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-md shadow-blue-500/25 focus:ring-blue-400"
            : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-md shadow-purple-500/25 focus:ring-purple-400"
        }`}
        aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
      >
        {/* Background glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
            isDay
              ? "bg-gradient-to-r from-yellow-300/20 to-orange-300/20"
              : "bg-gradient-to-r from-purple-400/20 to-indigo-400/20"
          }`}
        />

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
                isDay ? "bg-yellow-200" : "bg-purple-200"
              }`}
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 200}ms`,
                opacity: isAnimating ? 1 : 0.3,
                transform: isAnimating ? `scale(1.5) translateY(-${i * 2}px)` : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-3 h-3 rounded-full border border-white/50 animate-ping"
            style={{
              left: ripple.x - 6,
              top: ripple.y - 6,
            }}
          />
        ))}

        {/* Sun icon */}
        <div
          className={`absolute left-1.5 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-700 ease-in-out ${
            isDay
              ? "translate-x-0 opacity-100 scale-100 bg-yellow-400 shadow-md shadow-yellow-400/40"
              : "translate-x-3 opacity-0 scale-75 bg-yellow-300"
          }`}
        >
          <Sun size={12} className={`text-white transition-all duration-500 ${isDay ? "rotate-0" : "rotate-180"}`} />
          {isDay && <div className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse opacity-50" />}
        </div>

        {/* Moon icon */}
        <div
          className={`absolute right-1.5 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-700 ease-in-out ${
            !isDay
              ? "translate-x-0 opacity-100 scale-100 bg-indigo-600 shadow-md shadow-indigo-400/40"
              : "-translate-x-3 opacity-0 scale-75 bg-indigo-500"
          }`}
        >
          <Moon size={12} className={`text-white transition-all duration-500 ${!isDay ? "rotate-0" : "-rotate-180"}`} />
          {!isDay && (
            <>
              <div className="absolute inset-0 rounded-full bg-indigo-600 animate-pulse opacity-50" />
              <Sparkles size={6} className="absolute -top-0.5 -right-0.5 text-yellow-200 animate-twinkle" />
            </>
          )}
        </div>

        {/* Sliding indicator */}
        <div
          className={`absolute w-6 h-6 rounded-full transform transition-all duration-700 ease-in-out ${
            isAnimating ? "scale-110" : "scale-100"
          } ${
            isDay
              ? "translate-x-1 bg-gradient-to-br from-white to-yellow-100 shadow-md"
              : "translate-x-9 bg-gradient-to-br from-white to-indigo-100 shadow-md"
          }`}
        >
          {/* Inner glow */}
          <div
            className={`absolute inset-0.5 rounded-full transition-all duration-700 ${
              isDay
                ? "bg-gradient-to-br from-yellow-200/50 to-orange-200/50"
                : "bg-gradient-to-br from-purple-200/50 to-indigo-200/50"
            }`}
          />
        </div>

        {/* Active state overlay */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
            isAnimating ? "opacity-20" : "opacity-0"
          } ${isDay ? "bg-yellow-300" : "bg-purple-300"}`}
        />
      </button>

      {/* External glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 -z-10 ${
          isDay ? "shadow-xl shadow-yellow-400/20 blur-sm" : "shadow-xl shadow-purple-400/20 blur-sm"
        }`}
      />
    </div>
  )
}
