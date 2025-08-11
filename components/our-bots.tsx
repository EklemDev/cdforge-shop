"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import PricingModal from "./pricing-modal"

const botCategories = [
  { id: "all", name: "Todos" },
  { id: "discord", name: "Discord" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "instagram", name: "Instagram" },
  { id: "web", name: "Web Scraping" },
]

const bots = [
  {
    id: 1,
    title: "Bot de Vendas Discord",
    description: "Automatize suas vendas no Discord com sistema completo de pagamentos e gestão de clientes.",
    category: "discord",
    icon: "/discord.png",
    color: "#5865F2",
    bgColor: "bg-[#5865F2]/10",
    hoverBgColor: "hover:bg-[#5865F2]/20",
    buttonColor: "bg-[#5865F2] hover:bg-[#4752C4]",
    features: ["Pagamentos automáticos", "Gestão de clientes", "Relatórios de vendas"],
    plans: {
      basic: {
        name: "Básico",
        price: 45,
        features: ["Bot funcional", "Atualizações mensais", "Suporte básico", "2 comandos personalizados"],
      },
      pro: {
        name: "Profissional",
        price: 75,
        features: [
          "Bot avançado",
          "Atualizações semanais",
          "Suporte prioritário",
          "5 comandos personalizados",
          "Integrações avançadas",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: 150,
        features: [
          "Bot completo",
          "Atualizações em tempo real",
          "Suporte 24/7",
          "Comandos ilimitados",
          "Hospedagem incluída",
          "SLA garantido",
        ],
      },
    },
  },
  {
    id: 2,
    title: "Bot WhatsApp Business",
    description: "Atendimento automatizado para WhatsApp com respostas inteligentes e integração com CRM.",
    category: "whatsapp",
    icon: "/whatsapp.png",
    color: "#25D366",
    bgColor: "bg-[#25D366]/10",
    hoverBgColor: "hover:bg-[#25D366]/20",
    buttonColor: "bg-[#25D366] hover:bg-[#1DA851]",
    features: ["Respostas automáticas", "Integração CRM", "Relatórios detalhados"],
    plans: {
      basic: {
        name: "Básico",
        price: 45,
        features: ["Bot funcional", "Atualizações mensais", "Suporte básico", "2 comandos personalizados"],
      },
      pro: {
        name: "Profissional",
        price: 75,
        features: [
          "Bot avançado",
          "Atualizações semanais",
          "Suporte prioritário",
          "5 comandos personalizados",
          "Integrações avançadas",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: 150,
        features: [
          "Bot completo",
          "Atualizações em tempo real",
          "Suporte 24/7",
          "Comandos ilimitados",
          "Hospedagem incluída",
          "SLA garantido",
        ],
      },
    },
  },
  {
    id: 3,
    title: "Bot Instagram Analytics",
    description: "Análise completa do seu Instagram com relatórios de seguidores e engajamento.",
    category: "instagram",
    icon: "/instagram.png",
    color: "#E4405F",
    bgColor: "bg-gradient-to-r from-[#E4405F]/10 to-[#FCAF45]/10",
    hoverBgColor: "hover:bg-gradient-to-r hover:from-[#E4405F]/20 hover:to-[#FCAF45]/20",
    buttonColor: "bg-gradient-to-r from-[#E4405F] to-[#FCAF45] hover:from-[#C13584] hover:to-[#F77737]",
    features: ["Análise de seguidores", "Relatórios de engajamento", "Automação de posts"],
    plans: {
      basic: {
        name: "Básico",
        price: 45,
        features: ["Bot funcional", "Atualizações mensais", "Suporte básico", "2 comandos personalizados"],
      },
      pro: {
        name: "Profissional",
        price: 75,
        features: [
          "Bot avançado",
          "Atualizações semanais",
          "Suporte prioritário",
          "5 comandos personalizados",
          "Integrações avançadas",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: 150,
        features: [
          "Bot completo",
          "Atualizações em tempo real",
          "Suporte 24/7",
          "Comandos ilimitados",
          "Hospedagem incluída",
          "SLA garantido",
        ],
      },
    },
  },
  {
    id: 4,
    title: "Web Scraping Bot",
    description: "Coleta automatizada de dados de sites com processamento inteligente e relatórios.",
    category: "web",
    icon: Globe,
    color: "#00BCD4",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "hover:bg-cyan-500/20",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600",
    features: ["Coleta de dados", "Processamento automático", "Exportação de relatórios"],
    plans: {
      basic: {
        name: "Básico",
        price: 45,
        features: ["Bot funcional", "Atualizações mensais", "Suporte básico", "2 comandos personalizados"],
      },
      pro: {
        name: "Profissional",
        price: 75,
        features: [
          "Bot avançado",
          "Atualizações semanais",
          "Suporte prioritário",
          "5 comandos personalizados",
          "Integrações avançadas",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: 150,
        features: [
          "Bot completo",
          "Atualizações em tempo real",
          "Suporte 24/7",
          "Comandos ilimitados",
          "Hospedagem incluída",
          "SLA garantido",
        ],
      },
    },
  },
]

export default function OurBots() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBot, setSelectedBot] = useState<(typeof bots)[0] | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>("")

  const filteredBots = selectedCategory === "all" ? bots : bots.filter((bot) => bot.category === selectedCategory)

  const handlePlanSelect = (bot: (typeof bots)[0], planType: string) => {
    setSelectedBot(bot)
    setSelectedPlan(planType)
  }

  return (
    <section id="bots" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossos Bots</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Automatize seus processos com bots inteligentes e personalizados
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {botCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                  : "border-cyan-500 text-cyan-500 hover:bg-cyan-50"
              } transition-all duration-300`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Bots Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredBots.map((bot) => (
            <Card
              key={bot.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 ${bot.bgColor} ${bot.hoverBgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                  >
                    {typeof bot.icon === "string" ? (
                      <img
                        src={bot.icon || "/placeholder.svg"}
                        alt={`${bot.title} logo`}
                        className="w-7 h-7 object-contain"
                      />
                    ) : (
                      <bot.icon className="w-6 h-6" style={{ color: bot.color }} />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-white border-0"
                    style={{
                      background: bot.category === "instagram" ? "linear-gradient(45deg, #E4405F, #FCAF45)" : bot.color,
                    }}
                  >
                    {botCategories.find((cat) => cat.id === bot.category)?.name}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{bot.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{bot.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <div className="mb-6 flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Funcionalidades:</h4>
                  <ul className="space-y-1">
                    {bot.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: bot.color }}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 mt-auto">
                  <Button
                    onClick={() => handlePlanSelect(bot, "basic")}
                    variant="outline"
                    className="w-full transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: bot.color,
                      color: bot.color,
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = bot.color + "10"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    Plano Básico - R$ {bot.plans.basic.price}/mês
                  </Button>
                  <Button
                    onClick={() => handlePlanSelect(bot, "pro")}
                    variant="outline"
                    className="w-full transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: bot.color,
                      color: bot.color,
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = bot.color + "10"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    Plano Profissional - R$ {bot.plans.pro.price}/mês
                  </Button>
                  <Button
                    onClick={() => handlePlanSelect(bot, "enterprise")}
                    className={`w-full text-white transition-all duration-300 hover:scale-105 ${bot.buttonColor}`}
                  >
                    Plano Enterprise - R$ {bot.plans.enterprise.price}/mês
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Modal */}
        {selectedBot && selectedPlan && (
          <PricingModal
            isOpen={true}
            onClose={() => {
              setSelectedBot(null)
              setSelectedPlan("")
            }}
            bot={selectedBot}
            plan={selectedBot.plans[selectedPlan as keyof typeof selectedBot.plans]}
          />
        )}
      </div>
    </section>
  )
}
