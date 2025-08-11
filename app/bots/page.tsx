"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import BotCategories from "@/components/bot-categories"
import BotPlatforms from "@/components/bot-platforms"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BotsPage() {
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
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossos Bots</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automatize seus processos com bots inteligentes e personalizados para diferentes plataformas
            </p>
          </div>

          <BotCategories />
          <BotPlatforms />
        </div>
      </main>
      <Footer />
    </div>
  )
}
