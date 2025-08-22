"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"
import { X, Menu } from "lucide-react"

// Hook para detectar scroll
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

interface NavigationBarProps {
  activeSection: string
}

export default function NavigationBar({ activeSection }: NavigationBarProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrollY = useScrollPosition()
  
  // Mostrar barra apenas no mobile quando scroll > 100px
  const shouldShowMobileNav = scrollY > 100

  // Fechar menu quando clicar fora
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element
    if (!target.closest('.mobile-menu-container')) {
      setIsMobileMenuOpen(false)
    }
  }

  // Adicionar listener para clicar fora
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const sections = [
    { id: "categorias", label: "CATEGORIAS", path: "/categorias" },
    { id: "planos", label: "PLANOS", path: "/planos" },
    { id: "fundadores", label: "FUNDADORES", path: "/fundadores" },
    { id: "contato", label: "CONTATO", path: "/contato" }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-xl border-b border-blue-700/50 mobile-menu-container transition-all duration-300 ${
      shouldShowMobileNav ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => router.push("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-900/80 to-blue-800/60 backdrop-blur-sm p-2 rounded-xl border border-blue-400/30">
                <CodeForgeLogoEnhanced size={32} color="white" />
              </div>
            </div>
            <span className="text-white font-bold text-xl">CodeForge</span>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => router.push(section.path)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeSection === section.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white cursor-pointer hover:text-blue-300 transition-colors duration-200"
          >
            <span className="sr-only">Open menu</span>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-b border-white/20 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    router.push(section.path)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                    activeSection === section.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
