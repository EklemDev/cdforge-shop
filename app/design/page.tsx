"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DynamicOrderForm from "@/components/dynamic-order-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"

export default function DesignPage() {
  const [showForm, setShowForm] = useState(false)

  const designCategory: MainCategory = {
    id: "design",
    title: "DESIGN",
    description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
    icon: "Palette",
    href: "/design",
    color: "#8B5CF6",
    bgColor: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    active: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const handleBack = () => {
    if (showForm) {
      setShowForm(false)
    } else {
      window.history.back()
    }
  }

  if (showForm) {
    return <DynamicOrderForm category={designCategory} onBack={handleBack} />
  }

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
                onClick={handleBack}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Sair
              </Button>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Design e Identidade Visual</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Criação de identidade visual completa, logos profissionais e materiais gráficos para sua marca
            </p>
            
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              🚀 Solicitar Orçamento de Design
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">🎨 Serviços de Design</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Logo e Identidade Visual</li>
                  <li>• Design para Redes Sociais</li>
                  <li>• UI/UX Design</li>
                  <li>• Material de Marketing</li>
                  <li>• Design de Aplicativos</li>
                  <li>• Ilustrações Personalizadas</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">✨ Entregáveis</h3>
                <ul className="space-y-2 text-pink-800">
                  <li>• Logo em múltiplos formatos</li>
                  <li>• Manual da marca</li>
                  <li>• Templates reutilizáveis</li>
                  <li>• Arquivos editáveis</li>
                  <li>• Guia de cores e tipografia</li>
                  <li>• Suporte pós-entrega</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
