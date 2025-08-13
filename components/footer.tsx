"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Cpu, Code, Terminal, Handshake, Users, Shield } from "lucide-react"
import { useState } from "react"
import DevKeyModal from "./dev-key-modal"
import { useSiteConfig } from "@/hooks/useFirebaseData"

export default function Footer() {
  const router = useRouter()
  const [isDevModalOpen, setIsDevModalOpen] = useState(false)
  const { config, loading, error } = useSiteConfig()
  
  // Debug: mostrar dados atuais
  console.log('🔍 Footer - Config atual:', config)
  console.log('🔍 Footer - Loading:', loading)
  console.log('🔍 Footer - Error:', error)

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="CodeForge Logo" width={24} height={24} className="w-6 h-6" />
              <span className="text-xl font-bold">CodeForge</span>
            </div>
            <p className="text-gray-400 mb-4">Transformando ideias em soluções digitais inovadoras.</p>
            <div className="space-y-2">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white w-full">
                <a href={config?.discordLink || 'https://discord.gg/jp2BzA4H'} target="_blank" rel="noopener noreferrer">
                  Entrar no Discord
                </a>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white w-full">
                <a href={config?.whatsapp || "https://wa.me/5511966485110"} target="_blank" rel="noopener noreferrer">
                  Contato WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/bots')}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Bots
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/sites')}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Sites
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/design')}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Design
                </button>
              </li>

              <li>
                <button
                  onClick={() => router.push('/contato')}
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bots" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Discord Bots
                </Link>
              </li>
              <li>
                <Link href="/bots" className="text-gray-400 hover:text-blue-400 transition-colors">
                  WhatsApp Bots
                </Link>
              </li>
              <li>
                <Link href="/sites" className="text-gray-400 hover:text-blue-400 transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/design" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Identidade Visual
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Consultoria
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Suporte Técnico
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/ajuda/seja-agente" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção dos Criadores - Contato Direto */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Título da Seção */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">Contato Direto com os Fundadores</h3>
              <p className="text-sm text-gray-400">Entre em contato diretamente com nossa equipe de desenvolvimento</p>
            </div>

            {/* Cards dos Fundadores */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl">
              {/* Card MELKE */}
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">M E L K E</h4>
                    <p className="text-sm text-blue-300">Desenvolvedor Full-Stack</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Especialista em Web e Mobile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Especialista em Design</span>
                  </div>
                                     <div className="space-y-2 mt-4">
                     <Button 
                       asChild 
                       size="sm" 
                       className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                     >
                       <a href={config?.discordLink || "https://discord.gg/jp2BzA4H"} target="_blank" rel="noopener noreferrer">
                         Contatar no Discord
                       </a>
                     </Button>
                     <Button 
                       asChild 
                       size="sm" 
                       className="w-full bg-green-600 hover:bg-green-700 text-white"
                     >
                       <a href={config?.whatsapp || "https://wa.me/5511966485110"} target="_blank" rel="noopener noreferrer">
                         WhatsApp
                       </a>
                     </Button>
                   </div>
                </div>
              </div>

              {/* Card ZANESCO */}
              <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">ZANESCO</h4>
                    <p className="text-sm text-purple-300">Arquiteto de Sistemas</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Especialista em Bots e Automação</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-300">Desenvolvimento de Sistemas</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <a href={config?.discordLink || "https://discord.gg/jp2BzA4H"} target="_blank" rel="noopener noreferrer">
                        Contatar no Discord
                      </a>
                    </Button>
                                         <Button 
                       asChild 
                       size="sm" 
                       className="w-full bg-green-600 hover:bg-green-700 text-white"
                     >
                       <a href={config?.whatsapp || "https://wa.me/5511966485110"} target="_blank" rel="noopener noreferrer">
                         WhatsApp
                       </a>
                     </Button>
                  </div>
                </div>
              </div>

              {/* Card PEDRO */}
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">PEDRO</h4>
                    <p className="text-sm text-green-300">Agente Oficial</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Ótimo Negociador</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-gray-300">Agente Oficial</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <a href={config?.discordLink || "https://discord.gg/jp2BzA4H"} target="_blank" rel="noopener noreferrer">
                        Contatar no Discord
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <a href={config?.whatsapp || "https://wa.me/5511966485110"} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Frase Motivacional */}
            <div className="text-center">
              <p className="text-xs text-gray-500 italic">"DIGAE GURI!" - M E L K E, ZANESCO & PEDRO</p>
            </div>
          </div>
        </div>

        {/* Copyright e Botão DEV */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-400">© 2024 CodeForge. Forjando o futuro digital</p>
          
          {/* Botão DEV */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDevModalOpen(true)}
              className="text-gray-500 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
            >
              <Shield className="w-4 h-4 mr-1" />
              DEV
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Chave de Desenvolvedor */}
      <DevKeyModal 
        isOpen={isDevModalOpen} 
        onClose={() => setIsDevModalOpen(false)} 
      />
    </footer>
  )
}
