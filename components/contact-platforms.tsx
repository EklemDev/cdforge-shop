"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone, Bot } from "lucide-react"
import Image from "next/image"

interface ContactPlatformsProps {
  onPlatformSelect?: (platform: string) => void
}

export default function ContactPlatforms({ onPlatformSelect }: ContactPlatformsProps) {
  const platforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Resposta instantânea',
      icon: MessageCircle,
      logo: '/whatsapp.png',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'email',
      name: 'E-mail',
      description: 'Documentação completa',
      icon: Mail,
      logo: '/logo.png',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'phone',
      name: 'Telefone',
      description: 'Conversa direta',
      icon: Phone,
      logo: '/logo.png',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Comunidade ativa',
      icon: Bot,
      logo: '/discord.png',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ]

  const handlePlatformClick = (platform: any) => {
    if (onPlatformSelect) {
      onPlatformSelect(platform.id)
    } else {
      // Comportamento padrão - abrir links externos
      switch (platform.id) {
        case 'whatsapp':
          window.open('https://wa.me/5511999999999', '_blank', 'noopener,noreferrer')
          break
        case 'email':
          window.open('mailto:contato@codeforge.com.br', '_blank', 'noopener,noreferrer')
          break
        case 'phone':
          window.open('tel:+5511999999999', '_blank', 'noopener,noreferrer')
          break
        case 'discord':
          window.open('https://discord.gg/jp2BzA4H', '_blank', 'noopener,noreferrer')
          break
      }
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Entre em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Contato
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Escolha a plataforma de sua preferência para iniciar uma conversa conosco
          </p>
        </div>

        {/* Cards de Plataforma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {platforms.map((platform) => {
            const PlatformIcon = platform.icon
            return (
              <Card
                key={platform.id}
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-white/80 backdrop-blur-sm"
                onClick={() => handlePlatformClick(platform)}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  {/* Logo da Plataforma */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${platform.bgColor} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      <Image
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        style={{ willChange: 'transform' }}
                      />
                    </div>
                    {/* Efeito de brilho */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}></div>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {platform.name}
                  </h3>

                  {/* Descrição */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                    {platform.description}
                  </p>

                  {/* Ícone de ação */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-8 h-8 mx-auto bg-gradient-to-br ${platform.color} rounded-full flex items-center justify-center`}>
                      <PlatformIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardContent>

                {/* Borda gradiente no hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
              </Card>
            )
          })}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Resposta em até 2 horas</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Consultoria gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
