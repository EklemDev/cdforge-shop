"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Bot, 
  Palette, 
  Zap, 
  FileText,
  Settings,
  X,
  Eye,
  Sparkles,
  Cpu,
  Terminal,
  Smartphone
} from "lucide-react"

interface GeneralDemoProps {
  formData: {
    projectType: "bot" | "site"
    category: string
    description: string
    platform: string
    features: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function GeneralDemo({ formData, isOpen, onClose }: GeneralDemoProps) {
  if (!isOpen) return null

  const getProjectIcon = () => {
    return formData.projectType === "bot" ? Bot : Globe
  }

  const getProjectTitle = () => {
    if (formData.projectType === "bot") {
      return "Bot Personalizado"
    } else {
      return "Site Personalizado"
    }
  }

  const getProjectDescription = () => {
    if (formData.projectType === "bot") {
      return "Bot inteligente desenvolvido sob medida para suas necessidades"
    } else {
      return "Site profissional e responsivo desenvolvido para sua marca"
    }
  }

  const generateMockFeatures = () => {
    const features = formData.features.split(',').map(f => f.trim()).filter(f => f)
    if (features.length > 0) {
      return features
    }
    
    return formData.projectType === "bot" 
      ? ["Comandos personalizados", "Banco de dados", "Sistema de logs", "Logs detalhados"]
: ["Design responsivo", "SEO otimizado", "Sistema de gestão", "Formulários"]
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Demonstração do Projeto</h2>
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

          {/* Header do Projeto Demo */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {React.createElement(getProjectIcon(), { className: "w-8 h-8" })}
                <div>
                  <h1 className="text-2xl font-bold">
                    {getProjectTitle()}
                  </h1>
                  <p className="text-indigo-100">{getProjectDescription()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm">Responsivo</span>
              </div>
            </div>
          </div>

          {/* Categoria */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Categoria
            </h3>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {formData.category}
            </Badge>
          </div>

          {/* Seção Principal */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Descrição do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {formData.description || "Projeto personalizado desenvolvido com base nas suas necessidades específicas..."}
                </p>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm text-indigo-800">
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
                  {generateMockFeatures().slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                  {generateMockFeatures().length > 6 && (
                    <p className="text-sm text-gray-500 mt-2">
                      +{generateMockFeatures().length - 6} outras funcionalidades
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tecnologias */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Tecnologias Utilizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.projectType === "bot" ? (
                  <>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">Discord.js</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                    <Badge variant="outline">Express</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Next.js</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer da Demo */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              Esta é uma visualização baseada nas suas especificações. O projeto final será desenvolvido com todos os detalhes e funcionalidades solicitadas.
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
