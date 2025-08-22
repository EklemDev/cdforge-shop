"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, UserMinus, MessageCircle, Headphones, GraduationCap, BarChart } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "instagram-analysis",
    title: "Análise de Instagram",
    description: "Descubra quem não te segue de volta, analise seu engajamento e otimize sua estratégia.",
    icon: Instagram,
    color: "#E4405F",
    features: ["Quem não te segue", "Análise de engajamento", "Relatórios detalhados", "Sugestões de melhoria"],
    price: "R$ 50",
    deliveryTime: "24 horas",
  },
  {
    id: "unfollow-service",
    title: "Remoção de Não Seguidores",
    description: "Serviço automatizado para remover pessoas que não te seguem de volta no Instagram.",
    icon: UserMinus,
    color: "#EF4444",
    features: ["Remoção automática", "Lista de segurança", "Relatório de ações", "Suporte durante processo"],
    price: "R$ 80",
    deliveryTime: "1-3 dias",
  },
  {
    id: "social-consulting",
    title: "Consultoria de Redes Sociais",
    description: "Estratégias personalizadas para crescer suas redes sociais e aumentar o engajamento.",
    icon: BarChart,
    color: "#10B981",
    features: ["Análise completa", "Estratégia personalizada", "Cronograma de posts", "Acompanhamento mensal"],
    price: "R$ 150/mês",
    deliveryTime: "Consultoria contínua",
  },
  {
    id: "whatsapp-consulting",
    title: "Consultoria WhatsApp Business",
    description: "Otimize seu atendimento no WhatsApp com estratégias e automações eficientes.",
    icon: MessageCircle,
    color: "#25D366",
    features: ["Configuração completa", "Automações básicas", "Templates de mensagens", "Treinamento da equipe"],
    price: "R$ 150",
    deliveryTime: "1-3 dias",
  },
  {
    id: "technical-support",
    title: "Suporte Técnico",
    description: "Suporte especializado para seus bots, sites e sistemas digitais.",
    icon: Headphones,
    color: "#3B82F6",
    features: ["Suporte 24/7", "Resolução de problemas", "Atualizações", "Manutenção preventiva"],
    price: "R$ 100/mês",
    deliveryTime: "Suporte contínuo",
  },
  {
    id: "training",
    title: "Treinamento Personalizado",
    description: "Aprenda a usar e gerenciar seus bots e sistemas com treinamento especializado.",
    icon: GraduationCap,
    color: "#8B5CF6",
    features: ["Treinamento individual", "Material didático", "Suporte pós-treinamento", "Certificado"],
    price: "R$ 120/hora",
    deliveryTime: "Agendamento flexível",
  },
]

export default function ServiceCategories() {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service) => (
          <Card
            key={service.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: service.color + "20" }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="mb-6 flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">O que inclui:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <span className="font-bold" style={{ color: service.color }}>
                    {service.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prazo:</span>
                  <span className="text-sm font-medium text-gray-900">{service.deliveryTime}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full text-white transition-all duration-300 hover:scale-105 mt-auto"
                style={{ backgroundColor: service.color }}
              >
                <Link href={`/servicos/contato?service=${service.id}`}>
                  Contratar Serviço
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
