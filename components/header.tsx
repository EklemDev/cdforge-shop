"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setMounted(true)
    // Detectar a rota atual
    setCurrentPath(window.location.pathname)
    
    // Listener para mudanças de rota
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    // Adicionar listener para mudanças de rota
    window.addEventListener('popstate', handleRouteChange)
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // Função para verificar se uma rota está ativa
  const isActiveRoute = (path: string) => {
    return currentPath === path
  }

  // Função para obter classes CSS baseadas no estado ativo
  const getNavButtonClasses = (path: string) => {
    const baseClasses = "transition-all duration-300 font-medium cursor-pointer relative"
    const activeClasses = "text-blue-600 dark:text-blue-400 font-semibold"
    const inactiveClasses = "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`
  }

  // Função para navegar e atualizar o estado ativo - Otimizada com useCallback
  const handleNavigation = useCallback((path: string) => {
    setCurrentPath(path)
    router.push(path)
  }, [router])

  // Otimização: Memoização das classes CSS para evitar recálculos
  const navButtonClasses = useMemo(() => ({
    planos: getNavButtonClasses('/planos'),
    categorias: getNavButtonClasses('/categorias'),
    fundadores: getNavButtonClasses('/fundadores')
  }), [currentPath])

  // Otimização: Callbacks para botões específicos
  const handlePlanosClick = useCallback(() => handleNavigation('/planos'), [handleNavigation])
  const handleCategoriasClick = useCallback(() => handleNavigation('/categorias'), [handleNavigation])
  const handleFundadoresClick = useCallback(() => handleNavigation('/fundadores'), [handleNavigation])
  const handleAjudaClick = useCallback(() => router.push('/ajuda'), [router])
  const handleDiscordClick = useCallback(() => {
    window.open('https://discord.gg/jp2BzA4H', '_blank', 'noopener,noreferrer')
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="w-full max-w-4xl flex items-center justify-between">
              <div className="w-32"></div>
              <nav className="flex items-center space-x-8">
                <span className="text-gray-700">Planos</span>
                <span className="text-gray-700">Categorias</span>
              </nav>
              <div className="w-32"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="w-full max-w-6xl flex items-center justify-between">
            {/* Left spacer for balance */}
            <div className="hidden md:flex w-32"></div>

            {/* Centered Desktop Navigation Otimizada */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={handlePlanosClick}
                className={navButtonClasses.planos}
                style={{ touchAction: 'manipulation' }}
              >
                Planos
                {/* Indicador ativo com sublinhado animado */}
                {isActiveRoute('/planos') && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
              <button
                onClick={handleCategoriasClick}
                className={navButtonClasses.categorias}
                style={{ touchAction: 'manipulation' }}
              >
                Categorias
                {/* Indicador ativo com sublinhado animado */}
                {isActiveRoute('/categorias') && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
              <button
                onClick={handleFundadoresClick}
                className={navButtonClasses.fundadores}
                style={{ touchAction: 'manipulation' }}
              >
                Fundadores
                {/* Indicador ativo com sublinhado animado */}
                {isActiveRoute('/fundadores') && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
            </nav>

            {/* Right side buttons Otimizados */}
            <div className="hidden md:flex items-center space-x-3 w-32 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAjudaClick}
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200 bg-transparent cursor-pointer active:scale-95 transform-gpu"
                style={{ touchAction: 'manipulation' }}
              >
                Ajuda
              </Button>

              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer active:scale-95 transform-gpu"
                onClick={handleDiscordClick}
                style={{ touchAction: 'manipulation' }}
              >
                Discord
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X size={24} className="dark:text-white" />
              ) : (
                <Menu size={24} className="dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <nav className="flex flex-col space-y-4 items-center">
              <button
                onClick={() => {
                  handleNavigation('/planos')
                  setIsMenuOpen(false)
                }}
                className={`${getNavButtonClasses('/planos')} relative`}
              >
                Planos
                {/* Indicador ativo para mobile */}
                {isActiveRoute('/planos') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
              <button
                onClick={() => {
                  handleNavigation('/categorias')
                  setIsMenuOpen(false)
                }}
                className={`${getNavButtonClasses('/categorias')} relative`}
              >
                Categorias
                {/* Indicador ativo para mobile */}
                {isActiveRoute('/categorias') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
              <button
                onClick={() => {
                  handleNavigation('/fundadores')
                  setIsMenuOpen(false)
                }}
                className={`${getNavButtonClasses('/fundadores')} relative`}
              >
                Fundadores
                {/* Indicador ativo para mobile */}
                {isActiveRoute('/fundadores') && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                )}
              </button>
              <Link
                href="/ajuda"
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium"
              >
                Ajuda
              </Link>
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
