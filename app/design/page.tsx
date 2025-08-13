"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import DesignCategories from "@/components/design-categories"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-start mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossos Designs</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Criação de identidade visual e materiais gráficos profissionais para sua marca
            </p>
          </div>

          <DesignCategories />
        </div>
      </main>
      <Footer />
    </div>
  )
}
