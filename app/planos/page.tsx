"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import FreeRecommendations from "@/components/free-recommendations"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start mb-8">
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
        </div>
        <FreeRecommendations />
      </main>
      <Footer />
    </div>
  )
}
