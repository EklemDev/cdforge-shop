"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings, ChevronLeft, ChevronRight, Sparkles, Zap, Star, ArrowRight } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"

// Mapa de ícones memoizado para evitar recriações
const iconMap = useMemo(() => ({
  Bot,
  Globe,
  Palette,
  Settings,
} as const), [])

interface DynamicCategoryCarouselProps {
  onCategorySelect: (category: MainCategory) => void
}

export default function DynamicCategoryCarousel({ onCategorySelect }: DynamicCategoryCarouselProps) {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null)

  // Otimização: Carregamento de dados com memoização
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
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }, [categories.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }, [categories.length])

  const handleCategoryClick = useCallback((category: MainCategory) => {
    setSelectedCategory(category)
    
    // Feedback visual imediato sem delay
    onCategorySelect(category)
  }, [onCategorySelect])

  // Otimização: Benefícios memoizados
  const getCategoryBenefits = useCallback((categoryTitle: string) => {
    const benefitsMap = {
      "bots": [
        "🚀 Automatize 80% das tarefas repetitivas",
        "💰 Reduza custos operacionais em até 60%",
        "⚡ Atenda clientes 24/7 sem interrupções",
        "📈 Aumente conversões com atendimento instantâneo"
      ],
      "sites": [
        "🎯 Sites que convertem visitantes em clientes",
        "📱 Perfeitos em todos os dispositivos",
        "🔍 Otimizados para aparecer no Google",
        "⚡ Carregamento ultra-rápido e seguro"
      ],
      "design": [
        "🎨 Identidade visual que marca presença",
        "💎 Design premium que inspira confiança",
        "📱 Material pronto para todas as redes",
        "✨ Experiência visual memorável"
      ],
      "assistência": [
        "🎯 Estratégias que geram resultados reais",
        "📊 Análises detalhadas do seu Instagram",
        "🛠️ Suporte técnico especializado",
        "📈 Crescimento orgânico e sustentável"
      ]
    }
    
    return benefitsMap[categoryTitle.toLowerCase() as keyof typeof benefitsMap] || []
  }, [])

  // Otimização: Loading state simplificado
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando categorias...</p>
        </div>
      </div>
    )
  }

  const currentCategory = categories[currentIndex]
  if (!currentCategory) return null

  const IconComponent = (iconMap as any)[currentCategory.icon] || Bot
  const benefits = getCategoryBenefits(currentCategory.title)

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Otimizado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Escolha seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Serviço
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções personalizadas para impulsionar seu negócio digital
          </p>
        </div>

        {/* Carousel Otimizado */}
        <div className="relative max-w-6xl mx-auto carousel-container">
          {/* Botões de Navegação Otimizados */}
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30">
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="lg"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 group cursor-pointer navigation-button"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-600 transition-colors duration-200" />
            </Button>
          </div>
          
          <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30">
            <Button
              onClick={nextSlide}
              variant="ghost"
              size="lg"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 group cursor-pointer navigation-button"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-blue-600 transition-colors duration-200" />
            </Button>
          </div>

          {/* Container do Carousel */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden carousel-wrapper">
            <Card
              className="relative w-full h-full border-0 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl carousel-item"
              onClick={() => handleCategoryClick(currentCategory)}
            >
              {/* Background Gradiente Otimizado */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${
                  currentCategory.title === 'BOTS' ? 'from-blue-500 via-cyan-500 to-blue-600' :
                  currentCategory.title === 'SITES' ? 'from-green-500 via-emerald-500 to-green-600' :
                  currentCategory.title === 'DESIGN' ? 'from-purple-500 via-pink-500 to-purple-600' :
                  'from-orange-500 via-red-500 to-orange-600'
                }`}
              />

              {/* Conteúdo Principal */}
              <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-8">
                {/* Ícone e Título */}
                <div className="mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto">
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    {currentCategory.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Benefícios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-4xl w-full">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-left"
                      style={{ 
                        willChange: 'opacity',
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm sm:text-base font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Botão de Ação */}
                <Button
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-200 hover:scale-105 navigation-button"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Indicadores de Navegação */}
          <div className="flex justify-center mt-8 gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ touchAction: 'manipulation' }}
              />
            ))}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>+100 projetos entregues</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>98% de satisfação</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
