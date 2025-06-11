"use client"

import { useState, useEffect } from "react"
import "@fontsource/great-vibes";
import '@fontsource/space-grotesk'

interface HeaderProps {
  isDay: boolean
}

function Header({ isDay }: HeaderProps) {
  const [currentImage, setCurrentImage] = useState(isDay ? "/day.jpg" : "/night.png")
  const [nextImage, setNextImage] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const newImage = isDay ? "/day.jpg" : "/night.png"
    if (newImage === currentImage) return

    setIsTransitioning(true)
    setNextImage(newImage)

    const timeout = setTimeout(() => {
      setCurrentImage(newImage)
      setNextImage(null)
      setIsTransitioning(false)
    }, 700)

    return () => clearTimeout(timeout)
  }, [isDay, currentImage])

  const imageBaseStyle = "w-full h-full object-cover absolute top-0 left-0 transition-all duration-700 ease-in-out"

  return (
    <div>
      {/* Background Image Block */}
      <div className={`w-full min-h-[75vh] relative overflow-hidden transition-all duration-700 ${
        isDay ? "bg-[#fefcf6]" : "bg-[#0a0a0f]"
      }`}>
        <img
          src={currentImage || "/placeholder.svg"}
          alt="Wedding venue background"
          className={`${imageBaseStyle} z-0 ${isTransitioning ? "scale-105" : "scale-100"}`}
        />

        {nextImage && (
          <img
            src={nextImage || "/placeholder.svg"}
            alt="Wedding venue background transition"
            className={`${imageBaseStyle} z-10 opacity-0 scale-105`}
            style={{ animation: "fadeInScale 700ms ease-in-out forwards" }}
          />
        )}

        {/* Gradient Overlay */}
        <div
          className={`absolute bottom-0 left-0 w-full h-48 pointer-events-none z-20 transition-all duration-700 ${
            isDay
              ? "bg-gradient-to-t from-[#fefcf6]/60 via-[#fefcf6]/20 to-transparent"
              : "bg-gradient-to-t from-[#0a0a0f]/80 via-[#0a0a0f]/30 to-transparent"
          }`}
        />

        {/* Floating Circles */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full transition-all duration-1000 ${
                i % 3 === 0 ? "w-3 h-3" : i % 3 === 1 ? "w-2 h-2" : "w-1 h-1"
              } ${isDay ? "bg-white/60 shadow-lg shadow-white/30" : "bg-white/50 shadow-lg shadow-white/20"}`}
              style={{
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 4) * 20}%`,
                animationDelay: `${i * 400}ms`,
                animation: `float 4s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 z-16 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                isDay ? "bg-yellow-200/80 shadow-sm shadow-yellow-200/50" : "bg-blue-200/70 shadow-sm shadow-blue-200/40"
              }`}
              style={{
                left: `${15 + i * 10}%`,
                top: `${25 + (i % 2) * 30}%`,
                animationDelay: `${i * 600}ms`,
                animation: `twinkle 3s ease-in-out infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 text-center">
  <h2 className={`text-6xl md:text-[90px] font-serif ${isDay ? "text-white" : "text-white"}`}>
    {isDay ? "Welcome, Lovebirds!" : "Magical Evening"}
  </h2>
  <p className={`text-3xl md:text-[45px] font-[Great_Vibes] mt-2 ${isDay ? "text-gray-200" : "text-gray-300"}`}>
    {isDay ? "Where dreams come true" : "Evening Romance Awaits"}
  </p>
</div>

      </div>

    
    {/* Callout Card */}
<div className="w-full mx-auto px-6 md:px-10 py-16 md:py-24">
  <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 relative">
    
    {/* Left Image (visually lower) */}
    <div className="relative top-10 md:top-20">
      <img
        src={isDay ? "/wedding day.png" : "/weddingnight.png"}
        alt="Left decorative"
        className="w-[220px] md:w-[400px] h-auto"
      />
    </div>

    {/* Text Content */}
    <div
      className={`max-w-3xl text-center text-base md:text-lg font-normal px-4 md:px-6 ${
        isDay ? "text-gray-900" : "text-gray-100"
      }`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-5">
        {isDay
          ? "Plan the Perfect Daytime Wedding"
          : "Create a Magical Evening Celebration"}
      </h2>
      <p className="mb-3 leading-relaxed">
        {isDay
          ? "We’re here to help you plan a wedding that’s light, joyful, and filled with sunshine and laughter. Garden vows, brunch receptions, and bright blooms await!"
          : "We’re here to help you plan a wedding that’s enchanting and elegant — think candles, fairy lights, and unforgettable evening magic."}
      </p>
      <p className="text-xs italic mt-4">
        ❗ Weddy is just a helper — not a booking site. Looking for pros?{" "}
        <a href="#" className="font-medium hover:underline">Click here</a>
      </p>
    </div>

    {/* Right Image (visually higher) */}
    <div className="relative -top-10 md:-top-20">
      <img
        src={isDay ? "/wedding day 2.png" : "/weddingnight2.png"}
        alt="Right decorative"
        className="w-[300px] md:w-[400px] h-auto"
      />
    </div>
  </div>
</div>


   



<div className={`w-full px-[20px] pt-30 text-center transition-all duration-700 ${
  isDay ? "bg-[#fefcf6]" : "bg-[#0a0a0f]"
}`}>
  <div className="max-w-full mx-auto">
    <h1 className={`font-[Great_Vibes] text-5xl md:text-7xl mb-4 ${
      isDay ? "text-gray-800" : "text-white drop-shadow-2xl"
    }`}>
      {isDay ? "Perfect Day" : "Under the stars"}
    </h1>
    <p className={`font-[Great_Vibes] text-lg md:text-[40px] font-light italic mb-4 ${
      isDay ? "text-gray-700" : "text-gray-200/90"
    }`}>
      {isDay
        ? "The sun is shining, the flowers are blooming, and it's the perfect time to dream up your daytime wedding. Let’s plan something light, bright, and full of joy — from garden vows to brunch receptions!"
        : "The stars are coming out and so is the magic. Let’s plan a dreamy evening celebration, with glowing candles, moonlit dancing, and a night to remember forever."}
    </p>
  </div>
</div>

    </div>
  )
}

export default Header
