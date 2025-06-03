"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Wedding places data with high-quality landscape images
const weddingPlaces = [
  {
    id: 1,
    title: "BOHO WEDDING",
    description:
      "Rustic outdoor venue with natural elements, surrounded by mountains and open fields for a free-spirited celebration.",
    image: "w1.jpg",
  },
  {
    id: 2,
    title: "CLASSIC WEDDING",
    description:
      "Elegant historic mansion with manicured gardens, grand ballrooms, and timeless architecture for a sophisticated celebration.",
    image: "ClassicW.png",
  },
  {
    id: 3,
    title: "GLAMOROUS WEDDING",
    description:
      "Luxurious resort with panoramic views, crystal chandeliers, and opulent décor for an unforgettable fairy tale experience.",
    image: "w3.jpg",
  },
  {
    id: 4,
    title: "ROMANTIC WEDDING",
    description:
      "Enchanting garden venue with blooming flowers, soft lighting, and intimate spaces perfect for celebrating your love story.",
    image: "w4.jpg",
  },
  {
    id: 5,
    title: "VINTAGE WEDDING",
    description:
      "Charming countryside estate with antique details, historic architecture, and timeless beauty for a nostalgic celebration.",
    image: "/images/vintage-wedding.jpg",
  },
  {
    id: 6,
    title: "SMALL BUDGET WEDDING",
    description:
      "Beautiful community venue with natural surroundings, customizable spaces, and affordable options for an intimate gathering.",
    image: "/images/budget-wedding.jpg",
  },
  {
    id: 7,
    title: "WHIMSICAL WEDDING",
    description:
      "Unique venue with artistic elements, colorful gardens, and creative spaces for a playful and imaginative celebration.",
    image: "/images/whimsical-wedding.jpg",
  },
]

export const Carousel =()=> {
  const [currentMainIndex, setCurrentMainIndex] = useState(0)
  const [animateText, setAnimateText] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadingCard, setFadingCard] = useState<number | null>(null)
  const [cardsSliding, setCardsSliding] = useState(false)
  const nextImageRef = useRef<HTMLImageElement | null>(null)

  // Dynamic card positions based on screen size
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      if (width < 640) return [1] // sm: show 1 card
      if (width < 768) return [1, 2] // md: show 2 cards
      return [1, 2, 3] // lg+: show 3 cards
    }
    return [1, 2, 3] // default
  }

  const [visibleCards, setVisibleCards] = useState(getVisibleCards())

  // Update visible cards on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Preload next image
  useEffect(() => {
    // Preload the next image
    const nextIndex = (currentMainIndex + 1) % weddingPlaces.length
    const img = new Image()
    img.src = weddingPlaces[nextIndex].image
    nextImageRef.current = img
  }, [currentMainIndex])

  // Trigger animations when main image changes
  useEffect(() => {
    setAnimateText(false)

    // Small delay then animate in
    const timer = setTimeout(() => {
      setAnimateText(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [currentMainIndex])

  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCardsSliding(true)
    setFadingCard(0) // First card (next card) fades out

    // Start fade animation, then change background
    setTimeout(() => {
      const nextIndex = (currentMainIndex + 1) % weddingPlaces.length
      setCurrentMainIndex(nextIndex)
      setFadingCard(null)

      // Reset animations
      setTimeout(() => {
        setCardsSliding(false)
        setIsTransitioning(false)
      }, 400)
    }, 500)
  }

  const handlePrev = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCardsSliding(true)
    setFadingCard(0) // First card fades out

    // Start fade animation, then change background
    setTimeout(() => {
      const prevIndex = (currentMainIndex - 1 + weddingPlaces.length) % weddingPlaces.length
      setCurrentMainIndex(prevIndex)
      setFadingCard(null)

      // Reset animations
      setTimeout(() => {
        setCardsSliding(false)
        setIsTransitioning(false)
      }, 400)
    }, 500)
  }

  const handleThumbnailClick = (index: number, cardPosition: number) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setFadingCard(cardPosition)

    // After fade animation, change main image
    setTimeout(() => {
      setCurrentMainIndex(index)
      setFadingCard(null)

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 400)
    }, 500)
  }

  const currentWedding = weddingPlaces[currentMainIndex]

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main background image with smooth animation */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center object-cover ",
          isTransitioning ? "animate-fade-in-bg" : "transition-all duration-1000 ease-in-out",
        )}
        style={{ backgroundImage: `url(${currentWedding.image})` }}
        key={currentMainIndex} // Force re-render for animation
      >
        {/* No dark overlay for bright, clear images */}
      </div>

      {/* Content container with absolute positioning */}
      <div className="relative z-20 h-full w-full">
        {/* Centered content with smooth text animations - highest z-index */}
        <div className="absolute top-0 left-0 p-12 w-full pt-80 max-w-3xl">
          <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-3xl mx-auto">
            <div className="overflow-hidden text-white">
              <div key={currentMainIndex}>
                {/* English Title */}
                <h1
                  className={cn(
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-widest mb-4 font-elegant",
                    animateText && "animate-title-smooth",
                  )}
                  style={{
                    textShadow: "3px 3px 12px rgba(0,0,0,0.8), 0 0 25px rgba(255,255,255,0.4)",
                    zIndex: 100,
                    position: "relative",
                  }}
                >
                  {currentWedding.title}
                </h1>
                <div className="w-24 sm:w-28 md:w-32 h-px bg-white/80 mb-6 sm:mb-8 shadow-lg mx-auto"></div>
                {/* Description appears in main image */}
                <p
                  className={cn(
                    "text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed font-elegant max-w-xl sm:max-w-2xl mx-auto",
                    animateText && "animate-description-smooth",
                  )}
                  style={{
                    textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                    zIndex: 100,
                    position: "relative",
                  }}
                >
                  {currentWedding.description}
                </p>
                <Button
                  variant="outline"
                  className={cn(
                    "mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-white/10 text-white border-white/70 hover:bg-white/20 hover:text-white hover:border-white font-light tracking-wide font-elegant backdrop-blur-sm text-sm sm:text-base",
                    animateText && "animate-button-smooth",
                  )}
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    zIndex: 100,
                    position: "relative",
                  }}
                >
                  Explore Venue
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed positioned thumbnails with responsive visibility */}
        <div className="absolute top-1/2 right-2 sm:right-4 md:right-8 lg:right-12 -translate-y-1/2 z-10">
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {visibleCards.map((position, index) => {
              const imageIndex = (currentMainIndex + position) % weddingPlaces.length
              const isNext = index === 0
              const isFading = fadingCard === index

              return (
                <div
                  key={`card-${index}`} // Stable key for smooth transitions
                  className={cn(
                    // Responsive card sizes
                    "h-24 w-16 sm:h-32 sm:w-20 md:h-40 md:w-28 lg:h-56 lg:w-40 xl:h-72 xl:w-52",
                    "overflow-hidden rounded-lg sm:rounded-xl cursor-pointer shadow-2xl relative hover-float group",
                    "transition-all duration-500 ease-out will-change-transform", // High-performance transitions
                    cardsSliding && !isFading && "animate-slide-position", // Cards slide to new positions
                    isFading && "animate-card-fade", // Selected card fades out
                    isNext
                      ? "scale-110 ring-2 sm:ring-3 ring-white/90 shadow-white/30"
                      : "scale-100 opacity-95 hover:scale-105 hover:opacity-100",
                  )}
                  style={{
                    zIndex: isFading ? 60 : 10,
                    boxShadow: isNext
                      ? "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px rgba(255,255,255,0.1)"
                      : "0 20px 25px -5px rgba(0,0,0,0.1)",
                    animationDelay: cardsSliding && !isFading ? `${index * 0.1}s` : "0s",
                  }}
                  onClick={() => handleThumbnailClick(imageIndex, index)}
                >
                  <img
                    src={weddingPlaces[imageIndex].image || "/placeholder.svg"}
                    alt={weddingPlaces[imageIndex].title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                    key={`img-${imageIndex}`} // Force re-render for new images
                  />
                  {/* Simple hover overlay - only titles, no description */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover-card-overlay">
                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
                      {/* English Title */}
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white font-elegant hover-title">
                        {weddingPlaces[imageIndex].title}
                      </h3>
                    </div>
                    {/* Simple decorative element */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-5 lg:right-5 xl:top-6 xl:right-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Larger navigation buttons with better responsive sizing */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 z-30 -translate-x-1/2">
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14  rounded-full bg-white/95 hover:bg-white shadow-xl border-white/30 transition-all duration-500 hover:scale-110 backdrop-blur-sm"
            onClick={handlePrev}
            disabled={isTransitioning}
            style={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              zIndex: 100,
            }}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14  rounded-full bg-white/95 hover:bg-white shadow-xl border-white/30 transition-all duration-500 hover:scale-110 backdrop-blur-sm"
            onClick={handleNext}
            disabled={isTransitioning}
            style={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              zIndex: 100,
            }}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
          </Button>
        </div>
      </div>
    </div>
  )
}
