"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"
import DynamicOrderForm from "./dynamic-order-form"
import DynamicCategoryCarousel from "./dynamic-category-carousel"

// Mapa de ícones memoizado
const iconMap = useMemo(() => ({
  Bot,
  Globe,
  Palette,
  Settings,
} as const), [])

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando categorias...</p>
          </div>
        </div>
      )
    }

    return <DynamicCategoryCarousel onCategorySelect={handleCategorySelect} />
  }, [selectedCategory, loading, handleCategorySelect, handleBack])

  return renderContent
}
