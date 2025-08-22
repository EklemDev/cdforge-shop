"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"
import { Zap, Sparkles, Rocket, CheckCircle } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()
  
  const loadingSteps = [
    "Otimizando o site para seu dispositivo...",
    "Otimizando imagens...",
    "Carregando componentes...",
    "Preparando interface...",
    "Finalizando..."
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return loadingSteps.length - 1
        }
        return prev + 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [isClient])

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [controls])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden relative">
      {/* Partículas de Fundo Animadas */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const randomX = Math.random() * 100
            const randomY = Math.random() * 100
            const randomDelay = Math.random() * 2
            const randomDuration = 3 + Math.random() * 2
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay
                }}
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}%`
                }}
              />
            )
          })}
        </div>
      )}

      {/* Efeitos de Luz de Fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Logo CodeForge Minimalista */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <motion.div
              animate={controls}
              className="relative"
            >
              <CodeForgeLogoEnhanced size={64} color="blue" />
            </motion.div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-gradient-x">
                CodeForge
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-white/90 mb-12 font-medium"
        >
          Transformando ideias em realidade digital
        </motion.p>

        {/* Mensagem de Loading Dinâmica */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-blue-400" />
            </motion.div>
            <p className="text-lg text-white/80 font-medium">
              {loadingSteps[currentStep]}
            </p>
          </div>
        </motion.div>

        {/* Barra de Progresso Avançada */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-6"
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Barra de Fundo */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Barra de Progresso Animada */}
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Efeito de Brilho */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
            
            {/* Indicadores de Progresso */}
            <div className="flex justify-between mt-2 text-sm text-white/60">
              <span>{progress}% concluído</span>
              <span>{currentStep + 1}/{loadingSteps.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Spinner de Loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center space-x-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
          />
          <span className="text-white/70 text-sm">Carregando...</span>
        </motion.div>

        {/* Efeitos Decorativos */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Efeitos de Partículas Flutuantes */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`floating-${i}`}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

