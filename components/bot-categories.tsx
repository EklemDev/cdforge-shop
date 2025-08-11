"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, GamepadIcon, Settings, Headphones, Shield, Users, BookOpen } from "lucide-react"
import Link from "next/link"

const botTypes = [
  {
    id: "vendas",
    title: "Bot de Vendas",
    description: "Automatize todo seu processo de vendas com pagamentos integrados",
    icon: ShoppingCart,
    color: "#10B981",
    features: ["Catálogo de produtos", "Pagamentos automáticos", "Gestão de pedidos", "Relatórios de vendas"],
  },
  {
    id: "entretenimento",
    title: "Bot de Entretenimento",
    description: "Jogos, música e diversão para sua comunidade",
    icon: GamepadIcon,
    color: "#8B5CF6",
    features: ["Jogos interativos", "Sistema de música", "Memes e diversão", "Ranking de usuários"],
  },
  {
    id: "automacao",
    title: "Bot de Automação",
    description: "Automatize tarefas repetitivas e aumente a produtividade",
    icon: Settings,
    color: "#F59E0B",
    features: ["Tarefas automáticas", "Integração com APIs", "Notificações", "Agendamento"],
  },
  {
    id: "suporte",
    title: "Bot de Suporte",
    description: "Atendimento ao cliente 24/7 com respostas inteligentes",
    icon: Headphones,
    color: "#EF4444",
    features: ["FAQ automático", "Tickets de suporte", "Encaminhamento", "Base de conhecimento"],
  },
  {
    id: "moderacao",
    title: "Bot de Moderação",
    description: "Mantenha sua comunidade segura e organizada",
    icon: Shield,
    color: "#3B82F6",
    features: ["Auto-moderação", "Sistema de warns", "Logs detalhados", "Filtros de conteúdo"],
  },
  {
    id: "comunidade",
    title: "Bot de Comunidade",
    description: "Engaje sua comunidade com recursos interativos",
    icon: Users,
    color: "#EC4899",
    features: ["Sistema de níveis", "Eventos automáticos", "Enquetes", "Boas-vindas personalizadas"],
  },
  {
    id: "educacional",
    title: "Bot Educacional",
    description: "Aprendizado e treinamento interativo",
    icon: BookOpen,
    color: "#06B6D4",
    features: ["Sistema de quizzes", "Progresso do aluno", "Conteúdo personalizado", "Relatórios de aprendizado"],
  },
]

export default function BotCategories() {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tipos de Bots</h2>
        <p className="text-gray-600">Escolha o tipo de bot que melhor atende suas necessidades</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {botTypes.map((bot) => (
          <Card
            key={bot.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white flex flex-col"
          >
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

              <Button
                asChild
                className="w-full text-white transition-all duration-300 hover:scale-105 mt-auto"
                style={{ backgroundColor: bot.color }}
              >
                <Link href={`/bots/personalizar?type=${bot.id}`}>Personalizar Bot</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
