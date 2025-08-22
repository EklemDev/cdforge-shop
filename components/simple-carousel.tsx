"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface CarouselItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  actionText?: string
}

interface SimpleCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
}

export const SimpleCarousel = ({ 
  items, 
  autoPlay = true, 
  interval = 5000 
}: SimpleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const currentItem = items[currentIndex]

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: currentItem.gradient,
          opacity: 0.1
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl p-4 sm:p-6 md:p-8">
          {/* Icon with 3D Effect */}
          <div className="mb-4 sm:mb-6 md:mb-8 animate-bounce">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl border border-white/30 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="text-3xl sm:text-4xl md:text-6xl text-white drop-shadow-2xl">
                  {currentItem.icon}
                </div>
                <div className="text-lg sm:text-2xl md:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-lg text-center">
                  {currentItem.actionText}
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight animate-fade-in">
            {currentItem.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in mb-4 sm:mb-6 md:mb-8 px-2">
            {currentItem.description}
          </p>


        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
           style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }} />

      {/* Navigation Controls - Moved to Bottom */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 md:gap-4">
        <button
          onClick={goToPrevious}
          className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
        </button>

        {/* Counter */}
        <div className="text-center px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
          <span className="text-white font-semibold text-xs sm:text-sm">
            {currentIndex + 1} de {items.length}
          </span>
        </div>

        <button
          onClick={goToNext}
          className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}
