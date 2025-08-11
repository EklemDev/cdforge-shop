import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Code, Cpu, Terminal, MessageCircle, Users, Handshake } from "lucide-react"

export default function WelcomeScreen() {
  return (
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
                  className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-2xl filter brightness-110 contrast-110 group-hover:brightness-125 group-hover:contrast-125 transition-all duration-500"
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

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg font-semibold"
            >
              <Link href="/categorias">✨ Escolher Solução</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-900/20 px-12 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 bg-transparent font-semibold"
            >
              <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                💬 Falar no Discord
              </a>
            </Button>
          </div>

          {/* Seção de Contato Direto com os Fundadores */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Contato Direto com os Fundadores
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Entre em contato diretamente com <span className="font-semibold text-blue-600 dark:text-blue-400">M E L K E</span>, <span className="font-semibold text-purple-600 dark:text-purple-400">ZANESCO</span> e <span className="font-semibold text-green-600 dark:text-green-400">PEDRO</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Card MELKE */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">M E L K E</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Desenvolvedor Full-Stack</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Especialista em Web e Mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Especialista em Design</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-3 h-3 mr-2" />
                    Contatar no Discord
                  </a>
                </Button>
              </div>

              {/* Card ZANESCO */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/30 dark:to-cyan-900/30 border border-purple-200 dark:border-purple-700 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">ZANESCO</h4>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Arquiteto de Sistemas</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Especialista em Bots e Automação</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-3 h-3 text-cyan-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Desenvolvimento de Sistemas</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="sm"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-3 h-3 mr-2" />
                    Contatar no Discord
                  </a>
                </Button>
              </div>

              {/* Card PEDRO */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">PEDRO</h4>
                    <p className="text-xs text-green-600 dark:text-green-400">Agente Oficial</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Ótimo Negociador</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Agente Oficial</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-3 h-3 mr-2" />
                    Contatar no Discord
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                "DIGAE GURI!" - M E L K E, ZANESCO & PEDRO
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
