"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideIcon } from "lucide-react"

interface EpicCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  onClick?: () => void
  className?: string
  delay?: number
}

export const EpicCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  className = "",
  delay = 0
}: EpicCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 50
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group cursor-pointer perspective-1000 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
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
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0
            }}
            className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1
            }}
            className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 2
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full"
          />
        </div>

        {/* Icon Container */}
        <motion.div
          animate={{
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4 rounded-full border border-white/30 shadow-xl">
            <Icon className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            animate={{
              y: isHovered ? -5 : 0,
              color: isHovered ? "#ffffff" : "#f3f4f6"
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-100 mb-4 leading-tight"
          >
            {title}
          </motion.h3>

          <motion.p
            animate={{
              y: isHovered ? -3 : 0,
              opacity: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"
        />

        {/* Shine Effect */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
        />
      </div>

      {/* Shadow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? 10 : 5
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-4 inset-x-4 h-8 bg-black/20 rounded-full blur-xl"
      />
    </motion.div>
  )
}


