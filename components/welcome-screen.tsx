"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { Code, Cpu, Terminal, MessageCircle, Users, Handshake, MapPin, Clock } from "lucide-react"
import PricingDisplay from "./pricing-display"
import { useFounders } from "@/hooks/useFirebaseData"

// Mapa de ícones memoizado para evitar recriações
const iconMap = {
  Code: Code,
  Terminal: Terminal,
  Handshake: Handshake
} as const

export default function WelcomeScreen() {
  const router = useRouter()
  const { founders, loading } = useFounders()
  
  // Otimização: Callbacks memoizados para evitar re-renders
  const handleDiscordClick = useCallback(() => {
    window.open('https://discord.gg/jp2BzA4H', '_blank', 'noopener,noreferrer')
  }, [])
  
  const handleAjudaClick = useCallback(() => {
    router.push('/ajuda')
  }, [router])
  
  // Otimização: Memoização dos fundadores processados
  const processedFounders = useMemo(() => {
    return founders.map((founder) => {
      const IconComponent = iconMap[founder.icon as keyof typeof iconMap] || Code
      return { ...founder, IconComponent }
    })
  }, [founders])
  
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden transition-colors">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/15 dark:bg-purple-400/25 rounded-lg rotate-45 blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/8 dark:bg-cyan-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/20 dark:bg-blue-400/30 rounded-lg rotate-12 blur-md animate-spin"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo e Nome CodeForge com Efeitos Épicos */}
          <div className="flex flex-col sm:flex-row items-center justify-center mb-16 group">
            {/* Logo com Efeitos */}
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6 rounded-full shadow-2xl border-2 border-blue-500/30 dark:border-blue-400/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out">
                <Image
                  src="/logo.png"
                  alt="CodeForge Logo"
                  width={80}
                  height={80}
                  priority
                  className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl filter brightness-110 contrast-110 group-hover:brightness-125 group-hover:contrast-125 transition-all duration-500"
                  style={{ 
                    transform: 'translateZ(0)', // Força aceleração de hardware
                    willChange: 'transform, filter' // Otimização para animações
                  }}
                />
              </div>
              {/* Efeito de Brilho Rotativo na Logo */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>

            {/* Nome CodeForge com Efeitos Épicos */}
            <div className="relative">
              {/* BETA TEST Badge - Posicionado acima do nome CodeForge */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                <span 
                  className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg relative overflow-hidden"
                  style={{ 
                    backgroundColor: '#ff0000',
                    animation: 'betaGlow 2s ease-in-out infinite alternate'
                  }}
                >
                  <span className="relative z-10">BETA TEST</span>
                  {/* Efeito de brilho interno */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"
                    style={{ animationDuration: '3s' }}
                  ></div>
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black relative">
                {/* Texto com Gradiente Animado */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 via-cyan-500 to-blue-600 animate-gradient-x bg-300% font-extrabold tracking-tight">
                  CodeForge
                </span>

                {/* Efeito de Brilho no Texto */}
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-60 animate-shimmer bg-300% font-extrabold tracking-tight transition-opacity duration-700">
                  CodeForge
                </span>

                {/* Sombra Dinâmica */}
                <span className="absolute inset-0 text-blue-600/20 dark:text-blue-400/20 blur-sm font-extrabold tracking-tight transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
                  CodeForge
                </span>
              </h1>

              {/* Linha de Energia Embaixo do Nome */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 group-hover:opacity-100 group-hover:h-2 transition-all duration-500 rounded-full"></div>

              {/* Partículas de Energia */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-2 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                <div
                  className="absolute top-12 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Título Principal */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Transforme suas ideias em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse">
              soluções digitais
            </span>
          </h2>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Bots inteligentes, sites profissionais, design criativo e serviços especializados para impulsionar seu
            negócio
          </p>

          {/* Botões de Ação Otimizados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={() => router.push('/categorias')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-2xl shadow-lg font-semibold cursor-pointer active:scale-95 active:shadow-lg transform-gpu"
              style={{ 
                willChange: 'transform, box-shadow',
                touchAction: 'manipulation'
              }}
            >
              ✨ Escolher Solução
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleDiscordClick}
              className="border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-900/20 px-12 py-6 text-xl rounded-2xl transition-all duration-200 hover:scale-105 bg-transparent font-semibold active:scale-95 transform-gpu"
              style={{ 
                willChange: 'transform',
                touchAction: 'manipulation'
              }}
            >
              💬 Falar no Discord
            </Button>
          </div>

          {/* Seção Simplificada de Fundadores */}
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Nossa Equipe
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fundadores especializados prontos para atender você
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando fundadores...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Cards dos Fundadores Otimizados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {processedFounders.map((founder) => {
                    const { IconComponent } = founder
                    return (
                      <div 
                        key={founder.id} 
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 transform-gpu hover:scale-105"
                        style={{ willChange: 'transform' }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${founder.bgGradient} rounded-full flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {founder.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {founder.role}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{founder.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-300">{founder.availability.start}-{founder.availability.end}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Informações Resumidas */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-600 dark:text-gray-300">
                          {founders.filter(f => f.isOnline).length} online
                        </span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Cobertura 24/7
                      </div>
                    </div>
                    <Button 
                      asChild 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3"
                    >
                      <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Discord
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Seção de Preços Sincronizados */}
    <PricingDisplay />
  </>
  )
}

// Estilos CSS personalizados para animações
const betaTestStyles = `
  @keyframes betaGlow {
    0% {
      box-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000;
    }
    100% {
      box-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
    }
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%) skewX(-12deg);
    }
    100% {
      transform: translateX(200%) skewX(-12deg);
    }
  }
`

// Injetar estilos no head do documento
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = betaTestStyles
  document.head.appendChild(style)
}
