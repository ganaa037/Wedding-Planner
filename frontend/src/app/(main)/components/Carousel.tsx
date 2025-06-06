"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  isDay: boolean
}

const weddingPlaces = [
  {
    id: 1,
    title: "BOHO WEDDING",
    description:
      "Rustic outdoor venue with natural elements, surrounded by mountains and open fields for a free-spirited celebration.",
    image1: "BohoD.png",
    image2: "BohoN.png",
  },
  {
    id: 2,
    title: "CLASSIC WEDDING",
    description:
      "Elegant historic mansion with manicured gardens, grand ballrooms, and timeless architecture for a sophisticated celebration.",
    image1: "ClassicD.png",
    image2: "ClassicN.png",
  },
  {
    id: 3,
    title: "GLAMOROUS WEDDING",
    description:
      "Luxurious resort with panoramic views, crystal chandeliers, and opulent décor for an unforgettable fairy tale experience.",
    image1: "GlamorousD.png",
    image2: "GlamorousN.png",
  },
  {
    id: 4,
    title: "ROMANTIC WEDDING",
    description:
      "Enchanting garden venue with blooming flowers, soft lighting, and intimate spaces perfect for celebrating your love story.",
    image1: "RomanticD.png",
    image2: "RomanticN.png",
  },
  {
    id: 5,
    title: "VINTAGE WEDDING",
    description:
      "Charming countryside estate with antique details, historic architecture, and timeless beauty for a nostalgic celebration.",
    image1: "VintageD.png",
    image2: "VintageN.png",
  },
  {
    id: 6,
    title: "WHIMSICAL WEDDING",
    description:
      "Unique venue with artistic elements, colorful gardens, and creative spaces for a playful and imaginative celebration.",
    image1: "WhimsicalD.png",
    image2: "WhimsicalN.png",
  },
]

export const Carousel = ({ isDay }: HeaderProps) => {
  const [currentMainIndex, setCurrentMainIndex] = useState(0)
  const [animateText, setAnimateText] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadingCard, setFadingCard] = useState<number | null>(null)
  const [cardsSliding, setCardsSliding] = useState(false)
  const nextImageRef = useRef<HTMLImageElement | null>(null)

  const [visibleCards, setVisibleCards] = useState<number[]>([])

  const updateVisibleCards = () => {
    const width = window.innerWidth
    if (width < 768) {
      setVisibleCards([])
    } else if (width < 1024) {
      setVisibleCards([1, 2])
    } else {
      setVisibleCards([1, 2, 3])
    }
  }

  useEffect(() => {
    updateVisibleCards()
    window.addEventListener("resize", updateVisibleCards)
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [])

  useEffect(() => {
    const nextIndex = (currentMainIndex + 1) % weddingPlaces.length
    const img = new Image()
    img.src = isDay
      ? weddingPlaces[nextIndex].image1 || "/placeholder.svg"
      : weddingPlaces[nextIndex].image2 || "/placeholder.svg"
    nextImageRef.current = img
  }, [currentMainIndex, isDay])

  useEffect(() => {
    setAnimateText(false)
    const timer = setTimeout(() => {
      setAnimateText(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [currentMainIndex])

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCardsSliding(true)
    setFadingCard(0)
    setTimeout(() => {
      setCurrentMainIndex((prev) => (prev + 1) % weddingPlaces.length)
      setFadingCard(null)
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
    setFadingCard(0)
    setTimeout(() => {
      setCurrentMainIndex((prev) => (prev - 1 + weddingPlaces.length) % weddingPlaces.length)
      setFadingCard(null)
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
    setTimeout(() => {
      setCurrentMainIndex(index)
      setFadingCard(null)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 400)
    }, 500)
  }

  const currentWedding = weddingPlaces[currentMainIndex]

  return (
    <div className="relative h-[80vh] w-[80vw] overflow-hidden rounded-[40px]">
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center object-cover",
          isTransitioning ? "animate-fade-in-bg" : "transition-all duration-1000 ease-in-out"
        )}
        style={isDay
          ? { backgroundImage: `url(${currentWedding.image1})` }
          : { backgroundImage: `url(${currentWedding.image2})` }}
        key={currentMainIndex}
      />

      <div className="relative z-20 h-full w-full flex flex-row items-center justify-evenly gap-8 px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Removed flex-col so it never stacks vertically */}

        <div className="max-w-lg text-center flex flex-col items-center">
          <div className="overflow-hidden text-white">
            <div key={currentMainIndex}>
              <h1
                className={cn(
                  "text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-widest mb-4 font-elegant",
                  animateText && "animate-title-smooth"
                )}
                style={{ textShadow: "3px 3px 12px rgba(0,0,0,0.8), 0 0 25px rgba(255,255,255,0.4)", zIndex: 100, position: "relative" }}
              >
                {currentWedding.title}
              </h1>
              <div className="w-24 sm:w-28 md:w-32 h-px bg-white/80 mb-6 sm:mb-8 shadow-lg mx-auto"></div>
              <p
                className={cn(
                  "text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed font-elegant max-w-xl sm:max-w-2xl mx-auto",
                  animateText && "animate-description-smooth"
                )}
                style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)", zIndex: 100, position: "relative" }}
              >
                {currentWedding.description}
              </p>
              <Button
                variant="outline"
                className={cn(
                  "mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-white/10 text-white border-white/70 hover:bg-white/20 hover:text-white hover:border-white font-light tracking-wide font-elegant backdrop-blur-sm text-sm sm:text-base",
                  animateText && "animate-button-smooth"
                )}
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)", zIndex: 100, position: "relative" }}
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>

        {visibleCards.length > 0 && (
          <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-5 md:gap-6 xl:gap-8">
            {visibleCards.map((position, index) => {
              const imageIndex = (currentMainIndex + position) % weddingPlaces.length
              const isNext = index === 0
              const isFading = fadingCard === index

              return (
                <div
                  key={`card-${index}`}
                  className={cn(
                    "overflow-hidden rounded-lg sm:rounded-xl cursor-pointer shadow-2xl relative hover-float group",
                    "transition-all duration-500 ease-out will-change-transform",
                    cardsSliding && !isFading && "animate-slide-position",
                    isFading && "animate-card-fade",
                    isNext
                      ? "scale-110 ring-2 sm:ring-3 ring-white/90 shadow-white/30"
                      : "scale-100 opacity-95 hover:scale-105 hover:opacity-100"
                  )}
                  style={{
                    height: "clamp(8rem, 15vw, 20rem)",
                    width: "clamp(6rem, 10vw, 16rem)",
                    zIndex: isFading ? 60 : 10,
                    boxShadow: isNext
                      ? "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px rgba(255,255,255,0.1)"
                      : "0 20px 25px -5px rgba(0,0,0,0.1)",
                    animationDelay: cardsSliding && !isFading ? `${index * 0.1}s` : "0s",
                  }}
                  onClick={() => handleThumbnailClick(imageIndex, index)}
                >
                  <img
                    src={isDay ? weddingPlaces[imageIndex].image1 || "/placeholder.svg" : weddingPlaces[imageIndex].image2 || "/placeholder.svg"}
                    alt={weddingPlaces[imageIndex].title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover-card-overlay">
                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white font-elegant hover-title">
                        {weddingPlaces[imageIndex].title}
                      </h3>
                    </div>
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 lg:top-5 lg:right-5 xl:top-6 xl:right-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 border-2 border-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 z-30 -translate-x-1/2">
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 rounded-full bg-white/95 hover:bg-white shadow-xl border-white/30 transition-all duration-500 hover:scale-110 backdrop-blur-sm"
            onClick={handlePrev}
            disabled={isTransitioning}
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)", zIndex: 100 }}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 rounded-full bg-white/95 hover:bg-white shadow-xl border-white/30 transition-all duration-500 hover:scale-110 backdrop-blur-sm"
            onClick={handleNext}
            disabled={isTransitioning}
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.15)", zIndex: 100 }}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9" />
          </Button>
        </div>
      </div>
    </div>
  )
}
