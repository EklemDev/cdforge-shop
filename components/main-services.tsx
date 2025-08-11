import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Settings } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Bot,
    title: "BOTS",
    description: "Plataforma de criação de bots para Discord, WhatsApp, Instagram e automação web.",
    href: "#bots",
  },
  {
    icon: Globe,
    title: "SITES",
    description: "Desenvolvimento de sites profissionais, e-commerce, portfolios e landing pages.",
    href: "#sites",
  },
  {
    icon: Settings,
    title: "SERVIÇOS",
    description: "Serviços especializados em análise, consultoria e suporte técnico personalizado.",
    href: "#services",
  },
]

export default function MainServices() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossas Soluções</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha a solução perfeita para o seu projeto e transforme suas ideias em realidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <service.icon className="w-8 h-8 text-cyan-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
                <Button
                  asChild
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Link href={service.href}>Ver Planos</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
