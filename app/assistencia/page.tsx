"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DynamicOrderForm from "@/components/dynamic-order-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"

export default function AssistenciaPage() {
  const [showForm, setShowForm] = useState(false)

  const assistenciaCategory: MainCategory = {
    id: "assistencia",
    title: "ASSISTÊNCIA",
    description: "Análise de Instagram, consultoria especializada e suporte técnico",
    icon: "Settings",
    href: "/assistencia",
    color: "#06B6D4",
    bgColor: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
    active: true,
    order: 4,
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
    return <DynamicOrderForm category={assistenciaCategory} onBack={handleBack} />
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Assistência e Consultoria</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Suporte técnico especializado, consultoria estratégica e análise de redes sociais
            </p>
            
            <Button
              size="lg"
              onClick={() => setShowForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 text-lg font-semibold"
            >
              🚀 Solicitar Assistência
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-900 mb-4">🔧 Serviços de Assistência</h3>
                <ul className="space-y-2 text-cyan-800">
                  <li>• Análise de Instagram</li>
                  <li>• Consultoria Estratégica</li>
                  <li>• Suporte Técnico 24/7</li>
                  <li>• Treinamento Personalizado</li>
                  <li>• Otimização de Processos</li>
                  <li>• Monitoramento Contínuo</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">📊 Benefícios</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Relatórios Mensais</li>
                  <li>• Automação de Tarefas</li>
                  <li>• Backup e Segurança</li>
                  <li>• Atualizações Regulares</li>
                  <li>• Suporte Prioritário</li>
                  <li>• Resultados Garantidos</li>
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
