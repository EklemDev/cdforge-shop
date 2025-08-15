"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings, ChevronLeft, ChevronRight, Sparkles, Zap, Star, ArrowRight } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"

const iconMap: { [key: string]: any } = {
  Bot,
  Globe,
  Palette,
  Settings,
}

interface DynamicCategoryCarouselProps {
  onCategorySelect: (category: MainCategory) => void
}

export default function DynamicCategoryCarousel({ onCategorySelect }: DynamicCategoryCarouselProps) {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const firebaseService = FirebaseDataService.getInstance()
        const data = await firebaseService.getMainCategories()
        setCategories(data.filter(cat => cat.active))
        setLoading(false)
      } catch (error) {
        console.error('Erro:', error)
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length
    )
  }

  const handleCategoryClick = (category: MainCategory) => {
    setSelectedCategory(category)
    
    // Animate the selection with enhanced feedback
    setTimeout(() => {
      onCategorySelect(category)
    }, 800)
  }

  const getCategoryBenefits = (categoryTitle: string) => {
    switch (categoryTitle.toLowerCase()) {
      case "bots":
        return [
          "🚀 Automatize 80% das tarefas repetitivas",
          "💰 Reduza custos operacionais em até 60%",
          "⚡ Atenda clientes 24/7 sem interrupções",
          "📈 Aumente conversões com atendimento instantâneo"
        ]
      case "sites":
        return [
          "🎯 Sites que convertem visitantes em clientes",
          "📱 Perfeitos em todos os dispositivos",
          "🔍 Otimizados para aparecer no Google",
          "⚡ Carregamento ultra-rápido e seguro"
        ]
      case "design":
        return [
          "🎨 Identidade visual que marca presença",
          "💎 Design premium que inspira confiança",
          "📱 Material pronto para todas as redes",
          "✨ Experiência visual memorável"
        ]
      case "assistência":
        return [
          "🎯 Estratégias que geram resultados reais",
          "📊 Análises detalhadas do seu Instagram",
          "🛠️ Suporte técnico especializado",
          "📈 Crescimento orgânico e sustentável"
        ]
      default:
        return []
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-xl font-semibold text-gray-700"
          >
            Preparando sua experiência personalizada...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-8 blur-lg"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Enhanced Header with compelling copy */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4" />
            Transforme sua ideia em realidade
            <Star className="w-4 h-4" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Qual solução você precisa?
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Escolha a categoria que melhor se alinha com seus objetivos e deixe-nos transformar sua visão em resultados extraordinários
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 text-sm text-gray-500"
          >
                         <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span>+0 projetos entregues</span>
             </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                         <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
               <span>0% de satisfação</span>
             </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Suporte 24/7</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Category Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
          >
                         <Button
               onClick={prevSlide}
               variant="ghost"
               size="lg"
               className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0 group cursor-pointer"
             >
               <ChevronLeft className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
             </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
          >
                         <Button
               onClick={nextSlide}
               variant="ghost"
               size="lg"
               className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0 group cursor-pointer"
             >
               <ChevronRight className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
             </Button>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative h-[700px] overflow-hidden pointer-events-none">
            <AnimatePresence mode="wait">
              {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || Bot
                const isActive = index === currentIndex
                const benefits = getCategoryBenefits(category.title)
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ 
                      scale: 0.8, 
                      opacity: 0,
                      x: index > currentIndex ? 400 : -400
                    }}
                    animate={{ 
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.2,
                      x: 0
                    }}
                    exit={{ 
                      scale: 0.8, 
                      opacity: 0,
                      x: index > currentIndex ? 400 : -400
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      isActive ? 'z-10' : 'z-0'
                    }`}
                  >
                    <Card
                      className={`relative group cursor-pointer transition-all duration-700 pointer-events-auto ${
                        isActive 
                          ? 'w-full max-w-4xl h-[600px] shadow-2xl' 
                          : 'w-96 h-[450px] shadow-lg'
                      } border-0 overflow-hidden`}
                      onClick={() => isActive && handleCategoryClick(category)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      {/* Enhanced animated background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${
                          category.title === 'BOTS' ? 'from-blue-500 via-cyan-500 to-blue-600' :
                          category.title === 'SITES' ? 'from-green-500 via-emerald-500 to-green-600' :
                          category.title === 'DESIGN' ? 'from-purple-500 via-pink-500 to-purple-600' :
                          'from-orange-500 via-red-500 to-orange-600'
                        } opacity-95`}
                      />
                      
                      {/* Enhanced shimmer effect */}
                      <motion.div
                        animate={{
                          x: [-200, 400],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />

                      {/* Floating particles effect */}
                      {isActive && (
                        <div className="absolute inset-0 overflow-hidden">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                y: [0, -20, 0],
                                x: [0, 10, 0],
                                opacity: [0.3, 0.8, 0.3],
                              }}
                              transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                              }}
                              className="absolute w-2 h-2 bg-white/60 rounded-full"
                              style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <CardContent className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center text-white">
                        {/* Enhanced Icon */}
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          className={`w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 ${
                            isActive ? 'shadow-2xl' : 'shadow-lg'
                          } border-2 border-white/30`}
                        >
                          <IconComponent className="w-14 h-14" />
                        </motion.div>

                        {/* Enhanced Title */}
                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className={`font-bold mb-6 ${
                            isActive ? 'text-5xl' : 'text-3xl'
                          }`}
                        >
                          {category.title}
                        </motion.h2>

                        {/* Enhanced Description */}
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className={`mb-8 leading-relaxed ${
                            isActive ? 'text-xl' : 'text-base'
                          }`}
                        >
                          {category.description}
                        </motion.p>

                        {/* Benefits List - Only show for active card */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-8"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                              {benefits.map((benefit, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + idx * 0.1 }}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <span className="text-lg">{benefit.split(' ')[0]}</span>
                                  <span>{benefit.split(' ').slice(1).join(' ')}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Enhanced CTA Button */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1, type: "spring", stiffness: 200 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                                                             <Button
                                 size="lg"
                                 className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/40 hover:border-white/60 px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl group cursor-pointer"
                               >
                                 <Sparkles className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                                 Começar Agora
                                 <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                               </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

                     {/* Enhanced Dots indicator */}
           <div className="flex justify-center mt-12 space-x-4">
             {categories.map((_, index) => (
               <motion.button
                 key={index}
                 onClick={() => setCurrentIndex(index)}
                 className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                   index === currentIndex 
                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg' 
                     : 'bg-gray-300 hover:bg-gray-400'
                 }`}
                 whileHover={{ scale: 1.3 }}
                 whileTap={{ scale: 0.8 }}
               />
             ))}
           </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm mb-4">Já confiaram em nós:</p>
            <div className="flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-xs">Entrega rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="text-xs">Qualidade garantida</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">Suporte premium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
