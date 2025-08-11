"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Shield, Code, AlertCircle } from "lucide-react"
import Link from "next/link"

const freeRecommendations = [
  {
    id: 1,
    title: "Bot Simples WhatsApp",
    description: "Bot básico para atendimento automático no WhatsApp com respostas pré-definidas",
    platform: "WhatsApp",
    icon: "/whatsapp.png",
    color: "#25D366",
    features: ["Respostas automáticas", "Menu interativo", "Horário de funcionamento"],
    price: "30 DIAS GRÁTIS",
    planPrice: "R$ 45/mês",
    buyPrice: "R$ 120",
    note: "Após 30 dias, escolha entre plano mensal ou compra única",
  },
  {
    id: 2,
    title: "Bot Simples Discord",
    description: "Bot básico para Discord com comandos essenciais de moderação e diversão",
    platform: "Discord",
    icon: "/discord.png",
    color: "#5865F2",
    features: ["Comandos básicos", "Moderação simples", "Sistema de boas-vindas"],
    price: "30 DIAS GRÁTIS",
    planPrice: "R$ 45/mês",
    buyPrice: "R$ 120",
    note: "Após 30 dias, escolha entre plano mensal ou compra única",
  },
]

export default function FreeRecommendations() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Teste Grátis por 30 Dias</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experimente nossos bots por 30 dias sem pagar nada e comprove a qualidade do nosso trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {freeRecommendations.map((bot) => (
            <Card
              key={bot.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-white"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                      style={{ backgroundColor: bot.color + "20" }}
                    >
                      <img
                        src={bot.icon || "/placeholder.svg"}
                        alt={`${bot.platform} logo`}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <Badge className="text-white border-0" style={{ backgroundColor: bot.color }}>
                      {bot.platform}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 font-bold animate-pulse">
                    {bot.price}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{bot.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{bot.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
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

                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-800">Período de Teste</span>
                  </div>
                  <p className="text-xs text-orange-700">
                    <strong>30 dias gratuitos</strong> para testar todas as funcionalidades. {bot.note}
                  </p>
                </div>

                {/* Opções após o teste */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-semibold text-gray-900 text-sm">Após o período de teste:</h4>

                  {/* Opção 1: Plano Mensal */}
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Plano Mensal (Recomendado)</span>
                      </div>
                      <span className="text-sm font-bold text-green-700">{bot.planPrice}</span>
                    </div>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>✅ Suporte completo sempre que precisar</li>
                      <li>✅ Atualizações automáticas incluídas</li>
                      <li>✅ Manutenção e correções gratuitas</li>
                      <li>✅ Contato direto com M E L K E</li>
                    </ul>
                  </div>

                  {/* Opção 2: Compra Única */}
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-800">Compra Única</span>
                      </div>
                      <span className="text-sm font-bold text-blue-700">{bot.buyPrice}</span>
                    </div>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>✅ Bot completo seu para sempre</li>
                      <li>❌ Sem suporte técnico</li>
                      <li>❌ Sem atualizações automáticas</li>
                      <li>❌ Sem manutenção incluída</li>
                    </ul>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full text-white transition-all duration-300 hover:scale-105 mb-2"
                  style={{ backgroundColor: bot.color }}
                >
                  <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                    🚀 Começar Teste Grátis
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          {/* Explicação das diferenças */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-gray-600" />
              <h3 className="font-semibold text-gray-900 text-lg">Entenda as Diferenças</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              {/* Plano Mensal */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Plano Mensal (Recomendado)</h4>
                </div>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>
                    🔧 <strong>Suporte completo:</strong> Ajuda sempre que precisar
                  </li>
                  <li>
                    🔄 <strong>Atualizações automáticas:</strong> Sempre na versão mais recente
                  </li>
                  <li>
                    🔧 <strong>Manutenção incluída:</strong> Correções e melhorias
                  </li>
                  <li>
                    💬 <strong>Contato direto:</strong> Fale com M E L K E no Discord
                  </li>
                  <li>
                    🛡️ <strong>Garantia:</strong> Funcionamento sempre assegurado
                  </li>
                </ul>
              </div>

              {/* Compra Única */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Compra Única</h4>
                </div>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>
                    💰 <strong>Pagamento único:</strong> Sem mensalidades
                  </li>
                  <li>
                    🏠 <strong>Bot é seu:</strong> Código fonte incluído
                  </li>
                  <li>
                    ⚠️ <strong>Sem suporte:</strong> Você gerencia sozinho
                  </li>
                  <li>
                    🚫 <strong>Sem atualizações:</strong> Versão atual apenas
                  </li>
                  <li>
                    🔧 <strong>Manutenção própria:</strong> Correções por sua conta
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>💡 Dica:</strong> O plano mensal é ideal para quem quer tranquilidade e suporte contínuo. A
                compra única é para quem tem conhecimento técnico e prefere autonomia total.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg max-w-2xl mx-auto mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Como funciona o período de teste?</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>
                • <strong>30 dias completamente grátis</strong> - sem cobrança inicial
              </li>
              <li>
                • <strong>Todas as funcionalidades liberadas</strong> durante o período
              </li>
              <li>
                • <strong>Suporte completo</strong> da nossa equipe
              </li>
              <li>
                • <strong>Cancele a qualquer momento</strong> sem custos
              </li>
              <li>
                • <strong>Após 30 dias:</strong> escolha entre plano mensal ou compra única
              </li>
            </ul>
          </div>

          <p className="text-gray-600 mb-4">Gostou do teste? Veja nossas soluções personalizadas!</p>
          <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 bg-transparent">
            <Link href="/bots">Ver Todos os Bots</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
