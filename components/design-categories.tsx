"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, ImageIcon, Layout, FileText, Smartphone, Video } from "lucide-react"
import Link from "next/link"

const designCategories = [
  {
    id: "logo",
    title: "Logo & Identidade Visual",
    description: "Criação de logos únicos e identidade visual completa para sua marca.",
    icon: Palette,
    color: "#E91E63",
    features: ["Logo profissional", "Manual da marca", "Variações do logo", "Aplicações práticas"],
    price: "A partir de R$ 60",
    deliveryTime: "3-7 dias",
  },
  {
    id: "social-media",
    title: "Design para Redes Sociais",
    description: "Posts, stories, capas e templates personalizados para suas redes sociais.",
    icon: ImageIcon,
    color: "#9C27B0",
    features: ["Posts personalizados", "Stories animados", "Capas de destaque", "Templates reutilizáveis"],
    price: "A partir de R$ 50",
    deliveryTime: "2-5 dias",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design de interfaces e experiência do usuário para sites e aplicativos.",
    icon: Layout,
    color: "#673AB7",
    features: ["Wireframes", "Protótipos interativos", "Design responsivo", "Guia de estilo"],
    price: "A partir de R$ 70",
    deliveryTime: "7-15 dias",
  },
  {
    id: "marketing",
    title: "Material de Marketing",
    description: "Banners, flyers, cartões de visita e materiais promocionais.",
    icon: FileText,
    color: "#3F51B5",
    features: ["Banners digitais", "Flyers impressos", "Cartões de visita", "Materiais promocionais"],
    price: "A partir de R$ 40",
    deliveryTime: "2-4 dias",
  },
  {
    id: "app-design",
    title: "Design de Aplicativos",
    description: "Interface completa para aplicativos mobile com foco na usabilidade.",
    icon: Smartphone,
    color: "#2196F3",
    features: ["Design mobile-first", "Ícones personalizados", "Animações", "Protótipo funcional"],
    price: "A partir de R$ 70",
    deliveryTime: "10-20 dias",
  },
  {
    id: "motion",
    title: "Motion Graphics",
    description: "Animações, vídeos promocionais e conteúdo audiovisual.",
    icon: Video,
    color: "#00BCD4",
    features: ["Animações 2D", "Vídeos promocionais", "Intros/Outros", "GIFs animados"],
    price: "A partir de R$ 60",
    deliveryTime: "5-10 dias",
  },
]

export default function DesignCategories() {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {designCategories.map((design) => (
          <Card
            key={design.id}
            className="group hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white dark:bg-gray-700 flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md"
                  style={{ backgroundColor: design.color + "20" }}
                >
                  <design.icon className="w-6 h-6" style={{ color: design.color }} />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{design.title}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {design.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="mb-6 flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">O que inclui:</h4>
                <ul className="space-y-1">
                  {design.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: design.color }}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Preço:</span>
                  <span className="font-bold" style={{ color: design.color }}>
                    {design.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Prazo:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{design.deliveryTime}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg mt-auto"
                style={{ backgroundColor: design.color }}
              >
                <Link href={`/design/contato?service=${design.id}`}>
                  🎨 Solicitar Design
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
