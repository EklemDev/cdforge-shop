"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CategoryOrderForm from "@/components/category-order-form"
import NavigationBar from "@/components/navigation-bar"
import FooterComponent from "@/components/footer-component"
import LoadingScreen from "@/components/loading-screen"
import { categories } from "@/lib/categories-data"

export default function BotsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const botsCategory = categories.find(cat => cat.id === 'bots')

  useEffect(() => {
    // Simular loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!botsCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white">
        <p className="text-xl">Categoria de Bots não encontrada.</p>
      </div>
    )
  }

  // Converter Category para MainCategory (formato esperado pelo CategoryOrderForm)
  const mainCategory = {
    id: botsCategory.id,
    title: botsCategory.title,
    description: botsCategory.description,
    icon: botsCategory.icon,
    services: botsCategory.services
  }

  const handleBack = () => {
    // Voltar para a página de categorias
    window.location.href = '/categorias'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/15 rounded-lg rotate-45 blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300/8 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-blue-500/20 rounded-lg rotate-12 blur-md animate-spin"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-blue-400/12 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-blue-300/10 rounded-lg rotate-30 blur-xl animate-bounce" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <NavigationBar />
      
      <main className="relative z-10 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <CategoryOrderForm 
            category={mainCategory}
            onBack={handleBack}
          />
        </motion.div>
      </main>
      
      <FooterComponent />
    </div>
  )
}
