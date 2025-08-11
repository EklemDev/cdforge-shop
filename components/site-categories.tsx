"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Target, BookOpen, Building, Palette } from "lucide-react"
import Link from "next/link"

const siteCategories = [
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Lojas virtuais completas com sistema de pagamento, gestão de produtos e relatórios de vendas.",
    icon: ShoppingCart,
    color: "#10B981",
    features: ["Sistema de pagamento", "Gestão de produtos", "Relatórios de vendas", "SEO otimizado"],
    price: "A partir de R$ 250",
    deliveryTime: "15-30 dias",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Sites profissionais para mostrar seus trabalhos e conquistar novos clientes.",
    icon: User,
    color: "#8B5CF6",
    features: ["Design responsivo", "Galeria de projetos", "Formulário de contato", "Otimização SEO"],
    price: "A partir de R$ 120",
    deliveryTime: "7-15 dias",
  },
  {
    id: "landing",
    title: "Landing Page",
    description: "Páginas de conversão otimizadas para campanhas de marketing e captação de leads.",
    icon: Target,
    color: "#F59E0B",
    features: ["Alta conversão", "Integração com CRM", "Analytics avançado", "A/B Testing"],
    price: "A partir de R$ 100",
    deliveryTime: "3-7 dias",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Plataformas de conteúdo com sistema de gerenciamento e otimização para SEO.",
    icon: BookOpen,
    color: "#EF4444",
    features: ["CMS personalizado", "SEO otimizado", "Sistema de comentários", "Newsletter"],
    price: "A partir de R$ 150",
    deliveryTime: "10-20 dias",
  },
  {
    id: "corporativo",
    title: "Corporativo",
    description: "Sites institucionais profissionais para empresas e organizações.",
    icon: Building,
    color: "#3B82F6",
    features: ["Design profissional", "Múltiplas páginas", "Área administrativa", "Integração com sistemas"],
    price: "A partir de R$ 200",
    deliveryTime: "20-35 dias",
  },
  {
    id: "personalizado",
    title: "Personalizado",
    description: "Soluções sob medida para necessidades específicas do seu negócio.",
    icon: Palette,
    color: "#EC4899",
    features: ["Desenvolvimento customizado", "Funcionalidades únicas", "Integração com APIs", "Suporte dedicado"],
    price: "R$ 60 - R$ 250",
    deliveryTime: "Varia conforme projeto",
  },
]

export default function SiteCategories() {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {siteCategories.map((site) => (
          <Card
            key={site.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: site.color + "20" }}
                >
                  <site.icon className="w-6 h-6" style={{ color: site.color }} />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">{site.title}</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">{site.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="mb-6 flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Funcionalidades:</h4>
                <ul className="space-y-1">
                  {site.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: site.color }}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <span className="font-bold" style={{ color: site.color }}>
                    {site.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prazo:</span>
                  <span className="text-sm font-medium text-gray-900">{site.deliveryTime}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full text-white transition-all duration-300 hover:scale-105 mt-auto"
                style={{ backgroundColor: site.color }}
              >
                <Link href={`/sites/personalizar?type=${site.id}`}>
                  Personalizar Site
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
