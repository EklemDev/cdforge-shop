"use client"

import { useState } from "react"
import { LucideIcon } from "lucide-react"

interface SimpleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
  className?: string
  disabled?: boolean
}

export const SimpleButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  disabled = false
}: SimpleButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      hoverBackground: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
      shadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
      hoverShadow: "0 20px 40px rgba(102, 126, 234, 0.6)"
    },
    secondary: {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      hoverBackground: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
      shadow: "0 10px 30px rgba(240, 147, 251, 0.4)",
      hoverShadow: "0 20px 40px rgba(240, 147, 251, 0.6)"
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.1)",
      hoverBackground: "rgba(255, 255, 255, 0.2)",
      shadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
      hoverShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
    }
  }

  const sizes = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-6 text-lg"
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
      className={`relative group overflow-hidden rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 ${currentSize} ${className}`}
      style={{
        background: isHovered ? currentVariant.hoverBackground : currentVariant.background,
        boxShadow: isHovered ? currentVariant.hoverShadow : currentVariant.shadow,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/60 rounded-full transition-all duration-1000 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>

      {/* Ripple Effect */}
      <div 
        className={`absolute inset-0 bg-white/30 rounded-full transition-all duration-600 ${
          isPressed ? 'scale-200 opacity-0' : 'scale-0 opacity-0'
        }`}
      />

      {/* Shine Effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-transform duration-800 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {Icon && (
          <div className={`transition-all duration-600 ${isHovered ? 'rotate-360 scale-120' : ''}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <span className="drop-shadow-lg">{children}</span>
      </div>

      {/* Border Glow */}
      <div 
        className={`absolute inset-0 rounded-2xl border-2 border-white/30 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute top-4 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Disabled State */}
      {disabled && (
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <span className="text-gray-300">Indisponível</span>
        </div>
      )}
    </button>
  )
}


