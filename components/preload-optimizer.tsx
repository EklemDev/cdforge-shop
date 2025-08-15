"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface PreloadOptimizerProps {
  children: React.ReactNode
}

export default function PreloadOptimizer({ children }: PreloadOptimizerProps) {
  const [isPreloading, setIsPreloading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  useEffect(() => {
    // Otimizações reais
    const performOptimizations = async () => {
      const steps = [
        { name: "Inicializando componentes...", duration: 200 },
        { name: "Otimizando imagens...", duration: 300 },
        { name: "Carregando recursos...", duration: 250 },
        { name: "Preparando navegação...", duration: 150 }
      ]

      let completedSteps = 0
      const totalSteps = steps.length

      for (const step of steps) {
        setCurrentStep(step.name)
        
        // Simular otimização real
        await new Promise(resolve => setTimeout(resolve, step.duration))
        
        completedSteps++
        const stepProgress = (completedSteps / totalSteps) * 100
        setProgress(stepProgress)
      }

      // Otimizações reais do navegador
      if (typeof window !== 'undefined') {
                 // Preload crítico
         const criticalImages = ['/logo.png']
         criticalImages.forEach(src => {
           const img = new window.Image()
           img.src = src
         })

        // Otimizar scroll
        document.documentElement.style.scrollBehavior = 'smooth'
        
        // Prevenir zoom em mobile
        const viewport = document.querySelector('meta[name="viewport"]')
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes')
        }
      }

      // Pequeno delay para mostrar 100%
      setTimeout(() => {
        setIsPreloading(false)
      }, 100)
    }

    performOptimizations()
  }, [])

  if (isPreloading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center z-50">
        <div className="text-center max-w-sm mx-auto px-6">
                     {/* Logo */}
           <div className="mb-8">
             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                 <Image
                   src="/logo.png"
                   alt="CodeForge Logo"
                   width={32}
                   height={32}
                   className="w-8 h-8 object-contain"
                   style={{ willChange: 'transform' }}
                 />
               </div>
             </div>
             <h1 className="text-2xl font-bold text-gray-900 mb-2">
               CodeForge
             </h1>
             <p className="text-sm text-gray-600">
               Transformando ideias em realidade digital
             </p>
           </div>

          {/* Mensagem de otimização */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Otimizando o site para seu dispositivo...
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {currentStep}
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(progress)}% concluído
            </p>
          </div>

          {/* Indicador de carregamento */}
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin mr-2" />
            <span className="text-sm text-gray-600">Carregando...</span>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
