import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 bg-white dark:bg-gray-900 overflow-hidden transition-colors">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/15 dark:bg-blue-400/25 rounded-lg rotate-45 blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/8 dark:bg-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/20 dark:bg-blue-400/30 rounded-lg rotate-12 blur-md animate-spin"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Logo e Nome CodeForge com Efeitos Poderosos */}
          <div className="flex items-center justify-center mb-12 group">
            {/* Logo com Efeitos */}
            <div className="relative mr-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-full shadow-2xl border-2 border-blue-500/30 dark:border-blue-400/40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out">
                <Image
                  src="/logo.png"
                  alt="CodeForge Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 drop-shadow-2xl filter brightness-110 contrast-110 group-hover:brightness-125 group-hover:contrast-125 transition-all duration-500"
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black relative">
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

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Transforme suas ideias em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse">
              soluções digitais
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Bots inteligentes, sites profissionais, design criativo e serviços especializados para impulsionar seu
            negócio
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg font-semibold"
            >
              <Link href="#categories">✨ Escolher Solução</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 bg-transparent font-semibold"
            >
              <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                💬 Falar no Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
