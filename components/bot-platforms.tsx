"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import Link from "next/link"

const platforms = [
  {
    id: "discord",
    title: "Discord",
    description: "Bots para servidores Discord com recursos avançados de moderação e entretenimento",
    icon: "/discord.png",
    color: "#5865F2",
    features: ["Comandos slash", "Moderação avançada", "Sistema de música", "Integração com APIs"],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Business",
    description: "Automação para WhatsApp Business com atendimento inteligente",
    icon: "/whatsapp.png",
    color: "#25D366",
    features: ["Respostas automáticas", "Catálogo de produtos", "Agendamento", "Integração CRM"],
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Bots para Instagram com análise de perfil e automação de interações",
    icon: "/instagram.png",
    color: "#E4405F",
    features: ["Análise de seguidores", "Auto-follow/unfollow", "Comentários automáticos", "Relatórios detalhados"],
  },
  {
    id: "web",
    title: "Web Scraping",
    description: "Coleta automatizada de dados de sites e processamento inteligente",
    icon: Globe,
    color: "#00BCD4",
    features: ["Coleta de dados", "Monitoramento de preços", "Análise de concorrência", "Relatórios automáticos"],
  },
]

export default function BotPlatforms() {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plataformas Disponíveis</h2>
        <p className="text-gray-600">Desenvolvemos bots para as principais plataformas do mercado</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
          >
            <CardHeader className="text-center">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: platform.color + "20" }}
              >
                {typeof platform.icon === "string" ? (
                  <img
                    src={platform.icon || "/placeholder.svg"}
                    alt={`${platform.title} logo`}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <platform.icon className="w-8 h-8" style={{ color: platform.color }} />
                )}
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">{platform.title}</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed text-sm">
                {platform.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Recursos:</h4>
                <ul className="space-y-1">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: platform.color }}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                className="w-full text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: platform.color }}
              >
                <Link href={`/bots/personalizar?platform=${platform.id}`}>Criar Bot</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
