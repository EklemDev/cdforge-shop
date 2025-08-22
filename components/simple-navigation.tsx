"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, Bot, Globe, Palette, Code, MessageCircle } from "lucide-react"

const navItems = [
  { name: "Início", href: "/", icon: Home },
  { name: "Bots", href: "/bots", icon: Bot },
  { name: "Sites", href: "/sites", icon: Globe },
  { name: "Design", href: "/design", icon: Palette },
  { name: "Contato", href: "/contato", icon: MessageCircle },
]

export const SimpleNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Navegação Desktop */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/10 backdrop-blur-xl border-b border-white/20" 
            : "bg-transparent"
        }`}
      >
                 <div className="container mx-auto px-4">
           <div className="flex items-center justify-center h-16 md:h-20">
             {/* Links de Navegação - Centralizados */}
             <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group text-white/80 hover:text-white transition-colors duration-300 hover:scale-105 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </span>
                  
                  {/* Underline Animado */}
                  <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full w-0" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </a>
              ))}
            </div>

             {/* Botão Mobile */}
             <button
               onClick={() => setIsOpen(!isOpen)}
               className="md:hidden text-white p-2 hover:scale-105 transition-transform duration-300 absolute right-4"
             >
               {isOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
           </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl border-l border-white/20 z-50 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
                     {/* Header Mobile */}
           <div className="flex items-center justify-end mb-8">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 hover:scale-105 transition-transform duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links Mobile */}
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-4 p-4 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group hover:translate-x-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
                </div>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>


        </div>
      </div>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  )
}
