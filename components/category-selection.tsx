import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Settings, Palette } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "bots",
    title: "BOTS",
    description: "Automação inteligente para Discord, WhatsApp, Instagram e Web Scraping",
    icon: Bot,
    href: "/bots",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    darkColor: "dark:bg-blue-600",
    darkHoverColor: "dark:hover:bg-blue-700",
  },
  {
    id: "sites",
    title: "SITES",
    description: "Desenvolvimento web profissional, e-commerce, portfolios e landing pages",
    icon: Globe,
    href: "/sites",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    darkColor: "dark:bg-green-600",
    darkHoverColor: "dark:hover:bg-green-700",
  },
  {
    id: "design",
    title: "DESIGN",
    description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
    icon: Palette,
    href: "/design",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    darkColor: "dark:bg-purple-600",
    darkHoverColor: "dark:hover:bg-purple-700",
  },
  {
    id: "servicos",
    title: "SERVIÇOS",
    description: "Análise de Instagram, consultoria especializada e suporte técnico",
    icon: Settings,
    href: "/servicos",
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
    darkColor: "dark:bg-cyan-600",
    darkHoverColor: "dark:hover:bg-cyan-700",
  },
]

export default function CategorySelection() {
  return (
    <section id="categories" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Escolha o que deseja
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Selecione a categoria que melhor atende às suas necessidades
          </p>
        </div>

        {/* Categories Grid - Perfectly Centered */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-0 shadow-lg bg-white dark:bg-gray-700 w-full max-w-sm mx-auto"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto w-20 h-20 ${category.color} ${category.darkColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl`}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6">
                  <CardDescription className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {category.description}
                  </CardDescription>
                  <Button
                    asChild
                    className={`w-full ${category.color} ${category.hoverColor} ${category.darkColor} ${category.darkHoverColor} text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl py-3 text-lg font-semibold rounded-lg`}
                  >
                    <Link href={category.href}>🚀 Explorar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
