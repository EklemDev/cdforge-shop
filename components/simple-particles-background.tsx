"use client"

import { useEffect, useState, useMemo } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface SimpleParticlesBackgroundProps {
  colors?: string[]
}

export const SimpleParticlesBackground = ({ 
  colors = ['#3B82F6', '#1E40AF', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA'] 
}: SimpleParticlesBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Memoizar as cores para evitar recriação desnecessária
  const memoizedColors = useMemo(() => colors, [colors])

  useEffect(() => {
    // Criar partículas iniciais apenas se não existirem
    if (particles.length === 0) {
      const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2,
        color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)]
      }))

      setParticles(initialParticles)
    }

  }, [memoizedColors, particles.length])

  // Animação das partículas em useEffect separado
  useEffect(() => {
    if (particles.length === 0) return

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Bounce nas bordas
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX = -particle.speedX
            newX = particle.x + particle.speedX
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY = -particle.speedY
            newY = particle.y + particle.speedY
          }

          return {
            ...particle,
            x: newX,
            y: newY
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50)

    return () => clearInterval(interval)
  }, [particles.length])

  // Mouse tracking em useEffect separado
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Efeitos de luz - ajustados para tons de azul */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl animate-pulse" />
    </div>
  )
}


