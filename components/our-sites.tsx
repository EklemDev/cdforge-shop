"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Target, BookOpen, Building, Palette } from "lucide-react"

const siteCategories = [
  {
    id: 1,
    title: "",
    description: "",
    icon: ShoppingCart,
    features: [],
    price: "",
  },
  {
    id: 2,
    title: "",
    description: "",
    icon: User,
    features: [],
    price: "",
  },
  {
    id: 3,
    title: "",
    description: "",
    icon: Target,
    features: [],
    price: "",
  },
  {
    id: 4,
    title: "",
    description: "",
    icon: BookOpen,
    features: [],
    price: "",
  },
  {
    id: 5,
    title: "",
    description: "",
    icon: Building,
    features: [],
    price: "",
  },
  {
    id: 6,
    title: "",
    description: "",
    icon: Palette,
    features: [],
    price: "",
  },
]

export default function OurSites() {
  return (
    <section id="sites" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nossos Sites</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desenvolvimento web profissional para todas as necessidades do seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {siteCategories.map((site) => (
            <Card
              key={site.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <site.icon className="w-6 h-6 text-cyan-500" />
                  </div>
                  <Badge variant="secondary" className="bg-cyan-50 text-cyan-700">
                    {site.title}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{site.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">{site.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Funcionalidades:</h4>
                  <ul className="space-y-1">
                    {site.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-lg font-bold text-cyan-500">{site.price}</span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300 hover:scale-105"
                  >
                    <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                      Solicitar Orçamento
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
