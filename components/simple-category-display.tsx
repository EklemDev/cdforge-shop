"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"
import DynamicOrderForm from "./dynamic-order-form"
import DynamicCategoryCarousel from "./dynamic-category-carousel"

// Mapa de ícones estático
const iconMap = {
  Bot,
  Globe,
  Palette,
  Settings,
} as const

export default function SimpleCategoryDisplay() {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null)

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

  // Otimização: Callbacks memoizados
  const handleCategorySelect = useCallback((category: MainCategory) => {
    setSelectedCategory(category)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  // Otimização: Renderização condicional memoizada
  const renderContent = useMemo(() => {
    if (selectedCategory) {
      return <DynamicOrderForm category={selectedCategory} onBack={handleBack} />
    }

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
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/80">Carregando categorias...</p>
          </div>
        </div>
      )
    }

    return <DynamicCategoryCarousel onCategorySelect={handleCategorySelect} />
  }, [selectedCategory, loading, handleCategorySelect, handleBack])

  return renderContent
}
