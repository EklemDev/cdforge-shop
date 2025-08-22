"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideIcon } from "lucide-react"

interface EpicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: LucideIcon
  className?: string
  disabled?: boolean
}

export const EpicButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  disabled = false
}: EpicButtonProps) => {
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
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
      className={`relative group overflow-hidden rounded-2xl font-semibold text-white transition-all duration-300 ${currentSize} ${className}`}
      style={{
        background: isHovered ? currentVariant.hoverBackground : currentVariant.background,
        boxShadow: isHovered ? currentVariant.hoverShadow : currentVariant.shadow,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovered ? [0, 1, 0] : 0,
              scale: isHovered ? [0, 1, 0] : 0,
              x: isHovered ? [0, Math.random() * 200 - 100] : 0,
              y: isHovered ? [0, Math.random() * 200 - 100] : 0
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2
            }}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Ripple Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isPressed ? 2 : 0,
          opacity: isPressed ? 0 : 0
        }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white/30 rounded-full"
      />

      {/* Shine Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-3">
        {Icon && (
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
        <span className="drop-shadow-lg">{children}</span>
      </div>

      {/* Border Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl border-2 border-white/30"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0
          }}
          className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 1
          }}
          className="absolute top-4 right-6 w-1 h-1 bg-white/40 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 2
          }}
          className="absolute bottom-2 left-1/2 w-1 h-1 bg-white/50 rounded-full"
        />
      </div>

      {/* Disabled State */}
      {disabled && (
        <div className="absolute inset-0 bg-gray-500/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <span className="text-gray-300">Indisponível</span>
        </div>
      )}
    </motion.button>
  )
}


