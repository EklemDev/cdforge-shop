"use client"

import { useState, useEffect } from "react"
import { Loader2, Code, Cpu, Terminal } from "lucide-react"

interface LoadingSpinnerProps {
  message?: string
  show?: boolean
}

export default function LoadingSpinner({ 
  message = "Carregando...", 
  show = true 
}: LoadingSpinnerProps) {
  const [dots, setDots] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!show || !mounted) return

    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".")
    }, 500)

    return () => clearInterval(interval)
  }, [show, mounted])

  if (!show || !mounted) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Anel de loading animado */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            
            {/* Ícones girando no centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-8 h-8">
                <Code className="w-6 h-6 text-blue-500 absolute inset-0 animate-pulse" />
                <Cpu className="w-6 h-6 text-purple-500 absolute inset-0 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Terminal className="w-6 h-6 text-green-500 absolute inset-0 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>

          {/* Texto de loading */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {message}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Aguarde um momento{dots}
            </p>
          </div>

          {/* Barra de progresso animada */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse" 
                 style={{ 
                   animation: 'loading-bar 2s ease-in-out infinite',
                   width: '100%'
                 }}>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
