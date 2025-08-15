"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DynamicOrderForm from "@/components/dynamic-order-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"

export default function SitesPage() {
  const [showForm, setShowForm] = useState(false)

  const siteCategory: MainCategory = {
    id: "sites",
    title: "SITES",
    description: "Desenvolvimento web profissional, e-commerce, portfolios e landing pages",
    icon: "Globe",
    href: "/sites",
    color: "#10B981",
    bgColor: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    active: true,
    order: 2,
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
    return <DynamicOrderForm category={siteCategory} onBack={handleBack} />
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Desenvolvimento de Sites</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Sites profissionais, e-commerce e landing pages com design moderno e funcionalidades avançadas
            </p>
            
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
            >
              🚀 Solicitar Orçamento de Site
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-4">🌐 Tipos de Sites</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• E-commerce Completo</li>
                  <li>• Site Institucional</li>
                  <li>• Landing Page</li>
                  <li>• Portfolio</li>
                  <li>• Blog</li>
                  <li>• Sistema Web</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">⚡ Funcionalidades</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Design Responsivo</li>
                  <li>• SEO Otimizado</li>
                  <li>• Painel Administrativo</li>
                  <li>• Integração com APIs</li>
                  <li>• Sistema de Pagamentos</li>
                  <li>• Analytics Integrado</li>
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
