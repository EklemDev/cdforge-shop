"use client"

import { useState } from "react"
import { LucideIcon } from "lucide-react"

interface SimpleCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  onClick?: () => void
  className?: string
  delay?: number
}

export const SimpleCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  className = "",
  delay = 0
}: SimpleCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group cursor-pointer perspective-1000 transition-all duration-500 hover:scale-105 ${className}`}
      style={{ 
        animationDelay: `${delay * 100}ms`,
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 rounded-3xl transition-all duration-700 ease-out"
        style={{
          background: gradient,
          opacity: isHovered ? 0.3 : 0.1
        }}
      />

      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Icon Container */}
        <div className={`relative mb-6 transition-all duration-600 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4 rounded-full border border-white/30 shadow-xl">
            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className={`text-2xl font-bold text-gray-100 mb-4 leading-tight transition-all duration-300 ${isHovered ? '-translate-y-1 text-white' : ''}`}>
            {title}
          </h3>

          <p className={`text-gray-300 leading-relaxed transition-all duration-300 ${isHovered ? '-translate-y-1 opacity-100' : 'opacity-80'}`}>
            {description}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Shine Effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-800 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        />
      </div>

      {/* Shadow */}
      <div 
        className={`absolute -bottom-4 inset-x-4 h-8 bg-black/20 rounded-full blur-xl transition-all duration-300 ${isHovered ? 'opacity-30 scale-110 translate-y-2' : 'opacity-10'}`}
      />
    </div>
  )
}


