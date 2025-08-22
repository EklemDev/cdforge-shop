"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap, Target, Shield, TrendingUp, Smartphone, MessageCircle, Instagram, Monitor, Rocket, Star, Crown, Gem, Heart, Eye, Brain, Code, Cpu, Database, Cloud, Lock, Key, Tablet, Laptop, Server, Network, Wifi, Bluetooth, Satellite, Antenna, Signal, Battery, Power, Atom, Dna, Flag, Trophy, Medal, Award, Badge, Scroll, Book, Library, School, University, GraduationCap, Map, Pin, Check, X, Plus, Minus, Star as StarIcon } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"
import Image from "next/image"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"

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
  const [selectedSpecificButton, setSelectedSpecificButton] = useState<string>('')

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

  const handleCategoryClick = useCallback(async (category: MainCategory, specificButton?: string) => {
    if (specificButton) {
      setSelectedSpecificButton(specificButton)
    }
    
    if (category.title.toLowerCase() === 'bots') {
      setShowPlatformSelection(true)
      setSelectedCategory(category)
    } else if (category.title.toLowerCase() === 'design') {
      // Redirecionar para a página de design épica
      window.location.href = '/design'
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
        { text: "🤖 Bots de entretenimento e jogos", icon: "Zap" },
        { text: "💬 Chatbots para atendimento 24/7", icon: "Target" },
        { text: "📊 Bots de análise e relatórios", icon: "Shield" },
        { text: "🛒 Bots de e-commerce e vendas", icon: "TrendingUp" }
      ],
      "sites": [
        { text: "🏢 Sites institucionais profissionais", icon: "Target" },
        { text: "🛒 Lojas virtuais completas", icon: "Shield" },
        { text: "📱 Landing pages conversoras", icon: "TrendingUp" },
        { text: "🎨 Portfólios criativos", icon: "Zap" }
      ],
      "design": [
        { text: "🎨 Identidade visual completa", icon: "Target" },
        { text: "📱 Posts para redes sociais", icon: "Shield" },
        { text: "🖨️ Material impresso premium", icon: "TrendingUp" },
        { text: "🎯 Banners e anúncios", icon: "Zap" }
      ],
      "assistência": [
        { text: "📈 Gestão de redes sociais", icon: "Target" },
        { text: "📊 Análise de métricas e relatórios", icon: "TrendingUp" },
        { text: "🔧 Suporte técnico especializado", icon: "Shield" },
        { text: "🚀 Estratégias de crescimento", icon: "Zap" }
      ]
    }
    
    return benefitsMap[categoryTitle.toLowerCase() as keyof typeof benefitsMap] || []
  }, [])

  // Botões específicos por categoria
  const getCategoryButtons = useCallback((categoryTitle: string) => {
    const buttonsMap = {
      "bots": [
        { text: "🤖 Bot de Atendimento", description: "Atendimento automático 24/7" },
        { text: "🎮 Bot de Jogos", description: "Entretenimento e diversão" },
        { text: "📊 Bot de Relatórios", description: "Análises e métricas" },
        { text: "🛒 Bot de Vendas", description: "Automação de vendas" }
      ],
      "sites": [
        { text: "🏢 Site Institucional", description: "Presença profissional online" },
        { text: "🛒 E-commerce", description: "Loja virtual completa" },
        { text: "📱 Landing Page", description: "Conversão otimizada" },
        { text: "🎨 Portfolio", description: "Mostre seu trabalho" }
      ],
      "design": [
        { text: "🎨 Logo & Identidade", description: "Marca profissional" },
        { text: "📱 Posts Sociais", description: "Conteúdo para redes" },
        { text: "🖨️ Material Impresso", description: "Cartões, folders, banners" },
        { text: "🎯 Anúncios", description: "Campanhas publicitárias" }
      ],
      "assistência": [
        { text: "📈 Gestão Social", description: "Administração de redes" },
        { text: "📊 Análise de Dados", description: "Relatórios detalhados" },
        { text: "🔧 Suporte Técnico", description: "Ajuda especializada" },
        { text: "🚀 Consultoria", description: "Estratégias personalizadas" }
      ]
    }
    
    return buttonsMap[categoryTitle.toLowerCase() as keyof typeof buttonsMap] || []
  }, [])

  // Configuração de cores por categoria
  const getCategoryColors = (title: string) => {
    switch (title.toLowerCase()) {
      case 'bots':
        return {
          gradient: 'from-blue-500 via-cyan-500 to-blue-600',
          accent: 'blue',
          bg: 'from-blue-900 via-cyan-900 to-blue-800',
          primary: 'blue',
          secondary: 'cyan',
          text: 'blue',
          border: 'blue',
          glow: 'blue'
        }
      case 'sites':
        return {
          gradient: 'from-emerald-500 via-green-500 to-emerald-600',
          accent: 'emerald',
          bg: 'from-emerald-900 via-green-900 to-emerald-800',
          primary: 'emerald',
          secondary: 'green',
          text: 'emerald',
          border: 'emerald',
          glow: 'emerald'
        }
      case 'design':
        return {
          gradient: 'from-purple-500 via-pink-500 to-purple-600',
          accent: 'purple',
          bg: 'from-purple-900 via-pink-900 to-purple-800',
          primary: 'purple',
          secondary: 'pink',
          text: 'purple',
          border: 'purple',
          glow: 'purple'
        }
      case 'assistência':
        return {
          gradient: 'from-orange-500 via-red-500 to-orange-600',
          accent: 'orange',
          bg: 'from-orange-900 via-red-900 to-orange-800',
          primary: 'orange',
          secondary: 'red',
          text: 'orange',
          border: 'orange',
          glow: 'orange'
        }
      default:
        return {
          gradient: 'from-blue-500 via-purple-500 to-cyan-500',
          accent: 'blue',
          bg: 'from-gray-900 via-purple-900 to-blue-900',
          primary: 'blue',
          secondary: 'purple',
          text: 'blue',
          border: 'blue',
          glow: 'blue'
        }
    }
  }

  // Otimização: Loading state simplificado
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/15 rounded-lg rotate-45 blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/8 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/20 rounded-lg rotate-12 blur-md animate-spin"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-12 h-12 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 text-sm">Carregando categorias...</p>
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
        logo: '/instagram.png'
      },
      { 
        id: 'web', 
        name: 'Web', 
        description: 'Web Scraping e automação web',
        logo: '/codeforge-logo.png'
      }
    ]

    return (
      <section className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col justify-center overflow-hidden transition-all duration-1000`}>
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-32 h-32 bg-${colors.primary}-500/10 rounded-full blur-xl animate-pulse`}></div>
          <div className={`absolute top-40 right-20 w-24 h-24 bg-${colors.secondary}-500/15 rounded-lg rotate-45 blur-lg animate-bounce`}></div>
          <div className={`absolute bottom-20 left-1/4 w-40 h-40 bg-${colors.primary}-500/8 rounded-full blur-2xl animate-pulse`}></div>
          <div className={`absolute top-1/2 right-10 w-16 h-16 bg-${colors.secondary}-500/20 rounded-lg rotate-12 blur-md animate-spin`}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={handleBackToCategories}
              className={`inline-flex items-center gap-2 text-${colors.primary}-400 hover:text-${colors.primary}-300 mb-4 transition-colors cursor-pointer`}
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar às categorias
            </button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Escolha a{" "}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${colors.primary}-400 via-${colors.secondary}-400 to-${colors.primary}-400 animate-gradient-x`}>
                Plataforma
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
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
                  className={`relative overflow-hidden border-0 shadow-xl bg-white/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border border-${colors.primary}-400/30`}
                  onClick={() => handlePlatformSelect(platform.id)}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mb-6 shadow-sm border border-white/20">
                        <Image
                          src={platform.logo}
                          alt={`${platform.name} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                          style={{ willChange: 'transform' }}
                        />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                        {platform.name}
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">
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
              className={`border-${colors.primary}-400/30 text-white/80 hover:bg-${colors.primary}-500/10 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm`}
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
    <section className={`min-h-screen bg-gradient-to-br ${colors.bg} flex flex-col justify-center overflow-hidden transition-all duration-1000`}>
      {/* Geometric Background Elements Épicos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elementos Primários */}
        <div className={`absolute top-20 left-10 w-32 h-32 bg-${colors.primary}-500/10 rounded-full blur-xl animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-24 h-24 bg-${colors.secondary}-500/15 rounded-lg rotate-45 blur-lg animate-bounce`}></div>
        <div className={`absolute bottom-20 left-1/4 w-40 h-40 bg-${colors.primary}-500/8 rounded-full blur-2xl animate-pulse`}></div>
        <div className={`absolute top-1/2 right-10 w-16 h-16 bg-${colors.secondary}-500/20 rounded-lg rotate-12 blur-md animate-spin`}></div>
        
        {/* Elementos Secundários */}
        <div className={`absolute top-1/3 left-1/3 w-20 h-20 bg-${colors.primary}-500/5 rounded-full blur-lg animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-28 h-28 bg-${colors.secondary}-500/8 rounded-lg rotate-90 blur-xl animate-bounce`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-2/3 left-2/3 w-12 h-12 bg-${colors.primary}-500/12 rounded-full blur-md animate-spin`} style={{ animationDelay: '0.5s' }}></div>
        
        {/* Elementos Terciários */}
        <div className={`absolute top-1/4 right-1/4 w-8 h-8 bg-${colors.secondary}-500/6 rounded-full blur-sm animate-ping`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-6 h-6 bg-${colors.primary}-500/4 rounded-full blur-sm animate-ping`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute top-3/4 right-3/4 w-10 h-10 bg-${colors.secondary}-500/7 rounded-lg rotate-30 blur-md animate-pulse`} style={{ animationDelay: '0.8s' }}></div>
        
        {/* Linhas de Energia */}
        <div className={`absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-${colors.primary}-500/20 to-transparent animate-pulse`}></div>
        <div className={`absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-${colors.secondary}-500/20 to-transparent animate-pulse`} style={{ animationDelay: '1s' }}></div>
        
        {/* Partículas Flutuantes */}
        <div className={`absolute top-1/6 left-1/6 w-2 h-2 bg-${colors.primary}-400/30 rounded-full animate-ping`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`absolute top-5/6 right-1/6 w-1.5 h-1.5 bg-${colors.secondary}-400/40 rounded-full animate-ping`} style={{ animationDelay: '0.7s' }}></div>
        <div className={`absolute top-1/2 left-1/6 w-1 h-1 bg-${colors.primary}-300/50 rounded-full animate-ping`} style={{ animationDelay: '1.2s' }}></div>
        <div className={`absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-${colors.secondary}-300/35 rounded-full animate-ping`} style={{ animationDelay: '0.9s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Header Épico com Logo Animada */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Logo CodeForge com Efeitos Épicos */}
          <div className="flex flex-col items-center justify-center mb-8 group">
            <div className="relative mb-6">
              <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary}-500 via-${colors.secondary}-500 to-${colors.primary}-500 rounded-full blur-2xl opacity-60 animate-pulse group-hover:opacity-80 transition-opacity duration-500`}></div>
              <div className={`relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-6 rounded-full shadow-2xl border-2 border-${colors.primary}-400/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out`}>
                <CodeForgeLogoEnhanced size={96} />
              </div>
              {/* Efeito de Brilho Rotativo na Logo */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary}-400/20 to-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
          </div>

          {/* Título Principal com Efeitos Épicos */}
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black relative mb-4">
              {/* Texto com Gradiente Animado */}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${colors.primary}-400 via-${colors.secondary}-400 to-${colors.primary}-400 animate-gradient-x bg-300% font-extrabold tracking-tight`}>
                Escolha seu Serviço
              </span>

              {/* Efeito de Brilho no Texto */}
              <span className={`absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-${colors.primary}-300 via-white via-${colors.secondary}-300 to-${colors.primary}-300 opacity-0 group-hover:opacity-60 animate-shimmer bg-300% font-extrabold tracking-tight transition-opacity duration-700`}>
                Escolha seu Serviço
              </span>

              {/* Sombra Dinâmica */}
              <span className={`absolute inset-0 text-${colors.primary}-400/20 blur-sm font-extrabold tracking-tight transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500`}>
                Escolha seu Serviço
              </span>
            </h1>

            {/* Linha de Energia Embaixo do Título */}
            <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${colors.primary}-500 to-transparent opacity-60 group-hover:opacity-100 group-hover:h-2 transition-all duration-500 rounded-full`}></div>

            {/* Partículas de Energia */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className={`absolute top-2 left-4 w-2 h-2 bg-${colors.primary}-400 rounded-full animate-ping`}></div>
              <div className={`absolute top-8 right-8 w-1 h-1 bg-${colors.secondary}-400 rounded-full animate-pulse`}></div>
              <div className={`absolute bottom-4 left-12 w-1.5 h-1.5 bg-${colors.primary}-400 rounded-full animate-bounce`}></div>
              <div
                className={`absolute top-12 right-4 w-1 h-1 bg-${colors.secondary}-300 rounded-full animate-ping`}
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mt-6">
            Soluções personalizadas para impulsionar seu negócio digital
          </p>
        </div>

        {/* Card Principal Épico - Centralizado verticalmente */}
        <div className="relative category-container flex-1 flex items-center justify-center">
          <Card className={`relative overflow-hidden border-0 shadow-2xl bg-white/5 backdrop-blur-2xl category-card category-fade-in border-2 border-${colors.primary}-400/40 hover:border-${colors.primary}-400/60 transition-all duration-500 hover:scale-105`}>
            {/* Background Gradiente Épico */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20`} />
            
            {/* Efeito de Brilho Interno */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary}-500/10 to-transparent animate-shimmer`}></div>
            
            {/* Bordas Brilhantes */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${colors.primary}-500/20 via-${colors.secondary}-500/20 to-${colors.primary}-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500`}></div>
            
            <CardContent className="relative z-10 p-6 sm:p-8 lg:p-10">
              {/* Cabeçalho da Categoria - Reduzido espaçamento */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-${colors.primary}-500/30 to-${colors.secondary}-500/20 rounded-3xl mb-6 shadow-2xl border-2 border-${colors.primary}-400/50 hover:border-${colors.primary}-400/80 transition-all duration-500 hover:scale-110 hover:rotate-12 group`}>
                  <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 text-${colors.primary}-200 group-hover:text-white transition-all duration-500`} />
                  
                  {/* Efeito de Brilho no Ícone */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary}-400/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer`}></div>
                  
                  {/* Partículas ao redor do ícone */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className={`absolute -top-1 -left-1 w-2 h-2 bg-${colors.primary}-400 rounded-full animate-ping`}></div>
                    <div className={`absolute -top-1 -right-1 w-2 h-2 bg-${colors.secondary}-400 rounded-full animate-ping`} style={{ animationDelay: '0.3s' }}></div>
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-${colors.primary}-400 rounded-full animate-ping`} style={{ animationDelay: '0.6s' }}></div>
                    <div className={`absolute -bottom-1 -right-1 w-2 h-2 bg-${colors.secondary}-400 rounded-full animate-ping`} style={{ animationDelay: '0.9s' }}></div>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {currentCategory.title}
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  {currentCategory.description}
                </p>
              </div>

              {/* Lista de Benefícios Épicos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => {
                  const BenefitIcon = (benefitIcons as any)[benefit.icon]
                  return (
                    <div
                      key={index}
                      className={`group flex items-start gap-4 p-6 bg-gradient-to-r from-${colors.primary}-500/15 to-${colors.secondary}-500/8 rounded-2xl border-2 border-${colors.primary}-400/30 hover:border-${colors.primary}-400/60 hover:shadow-2xl transition-all duration-300 benefit-item cursor-pointer hover:scale-105 backdrop-blur-xl hover:bg-gradient-to-r hover:from-${colors.primary}-500/20 hover:to-${colors.secondary}-500/12`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-${colors.primary}-500/30 to-${colors.secondary}-500/20 rounded-xl flex items-center justify-center border-2 border-${colors.primary}-400/40 group-hover:border-${colors.primary}-400/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        <BenefitIcon className={`w-6 h-6 text-${colors.primary}-200 group-hover:text-white transition-all duration-300`} />
                        
                        {/* Efeito de Brilho no Ícone */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary}-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium group-hover:text-white transition-all duration-300">
                          {benefit.text}
                        </p>
                        
                        {/* Linha de Energia */}
                        <div className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 mt-2 transition-all duration-500 rounded-full`}></div>
                      </div>
                      
                      {/* Partículas de Energia */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute top-2 right-2 w-1 h-1 bg-${colors.primary}-400 rounded-full animate-ping`}></div>
                        <div className={`absolute bottom-2 left-2 w-1 h-1 bg-${colors.secondary}-400 rounded-full animate-ping`} style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Botões Específicos Épicos da Categoria */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400`}>
                    🎯 Opções Específicas para {currentCategory.title}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getCategoryButtons(currentCategory.title).map((button, index) => (
                    <div
                      key={index}
                      className={`group relative p-6 bg-gradient-to-r from-${colors.primary}-500/15 to-${colors.secondary}-500/8 rounded-2xl border-2 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-xl ${
                        selectedSpecificButton === button.text 
                          ? `border-${colors.primary}-400 bg-${colors.primary}-500/25 shadow-2xl` 
                          : `border-${colors.primary}-400/30 hover:border-${colors.primary}-400/70 hover:shadow-2xl hover:bg-gradient-to-r hover:from-${colors.primary}-500/20 hover:to-${colors.secondary}-500/12`
                      }`}
                      onClick={() => handleCategoryClick(currentCategory, button.text)}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {/* Efeito de Brilho Interno */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colors.primary}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer rounded-2xl`}></div>
                      
                      <div className="relative z-10 text-center">
                        <h4 className="font-bold text-white mb-2 group-hover:text-white transition-colors text-lg">
                          {button.text}
                        </h4>
                        <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors">
                          {button.description}
                        </p>
                        
                        {/* Linha de Energia */}
                        <div className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-${colors.primary}-400 to-${colors.secondary}-400 mt-3 transition-all duration-500 rounded-full`}></div>
                      </div>
                      
                      {/* Partículas de Energia */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute top-3 right-3 w-1.5 h-1.5 bg-${colors.primary}-400 rounded-full animate-ping`}></div>
                        <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 bg-${colors.secondary}-400 rounded-full animate-ping`} style={{ animationDelay: '0.3s' }}></div>
                        <div className={`absolute top-3 left-3 w-1 h-1 bg-${colors.primary}-300 rounded-full animate-ping`} style={{ animationDelay: '0.6s' }}></div>
                        <div className={`absolute bottom-3 right-3 w-1 h-1 bg-${colors.secondary}-300 rounded-full animate-ping`} style={{ animationDelay: '0.9s' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão Principal */}
              <div className="text-center">
                {selectedSpecificButton && (
                  <div className={`mb-4 p-3 bg-${colors.primary}-500/20 border border-${colors.primary}-400/30 rounded-lg backdrop-blur-sm`}>
                    <p className="text-sm text-white font-medium">
                      🎯 Opção selecionada: <span className="font-semibold">{selectedSpecificButton}</span>
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => handleCategoryClick(currentCategory)}
                  disabled={isPreloading}
                  className={`relative overflow-hidden bg-gradient-to-r ${colors.gradient} hover:shadow-2xl text-white px-10 py-6 text-xl font-bold rounded-3xl transition-all duration-500 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed category-button border-2 border-white/20 hover:border-white/40`}
                >
                  {/* Efeito de Brilho Interno */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shimmer`}></div>
                  
                  {/* Partículas de Energia */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping`}></div>
                    <div className={`absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-ping`} style={{ animationDelay: '0.4s' }}></div>
                    <div className={`absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping`} style={{ animationDelay: '0.6s' }}></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center">
                    {isPreloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        <span className="text-lg">Otimizando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
                        <span className="text-lg font-bold">
                          {selectedSpecificButton ? `Começar ${selectedSpecificButton.split(' ')[0]}` : 'Começar Agora'}
                        </span>
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navegação Épica */}
        <div className="flex flex-col items-center gap-4 mt-8 sm:mt-10">
          {/* Indicadores Épicos */}
          <div className="flex items-center gap-3">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                disabled={isNavigating}
                className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 navigation-indicator cursor-pointer ${
                  index === currentIndex 
                    ? `bg-${colors.primary}-400 active shadow-lg shadow-${colors.primary}-400/50` 
                    : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ touchAction: 'manipulation' }}
              >
                {/* Efeito de Brilho no Indicador Ativo */}
                {index === currentIndex && (
                  <div className={`absolute inset-0 bg-${colors.primary}-400 rounded-full animate-ping opacity-75`}></div>
                )}
              </button>
            ))}
          </div>

          {/* Botões de Navegação Épicos */}
          <div className="flex items-center gap-4">
            <Button
              onClick={prevSlide}
              variant="ghost"
              size="sm"
              disabled={isNavigating}
              className={`w-12 h-12 rounded-full bg-${colors.primary}-500/15 backdrop-blur-xl hover:bg-${colors.primary}-500/25 shadow-lg border-2 border-${colors.primary}-400/40 hover:border-${colors.primary}-400/60 disabled:opacity-50 disabled:cursor-not-allowed navigation-control cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-${colors.primary}-400/25`}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>

            <span className="text-base text-white/80 font-semibold px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              {currentIndex + 1} de {categories.length}
            </span>

            <Button
              onClick={nextSlide}
              variant="ghost"
              size="sm"
              disabled={isNavigating}
              className={`w-12 h-12 rounded-full bg-${colors.primary}-500/15 backdrop-blur-xl hover:bg-${colors.primary}-500/25 shadow-lg border-2 border-${colors.primary}-400/40 hover:border-${colors.primary}-400/60 disabled:opacity-50 disabled:cursor-not-allowed navigation-control cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-${colors.primary}-400/25`}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Informações Adicionais Épicas */}
        <div className="mt-10 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-base text-white/80">
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className={`w-2 h-2 bg-${colors.secondary}-400 rounded-full animate-pulse group-hover:animate-ping`}></div>
              <span className="font-semibold">+100 projetos entregues</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className={`w-2 h-2 bg-${colors.primary}-400 rounded-full animate-pulse group-hover:animate-ping`}></div>
                              <span className="font-semibold">100% de satisfação</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className={`w-2 h-2 bg-${colors.secondary}-400 rounded-full animate-pulse group-hover:animate-ping`}></div>
              <span className="font-semibold">Suporte 24/7</span>
            </div>
          </div>
          
          {/* Linha de Energia */}
          <div className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-${colors.primary}-400 via-${colors.secondary}-400 to-${colors.primary}-400 mt-6 transition-all duration-1000 rounded-full mx-auto max-w-md`}></div>
        </div>
      </div>
    </section>
  )
}
