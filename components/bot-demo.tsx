"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Shield, 
  Music, 
  Gamepad2,
  Settings,
  Users,
  X,
  Eye,
  Sparkles,
  Cpu,
  Terminal
} from "lucide-react"

interface BotDemoProps {
  formData: {
    types: string[]
    platform: string
    description: string
    features: string[]
  }
  isOpen: boolean
  onClose: () => void
}

export default function BotDemo({ formData, isOpen, onClose }: BotDemoProps) {
  if (!isOpen) return null

  const getBotTypeIcon = (type: string) => {
    const icons = {
      moderation: Shield,
      music: Music,
      games: Gamepad2,
      utility: Settings,
      welcome: Users,
      custom: Bot
    }
    return icons[type as keyof typeof icons] || Bot
  }

  const getPlatformIcon = (platform: string) => {
    const icons = {
      discord: MessageSquare,
      whatsapp: MessageSquare,
      telegram: MessageSquare,
      custom: Terminal
    }
    return icons[platform as keyof typeof icons] || Terminal
  }

  const generateBotDescription = () => {
    if (formData.description) {
      return formData.description
    }
    
    const typeDescriptions = {
      moderation: "Bot de moderação para manter seu servidor seguro e organizado",
      music: "Bot de música para reproduzir suas músicas favoritas",
      games: "Bot de jogos para entretenimento e diversão",
      utility: "Bot utilitário com ferramentas úteis",
      welcome: "Bot de boas-vindas para novos membros",
      custom: "Bot personalizado desenvolvido sob medida"
    }
    
    return formData.types.map(type => typeDescriptions[type as keyof typeof typeDescriptions]).join(". ") || "Bot personalizado"
  }

  const generateMockCommands = () => {
    const commands = {
      moderation: ["!ban", "!kick", "!mute", "!clear", "!warn"],
      music: ["!play", "!skip", "!pause", "!queue", "!volume"],
      games: ["!play", "!stats", "!leaderboard", "!daily", "!challenge"],
      utility: ["!help", "!info", "!ping", "!server", "!user"],
      welcome: ["!welcome", "!rules", "!roles", "!info", "!help"]
    }
    
    return formData.types.flatMap(type => commands[type as keyof typeof commands] || []).slice(0, 8)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Demonstração do Bot</h2>
                <p className="text-gray-600">Visualização prévia baseada nas suas especificações</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Header do Bot Demo */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">
                    {formData.types.length > 0 ? formData.types[0].charAt(0).toUpperCase() + formData.types[0].slice(1) : "Personalizado"} Bot
                  </h1>
                  <p className="text-purple-100">{generateBotDescription()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {React.createElement(getPlatformIcon(formData.platform), { className: "w-5 h-5" })}
                <span className="text-sm capitalize">{formData.platform}</span>
              </div>
            </div>
          </div>

          {/* Tipos de Bot */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Tipos de Bot
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.types.map((type, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {React.createElement(getBotTypeIcon(type), { className: "w-3 h-3" })}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Seção Principal */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Descrição do Bot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {formData.description || "Bot personalizado desenvolvido com base nas suas necessidades específicas..."}
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Plataforma:</strong> {formData.platform.charAt(0).toUpperCase() + formData.platform.slice(1)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Funcionalidades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Funcionalidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formData.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                  {formData.features.length > 6 && (
                    <p className="text-sm text-gray-500 mt-2">
                      +{formData.features.length - 6} outras funcionalidades
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comandos */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comandos Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {generateMockCommands().map((command, index) => (
                  <Badge key={index} variant="outline" className="font-mono text-xs">
                    {command}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                * Comandos podem variar conforme as funcionalidades selecionadas
              </p>
            </CardContent>
          </Card>

          {/* Footer da Demo */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              Esta é uma visualização baseada nas suas especificações. O bot final será desenvolvido com todos os comandos e funcionalidades solicitadas.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Fechar Demo
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Continuar com Solicitação
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
