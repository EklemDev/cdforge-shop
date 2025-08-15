"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, GamepadIcon, Settings, Headphones, Shield, Users, BookOpen, Star } from "lucide-react"
import { usePricingSync } from "@/hooks/usePricingSync"
import OrderForm from "./order-form"

const botTypes = [
  {
    id: "vendas",
    title: "Bot de Vendas",
    description: "Automatize todo seu processo de vendas com pagamentos integrados",
    icon: ShoppingCart,
    color: "#10B981",
    features: ["Catálogo de produtos", "Pagamentos automáticos", "Gestão de pedidos", "Relatórios de vendas"],
    category: "bots"
  },
  {
    id: "entretenimento",
    title: "Bot de Entretenimento",
    description: "Jogos, música e diversão para sua comunidade",
    icon: GamepadIcon,
    color: "#8B5CF6",
    features: ["Jogos interativos", "Sistema de música", "Memes e diversão", "Ranking de usuários"],
    category: "bots"
  },
  {
    id: "automacao",
    title: "Bot de Automação",
    description: "Automatize tarefas repetitivas e aumente a produtividade",
    icon: Settings,
    color: "#F59E0B",
    features: ["Tarefas automáticas", "Integração com APIs", "Notificações", "Agendamento"],
    category: "bots"
  },
  {
    id: "suporte",
    title: "Bot de Suporte",
    description: "Atendimento ao cliente 24/7 com respostas inteligentes",
    icon: Headphones,
    color: "#EF4444",
    features: ["FAQ automático", "Tickets de suporte", "Encaminhamento", "Base de conhecimento"],
    category: "bots"
  },
  {
    id: "moderacao",
    title: "Bot de Moderação",
    description: "Mantenha sua comunidade segura e organizada",
    icon: Shield,
    color: "#3B82F6",
    features: ["Auto-moderação", "Sistema de warns", "Logs detalhados", "Filtros de conteúdo"],
    category: "bots"
  },
  {
    id: "comunidade",
    title: "Bot de Comunidade",
    description: "Engaje sua comunidade com recursos interativos",
    icon: Users,
    color: "#EC4899",
    features: ["Sistema de níveis", "Eventos automáticos", "Enquetes", "Boas-vindas personalizadas"],
    category: "bots"
  },
  {
    id: "educacional",
    title: "Bot Educacional",
    description: "Aprendizado e treinamento interativo",
    icon: BookOpen,
    color: "#06B6D4",
    features: ["Sistema de quizzes", "Progresso do aluno", "Conteúdo personalizado", "Relatórios de aprendizado"],
    category: "bots"
  },
]

export default function BotCategories() {
  const { getActivePlans } = usePricingSync()
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedBotType, setSelectedBotType] = useState("")

  const botPlans = getActivePlans('bots')

  const getBotPrice = (botId: string) => {
    // Mapeia o ID do bot para um plano específico
    const planMap: { [key: string]: string } = {
      "vendas": "Bot Básico",
      "entretenimento": "Bot Premium", 
      "automacao": "Bot Enterprise",
      "suporte": "Bot Básico",
      "moderacao": "Bot Premium",
      "comunidade": "Bot Premium",
      "educacional": "Bot Enterprise"
    }
    
    const planName = planMap[botId]
    const plan = botPlans.find(p => p.name === planName)
    return plan?.price || 0
  }

  const handleOrderClick = (botType: string) => {
    setSelectedBotType(botType)
    setShowOrderForm(true)
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tipos de Bots</h2>
        <p className="text-gray-600">Escolha o tipo de bot que melhor atende suas necessidades</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {botTypes.map((bot, index) => {
          const price = getBotPrice(bot.id)
          const isPopular = index === 1 // Bot de Entretenimento como popular
          
          return (
            <Card
              key={bot.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white flex flex-col relative"
            >
              {isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-bl-lg z-10">
                  <Star className="w-3 h-3 inline mr-1" />
                  Popular
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: bot.color + "20" }}
                  >
                    <bot.icon className="w-6 h-6" style={{ color: bot.color }} />
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">{bot.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed text-sm">{bot.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-1">
                <div className="mb-4 flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Funcionalidades:</h4>
                  <ul className="space-y-1">
                    {bot.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: bot.color }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preço */}
                <div className="mb-4 text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {price.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">/projeto</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {index === 0 ? "Básico" : index === 1 ? "Premium" : "Enterprise"}
                  </Badge>
                </div>

                <Button
                  className="w-full text-white transition-all duration-300 hover:scale-105 mt-auto"
                  style={{ backgroundColor: bot.color }}
                  onClick={() => handleOrderClick(bot.id)}
                >
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal do Formulário de Pedido */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Solicitar Orçamento - {botTypes.find(b => b.id === selectedBotType)?.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
              <OrderForm 
                preSelectedCategory="bots"
                preSelectedProjectType={botTypes.find(b => b.id === selectedBotType)?.title || ""}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
