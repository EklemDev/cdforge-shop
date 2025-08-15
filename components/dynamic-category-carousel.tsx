"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap, Target, Shield, TrendingUp, Smartphone, MessageCircle, Instagram, Monitor } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"
import Image from "next/image"

// Mapa de ícones estático
const iconMap = {
  Bot,
  Globe,
  Palette,
  Settings,
} as const

// Ícones para benefícios
const benefitIcons = {
  Zap,
  Target,
  Shield,
  TrendingUp,
} as const

// Ícones para plataformas
const platformIcons = {
  whatsapp: MessageCircle,
  discord: Bot,
  instagram: Instagram,
  web: Monitor,
} as const

interface DynamicCategoryCarouselProps {
  onCategorySelect: (category: MainCategory) => void
}

export default function DynamicCategoryCarousel({ onCategorySelect }: DynamicCategoryCarouselProps) {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isPreloading, setIsPreloading] = useState(false)
  const [showPlatformSelection, setShowPlatformSelection] = useState(false)

  // Otimização: Carregamento de dados com cleanup
  useEffect(() => {
    let isMounted = true

    const loadCategories = async () => {
      try {
        const firebaseService = FirebaseDataService.getInstance()
        const data = await firebaseService.getMainCategories()
        
        if (isMounted) {
          setCategories(data.filter(cat => cat.active))
          setLoading(false)
        }
      } catch (error) {
        console.error('Erro:', error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  // Otimização: Callbacks memoizados para evitar re-renders
  const nextSlide = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    setCurrentIndex((prev) => (prev + 1) % categories.length)
    setTimeout(() => setIsNavigating(false), 200)
  }, [categories.length, isNavigating])

  const prevSlide = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
    setTimeout(() => setIsNavigating(false), 200)
  }, [categories.length, isNavigating])

  const handleCategoryClick = useCallback(async (category: MainCategory) => {
    if (category.title.toLowerCase() === 'bots') {
      setShowPlatformSelection(true)
      setSelectedCategory(category)
    } else {
      setIsPreloading(true)
      setSelectedCategory(category)
      
      // Simular otimização real
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setIsPreloading(false)
      onCategorySelect(category)
    }
  }, [onCategorySelect])

  const handlePlatformSelect = useCallback(async (platform: string) => {
    if (!selectedCategory) return
    
    setIsPreloading(true)
    
    // Simular otimização real
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsPreloading(false)
    setShowPlatformSelection(false)
    
    // Criar categoria modificada com a plataforma selecionada
    const categoryWithPlatform = {
      ...selectedCategory,
      title: `${selectedCategory.title} - ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      description: `${selectedCategory.description} para ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
    }
    
    onCategorySelect(categoryWithPlatform)
  }, [selectedCategory, onCategorySelect])

  const handleBackToCategories = useCallback(() => {
    setShowPlatformSelection(false)
    setSelectedCategory(null)
  }, [])

  const handleIndicatorClick = useCallback((index: number) => {
    if (isNavigating || index === currentIndex) return
    setIsNavigating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsNavigating(false), 200)
  }, [currentIndex, isNavigating])

  // Otimização: Benefícios memoizados com ícones
  const getCategoryBenefits = useCallback((categoryTitle: string) => {
    const benefitsMap = {
      "bots": [
        { text: "Automatize 80% das tarefas repetitivas", icon: "Zap" },
        { text: "Reduza custos operacionais em até 60%", icon: "Target" },
        { text: "Atenda clientes 24/7 sem interrupções", icon: "Shield" },
        { text: "Aumente conversões com atendimento instantâneo", icon: "TrendingUp" }
      ],
      "sites": [
        { text: "Sites que convertem visitantes em clientes", icon: "Target" },
        { text: "Perfeitos em todos os dispositivos", icon: "Shield" },
        { text: "Otimizados para aparecer no Google", icon: "TrendingUp" },
        { text: "Carregamento ultra-rápido e seguro", icon: "Zap" }
      ],
      "design": [
        { text: "Identidade visual que marca presença", icon: "Target" },
        { text: "Design premium que inspira confiança", icon: "Shield" },
        { text: "Material pronto para todas as redes", icon: "TrendingUp" },
        { text: "Experiência visual memorável", icon: "Zap" }
      ],
      "assistência": [
        { text: "Estratégias que geram resultados reais", icon: "Target" },
        { text: "Análises detalhadas do seu Instagram", icon: "TrendingUp" },
        { text: "Suporte técnico especializado", icon: "Shield" },
        { text: "Crescimento orgânico e sustentável", icon: "Zap" }
      ]
    }
    
    return benefitsMap[categoryTitle.toLowerCase() as keyof typeof benefitsMap] || []
  }, [])

  // Configuração de cores por categoria
  const getCategoryColors = (title: string) => {
    switch (title.toLowerCase()) {
      case 'bots':
        return {
          gradient: 'from-blue-500 via-cyan-500 to-blue-600',
          accent: 'blue',
          bg: 'from-blue-50 to-cyan-50'
        }
      case 'sites':
        return {
          gradient: 'from-emerald-500 via-green-500 to-emerald-600',
          accent: 'emerald',
          bg: 'from-emerald-50 to-green-50'
        }
      case 'design':
        return {
          gradient: 'from-purple-500 via-pink-500 to-purple-600',
          accent: 'purple',
          bg: 'from-purple-50 to-pink-50'
        }
      default:
        return {
          gradient: 'from-orange-500 via-red-500 to-orange-600',
          accent: 'orange',
          bg: 'from-orange-50 to-red-50'
        }
    }
  }

  // Otimização: Loading state simplificado
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Carregando categorias...</p>
        </div>
      </div>
    )
  }

  // Renderizar seleção de plataforma
  if (showPlatformSelection && selectedCategory) {
    const colors = getCategoryColors(selectedCategory.title)
    const platforms = [
      { 
        id: 'whatsapp', 
        name: 'WhatsApp', 
        description: 'Automação para WhatsApp Business',
        logo: '/whatsapp.png'
      },
      { 
        id: 'discord', 
        name: 'Discord', 
        description: 'Bots para servidores Discord',
        logo: '/discord.png'
      },
      { 
        id: 'instagram', 
        name: 'Instagram', 
        description: 'Automação para Instagram',
        logo: '/logo.png'
      },
      { 
        id: 'web', 
        name: 'Web', 
        description: 'Web Scraping e automação web',
        logo: '/logo.png'
      }
    ]

    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={handleBackToCategories}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar às categorias
            </button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Escolha a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Plataforma
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Para qual plataforma você deseja criar seu bot?
            </p>
          </div>

          {/* Cards de Plataforma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {platforms.map((platform) => {
              const PlatformIcon = (platformIcons as any)[platform.id]
              return (
                <Card
                  key={platform.id}
                  className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handlePlatformSelect(platform.id)}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 shadow-sm">
                        <Image
                          src={platform.logo}
                          alt={`${platform.name} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                          style={{ willChange: 'transform' }}
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {platform.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Botão Principal */}
          <div className="text-center">
            <Button
              onClick={handleBackToCategories}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Voltar às Categorias
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const currentCategory = categories[currentIndex]
  if (!currentCategory) return null

  const IconComponent = (iconMap as any)[currentCategory.icon] || Bot
  const benefits = getCategoryBenefits(currentCategory.title)
  const colors = getCategoryColors(currentCategory.title)

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header Minimalista */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Serviço
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Soluções personalizadas para impulsionar seu negócio digital
          </p>
        </div>

        {/* Card Principal */}
        <div className="relative category-container">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm category-card category-fade-in">
            {/* Background Gradiente Sutil */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5`} />
            
            <CardContent className="relative z-10 p-6 sm:p-8 lg:p-12">
              {/* Cabeçalho da Categoria */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 shadow-sm">
                  <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 text-${colors.accent}-600`} />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {currentCategory.title}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  {currentCategory.description}
                </p>
              </div>

              {/* Lista de Benefícios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = (benefitIcons as any)[benefit.icon]
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 benefit-item"
                    >
                      <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-${colors.accent}-100 to-${colors.accent}-200 rounded-lg flex items-center justify-center`}>
                        <BenefitIcon className={`w-4 h-4 text-${colors.accent}-600`} />
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Botão Principal */}
              <div className="text-center">
                <Button
                  onClick={() => handleCategoryClick(currentCategory)}
                  disabled={isPreloading}
                  className={`relative overflow-hidden bg-gradient-to-r ${colors.gradient} hover:shadow-lg text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed category-button`}
                >
                  {isPreloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Otimizando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Começar Agora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navegação Unificada */}
        <div className="flex flex-col items-center gap-4 mt-8 sm:mt-12">
          {/* Indicadores */}
          <div className="flex items-center gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                disabled={isNavigating}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 navigation-indicator ${
                  index === currentIndex 
                    ? `bg-${colors.accent}-500 active` 
                    : 'bg-gray-300 hover:bg-gray-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ touchAction: 'manipulation' }}
              />
            ))}
          </div>

          {/* Botões de Navegação */}
          <div className="flex items-center gap-3">
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="sm"
              disabled={isNavigating}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed navigation-control"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </Button>

            <span className="text-sm text-gray-500 font-medium">
              {currentIndex + 1} de {categories.length}
            </span>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="sm"
              disabled={isNavigating}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed navigation-control"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>+100 projetos entregues</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>98% de satisfação</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
