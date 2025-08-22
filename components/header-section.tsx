"use client"

import { motion } from "framer-motion"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"

export default function HeaderSection() {
  return (
    <div className="text-center mb-12">
      {/* Logo CodeForge com Efeitos Épicos */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="flex flex-col items-center justify-center mb-8 group"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-blue-900/90 to-blue-800/80 backdrop-blur-xl p-6 rounded-full shadow-2xl border-2 border-blue-400/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out">
            <CodeForgeLogoEnhanced size={96} color="white" />
          </div>
          {/* Efeito de Brilho Rotativo na Logo */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animationDuration: "3s" }}
          ></div>
          {/* Efeito de Glow Azul */}
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </motion.div>

      {/* Título Principal com Efeitos Épicos */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative group"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black relative mb-4">
          {/* Texto com Gradiente Animado */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-gradient-x bg-300% font-extrabold tracking-tight">
            Escolha seu Serviço
          </span>

          {/* Efeito de Brilho no Texto */}
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white via-blue-200 to-blue-300 opacity-0 group-hover:opacity-60 animate-shimmer bg-300% font-extrabold tracking-tight transition-opacity duration-700">
            Escolha seu Serviço
          </span>

          {/* Sombra Dinâmica */}
          <span className="absolute inset-0 text-blue-400/20 blur-sm font-extrabold tracking-tight transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
            Escolha seu Serviço
          </span>
        </h1>

        {/* Linha de Energia Embaixo do Título */}
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 group-hover:opacity-100 group-hover:h-2 transition-all duration-500 rounded-full"></div>

        {/* Partículas de Energia */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-2 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="absolute top-12 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </motion.div>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mt-6"
      >
        Soluções personalizadas para impulsionar seu negócio digital
      </motion.p>
    </div>
  )
}
