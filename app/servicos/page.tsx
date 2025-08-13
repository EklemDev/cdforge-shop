"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ServiceCategories from "@/components/service-categories"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-start mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Serviços especializados para otimizar e impulsionar sua presença digital
            </p>
          </div>

          <ServiceCategories />
        </div>
      </main>
      <Footer />
    </div>
  )
}
