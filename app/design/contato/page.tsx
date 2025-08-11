"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { useDesignRequests } from "@/hooks/useFirebase"

function DesignContatoContent() {
  const searchParams = useSearchParams()
  const { createDesignRequest } = useDesignRequests()
  const [selectedService, setSelectedService] = useState(() => {
    const service = searchParams.get("service")
    return service || "logo"
  })

  const designServices = [
    {
      id: "logo",
      name: "Logo & Identidade Visual",
      color: "#E91E63",
      description: "Criação de logos únicos e identidade visual completa"
    },
    {
      id: "social-media",
      name: "Design para Redes Sociais",
      color: "#9C27B0",
      description: "Posts, stories, capas e templates personalizados"
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      color: "#673AB7",
      description: "Design de interfaces e experiência do usuário"
    },
    {
      id: "marketing",
      name: "Material de Marketing",
      color: "#3F51B5",
      description: "Banners, flyers, cartões de visita e materiais promocionais"
    },
    {
      id: "app-design",
      name: "Design de Aplicativos",
      color: "#2196F3",
      description: "Interface completa para aplicativos mobile"
    },
    {
      id: "motion",
      name: "Motion Graphics",
      color: "#00BCD4",
      description: "Animações, vídeos promocionais e conteúdo audiovisual"
    },
  ]

  const handleSubmit = async (data: any) => {
    const designRequestData = {
      name: data.name,
      phone: data.phone,
      discord: data.discord,
      instagram: data.instagram,
      projectType: 'design' as const,
      projectDetails: {
        serviceType: data.serviceType,
        serviceName: data.serviceName,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
        features: []
      },
      status: 'pending' as const,
      priority: 'medium' as const
    }

    await createDesignRequest(designRequestData)
  }

  const currentService = designServices.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Solicitar Design</h1>
              <p className="text-xl text-gray-600">Escolha o serviço de design que você precisa</p>
            </div>

            {/* Service Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Tipo de Design</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {designServices.map((service) => (
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

export default function DesignContatoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DesignContatoContent />
    </Suspense>
  )
}
