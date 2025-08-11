import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mainCategories = [
  {
    id: "bots",
    title: "BOTS",
    description: "Automação inteligente para Discord, WhatsApp, Instagram e Web Scraping",
    icon: Bot,
    href: "/bots",
    color: "#3B82F6",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "sites",
    title: "SITES",
    description: "Desenvolvimento web profissional, e-commerce, portfolios e landing pages",
    icon: Globe,
    href: "/sites",
    color: "#10B981",
    bgColor: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: "design",
    title: "DESIGN",
    description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
    icon: Palette,
    href: "/design",
    color: "#8B5CF6",
    bgColor: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
  {
    id: "servicos",
    title: "SERVIÇOS",
    description: "Análise de Instagram, consultoria especializada e suporte técnico",
    icon: Settings,
    href: "/servicos",
    color: "#06B6D4",
    bgColor: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
  },
]

export default function MainCategorySelection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo e Nome CodeForge Simplificado */}
        <div className="flex items-center justify-center mb-8 group">
          <div className="relative mr-3">
            <div className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 group-hover:scale-105 transition-all duration-300">
              <Image src="/logo.png" alt="CodeForge Logo" width={32} height={32} className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            CodeForge
          </h1>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Escolha o que deseja
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Selecione a categoria que melhor atende às suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {mainCategories.map((category) => (
            <Card
              key={category.id}
              className="group hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-0 shadow-lg bg-white dark:bg-gray-700 text-center"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-20 h-20 ${category.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl`}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                <CardDescription className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-300 min-h-[4rem] flex items-center justify-center">
                  {category.description}
                </CardDescription>
                <Button
                  asChild
                  className={`w-full ${category.bgColor} ${category.hoverColor} text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl py-3 text-lg font-semibold rounded-lg`}
                >
                  <Link href={category.href}>🚀 Explorar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
