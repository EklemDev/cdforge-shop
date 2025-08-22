"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles, Menu, X, Home, Palette, Smartphone, Bot, Users, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Página inicial"
  },
  {
    name: "Bots",
    href: "/bots",
    icon: Bot,
    description: "Automação inteligente"
  },
  {
    name: "Sites",
    href: "/sites",
    icon: Smartphone,
    description: "Sites profissionais"
  },
  {
    name: "Design",
    href: "/design",
    icon: Palette,
    description: "Design criativo"
  },
  {
    name: "Assistência",
    href: "/assistencia",
    icon: Users,
    description: "Suporte especializado"
  },
  {
    name: "Contato",
    href: "/contato",
    icon: MessageCircle,
    description: "Fale conosco"
  }
]

export const EpicNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navegação principal */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                  CodeForge
                </span>
              </Link>
            </motion.div>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center gap-6">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group relative"
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{item.name}</span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Botão de menu mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl border-l border-white/20"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Menu</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-sm text-white/60">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="mt-8 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-white/20"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Pronto para começar?</h3>
                    <p className="text-sm text-white/80 mb-4">
                      Transforme sua ideia em realidade
                    </p>
                    <Link
                      href="/categorias"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                    >
                      <Sparkles className="w-4 h-4" />
                      Começar Agora
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

