"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Zap, 
  Users, 
  ShoppingCart,
  FileText,
  Building,
  X,
  Eye,
  Sparkles,
  Loader2,
  Brain
} from "lucide-react"

interface SiteDemoProps {
  formData: {
    type: string
    description: string
    features: string[]
    designStyle: string
    pages: string
    targetAudience: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function SiteDemo({ formData, isOpen, onClose }: SiteDemoProps) {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (isOpen && formData.description && !generatedContent) {
      generateContent()
    }
  }, [isOpen, formData.description])

  const generateContent = async () => {
    if (!formData.description) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/deepseek/automate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'content_generation',
          prompt: `Gere um conteúdo breve e atrativo para a seção principal de um site baseado na seguinte descrição do cliente:

DESCRIÇÃO DO CLIENTE: "${formData.description}"

TIPO DE SITE: ${formData.type}
PÚBLICO-ALVO: ${formData.targetAudience || "Não especificado"}
ESTILO: ${formData.designStyle}

Gere um texto de 2-3 parágrafos que seja:
- Atrativo e profissional
- Focado no tipo de site
- Adaptado ao público-alvo
- Em português brasileiro
- Pronto para usar no site`,
          maxTokens: 300,
          temperature: 0.7
        }),
      })

      const result = await response.json()
      if (result.success) {
        setGeneratedContent(result.data)
      }
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (!isOpen) return null

  const getSiteTypeIcon = (type: string) => {
    const icons = {
      ecommerce: ShoppingCart,
      portfolio: FileText,
      landing: Zap,
      blog: FileText,
      corporativo: Building,
      personalizado: Globe
    }
    return icons[type as keyof typeof icons] || Globe
  }

  const getDesignStyleColor = (style: string) => {
    const colors = {
      moderno: "bg-blue-500",
      classico: "bg-gray-500",
      criativo: "bg-purple-500",
      corporativo: "bg-slate-500",
      elegante: "bg-rose-500"
    }
    return colors[style as keyof typeof colors] || "bg-blue-500"
  }

  const generateMockContent = () => {
    const type = formData.type
    const descriptions = {
      ecommerce: "Loja virtual completa com produtos, carrinho de compras e pagamentos seguros",
      portfolio: "Galeria de trabalhos e projetos com design profissional",
      landing: "Página otimizada para conversão e captura de leads",
      blog: "Plataforma de conteúdo com artigos e notícias",
      corporativo: "Site institucional com informações da empresa e serviços",
      personalizado: "Solução única desenvolvida sob medida"
    }
    return descriptions[type as keyof typeof descriptions] || "Site personalizado"
  }

  const generateMockPages = () => {
    const pages = formData.pages ? parseInt(formData.pages) : 5
    const basePages = ["Home", "Sobre", "Contato"]
    const typePages = {
      ecommerce: ["Produtos", "Carrinho", "Checkout", "Minha Conta"],
      portfolio: ["Trabalhos", "Serviços", "Depoimentos"],
      landing: ["Benefícios", "Depoimentos", "CTA"],
      blog: ["Blog", "Categorias", "Autor"],
      corporativo: ["Serviços", "Equipe", "Blog"],
      personalizado: ["Recursos", "Soluções"]
    }
    
    const typeSpecificPages = typePages[formData.type as keyof typeof typePages] || []
    return [...basePages, ...typeSpecificPages].slice(0, pages)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Demonstração do Site</h2>
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

          {/* Header do Site Demo */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {React.createElement(getSiteTypeIcon(formData.type), { className: "w-8 h-8" })}
                <div>
                  <h1 className="text-2xl font-bold">
                    {formData.type === 'ecommerce' && 'Minha Loja'}
                    {formData.type === 'portfolio' && 'Meu Portfólio'}
                    {formData.type === 'landing' && 'Landing Page'}
                    {formData.type === 'blog' && 'Meu Blog'}
                    {formData.type === 'corporativo' && 'Nossa Empresa'}
                    {formData.type === 'personalizado' && 'Meu Site'}
                  </h1>
                  <p className="text-blue-100">{generateMockContent()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm">Responsivo</span>
              </div>
            </div>
          </div>

          {/* Navegação */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Navegação
            </h3>
            <div className="flex flex-wrap gap-2">
              {generateMockPages().map((page, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                  {page}
                </Badge>
              ))}
            </div>
          </div>

          {/* Seção Principal */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Conteúdo Principal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Conteúdo Principal
                  {isGenerating && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gerando conteúdo...</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
                      <p className="text-gray-600">Gerando conteúdo personalizado com IA...</p>
                    </div>
                  </div>
                ) : generatedContent ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {generatedContent}
                    </p>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        <span>Conteúdo gerado com IA baseado na sua descrição</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4">
                    {formData.description || "Conteúdo personalizado baseado na sua descrição..."}
                  </p>
                )}
                <div className="bg-blue-50 p-3 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Público-alvo:</strong> {formData.targetAudience || "Definido pelo cliente"}
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

          {/* Design Style */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Estilo de Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${getDesignStyleColor(formData.designStyle)} rounded-lg flex items-center justify-center`}>
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 capitalize">{formData.designStyle}</h4>
                  <p className="text-gray-600">
                    {formData.designStyle === 'moderno' && "Design limpo e minimalista"}
                    {formData.designStyle === 'classico' && "Elegante e profissional"}
                    {formData.designStyle === 'criativo' && "Colorido e inovador"}
                    {formData.designStyle === 'corporativo' && "Sério e confiável"}
                    {formData.designStyle === 'elegante' && "Sofisticado e refinado"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer da Demo */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-xs text-gray-500">
              Esta é uma visualização baseada nas suas especificações. O site final será desenvolvido com todos os detalhes e funcionalidades solicitadas.
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
