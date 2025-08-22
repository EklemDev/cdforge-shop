"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Category } from "@/lib/categories-data"

interface CategoryCarouselProps {
  categories: Category[]
  currentCategory: number
  onCategoryChange: (index: number) => void
}

export default function CategoryCarousel({ 
  categories, 
  currentCategory, 
  onCategoryChange 
}: CategoryCarouselProps) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAutoPlaying || isMobileExpanded) return

    const interval = setInterval(() => {
      onCategoryChange((currentCategory + 1) % categories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentCategory, isAutoPlaying, isMobileExpanded, categories.length, onCategoryChange])

  const nextCategory = () => {
    setIsMobileExpanded(false) // Reset mobile expansion when navigating
    onCategoryChange((currentCategory + 1) % categories.length)
  }

  const prevCategory = () => {
    setIsMobileExpanded(false) // Reset mobile expansion when navigating
    onCategoryChange(currentCategory === 0 ? categories.length - 1 : currentCategory - 1)
  }

  // Swipe functionality
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextCategory()
    }
    if (isRightSwipe) {
      prevCategory()
    }
  }

  return (
    <div className="relative max-w-6xl mx-auto mb-12">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative overflow-hidden rounded-3xl mb-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
                         <CategoryCard 
               category={categories[currentCategory]} 
               isMobileExpanded={isMobileExpanded}
               setIsMobileExpanded={setIsMobileExpanded}
             />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Reorganized */}
      <div className="flex flex-col items-center gap-4">
        {/* Category Progress Bar with Segments */}
        <div className="flex justify-center w-full max-w-xs mb-2">
          <div className="w-full h-1.5 sm:h-2 flex rounded-full overflow-hidden">
            {categories.map((_, index) => (
              <div
                key={index}
                className={`flex-1 transition-all duration-500 ease-out cursor-pointer hover:bg-white/40 ${
                  index <= currentCategory 
                    ? "bg-white shadow-sm" 
                    : "bg-white/20"
                }`}
                onClick={() => onCategoryChange(index)}
                style={{
                  marginRight: index < categories.length - 1 ? '2px' : '0'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Navigation Buttons - Moved to Bottom */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={prevCategory}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg border border-white/20 active:scale-95"
            aria-label="Categoria anterior"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Category Counter */}
          <div className="text-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 min-w-[120px]">
            <span className="text-white font-semibold text-base sm:text-lg">
              {currentCategory + 1} de {categories.length}
            </span>
          </div>

          <button
            onClick={nextCategory}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg border border-white/20 active:scale-95"
            aria-label="Próxima categoria"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center text-white/60 text-sm sm:hidden">
          <p>Deslize para navegar entre as categorias</p>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ 
  category, 
  isMobileExpanded, 
  setIsMobileExpanded 
}: { 
  category: Category
  isMobileExpanded: boolean
  setIsMobileExpanded: (expanded: boolean) => void
}) {

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.gradient} p-8 shadow-2xl`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-3xl">{category.icon}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-4"
          >
            {category.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            {category.description}
          </motion.p>
        </div>

                 {/* Services Grid - Hidden on mobile when collapsed */}
         <motion.div 
           className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${
             isMobileExpanded ? 'block' : 'hidden md:block'
           }`}
           initial={{ opacity: 0, height: 0 }}
           animate={{ 
             opacity: isMobileExpanded ? 1 : 0, 
             height: isMobileExpanded ? 'auto' : 0 
           }}
           transition={{ duration: 0.3 }}
         >
          {category.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Expand/Collapse Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-6 md:hidden"
        >
                     {!isMobileExpanded && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-white/70 text-sm mb-4"
             >
               <p>Clique em "Ver Mais" para ver todos os serviços disponíveis</p>
             </motion.div>
           )}
           
           <button
             onClick={() => setIsMobileExpanded(!isMobileExpanded)}
             className="bg-white/20 backdrop-blur-lg text-white border border-white/30 hover:bg-white/30 transition-all duration-300 px-6 py-3 text-base font-semibold rounded-xl cursor-pointer flex items-center gap-2 mx-auto"
           >
             <span>{isMobileExpanded ? 'Ver Menos' : 'Ver Mais'}</span>
             <motion.span
               animate={{ rotate: isMobileExpanded ? 180 : 0 }}
               transition={{ duration: 0.3 }}
               className="text-lg"
             >
               ▼
             </motion.span>
           </button>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={() => {
              // Navegar para a página específica da categoria
              const categoryPaths = {
                'bots': '/bots',
                'sites': '/sites', 
                'design': '/design',
                'assistencia': '/servicos'
              }
              const path = categoryPaths[category.id as keyof typeof categoryPaths] || '/categorias'
              window.location.href = path
            }}
            className="bg-white/20 backdrop-blur-lg text-white border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl cursor-pointer"
          >
            <span className="mr-2">⭐</span>
            Começar Agora
            <span className="ml-2">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
