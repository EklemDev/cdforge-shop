"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { useServiceRequests } from "@/hooks/useFirebase"

function ServicosContatoContent() {
  const searchParams = useSearchParams()
  const { createServiceRequest } = useServiceRequests()
  const [selectedService, setSelectedService] = useState(() => {
    const service = searchParams.get("service")
    return service || "consultoria"
  })

  const services = [
    {
      id: "consultoria",
      name: "Consultoria de Redes Sociais",
      color: "#F59E0B",
      description: "Estratégias e gestão completa para suas redes sociais"
    },
    {
      id: "whatsapp-consulting",
      name: "Consultoria WhatsApp Business",
      color: "#25D366",
      description: "Otimização do seu atendimento no WhatsApp"
    },
    {
      id: "technical-support",
      name: "Suporte Técnico",
      color: "#3B82F6",
      description: "Suporte especializado para seus sistemas digitais"
    },
    {
      id: "training",
      name: "Treinamento Personalizado",
      color: "#8B5CF6",
      description: "Aprenda a usar e gerenciar seus sistemas"
    },
  ]

  const handleSubmit = async (data: any) => {
    const serviceRequestData = {
      name: data.name,
      phone: data.phone,
      discord: data.discord,
      instagram: data.instagram,
      projectType: 'service' as const,
      projectDetails: {
        serviceType: data.serviceType,
        serviceName: data.serviceName,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline
      }
    }

    await createServiceRequest(serviceRequestData)
  }

  const currentService = services.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Solicitar Serviço</h1>
              <p className="text-xl text-gray-600">Escolha o serviço que você precisa</p>
            </div>

            {/* Service Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Tipo de Serviço</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedService === service.id
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            {currentService && (
              <ContactForm
                serviceType={currentService.id}
                serviceName={currentService.name}
                serviceColor={currentService.color}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ServicosContatoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ServicosContatoContent />
    </Suspense>
  )
}
