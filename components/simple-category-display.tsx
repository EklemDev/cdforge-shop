"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings } from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"
import DynamicOrderForm from "./dynamic-order-form"
import DynamicCategoryCarousel from "./dynamic-category-carousel"

const iconMap: { [key: string]: any } = {
  Bot,
  Globe,
  Palette,
  Settings,
}

export default function SimpleCategoryDisplay() {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | null>(null)

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

  const handleCategorySelect = (category: MainCategory) => {
    setSelectedCategory(category)
  }

  const handleBack = () => {
    setSelectedCategory(null)
  }

  if (selectedCategory) {
    return <DynamicOrderForm category={selectedCategory} onBack={handleBack} />
  }

  // Use the new dynamic carousel instead of the old grid layout
  return <DynamicCategoryCarousel onCategorySelect={handleCategorySelect} />

  // Loading state is now handled by DynamicCategoryCarousel
  return null
}
