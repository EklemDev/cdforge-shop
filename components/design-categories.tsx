"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, ImageIcon, Layout, FileText, Smartphone, Video, Sparkles, Star, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

const designCategories = [
  {
    id: "logo",
    title: "Logo & Identidade Visual",
    description: "Criação de logos únicos e identidade visual completa para sua marca.",
    icon: Palette,
    color: "#E91E63",
    colorScheme: {
      primary: "from-purple-500 to-pink-500",
      secondary: "from-pink-400 to-purple-600",
      accent: "from-orange-500 to-red-500"
    },
    features: ["Logo profissional", "Manual da marca", "Variações do logo", "Aplicações práticas"],
    price: "A partir de R$ 60",
    deliveryTime: "1-3 dias",
  },
  {
    id: "social-media",
    title: "Design para Redes Sociais",
    description: "Posts, stories, capas e templates personalizados para suas redes sociais.",
    icon: ImageIcon,
    color: "#9C27B0",
    colorScheme: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "from-cyan-400 to-blue-600",
      accent: "from-green-500 to-emerald-500"
    },
    features: ["Posts personalizados", "Stories animados", "Capas de destaque", "Templates reutilizáveis"],
    price: "A partir de R$ 50",
    deliveryTime: "1-3 dias",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design de interfaces e experiência do usuário para sites e aplicativos.",
    icon: Layout,
    color: "#673AB7",
    colorScheme: {
      primary: "from-green-500 to-emerald-500",
      secondary: "from-emerald-400 to-green-600",
      accent: "from-teal-500 to-cyan-500"
    },
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
    colorScheme: {
      primary: "from-orange-500 to-red-500",
      secondary: "from-red-400 to-orange-600",
      accent: "from-yellow-500 to-orange-500"
    },
    features: ["Banners digitais", "Flyers impressos", "Cartões de visita", "Materiais promocionais"],
    price: "A partir de R$ 40",
    deliveryTime: "1-3 dias",
  },
  {
    id: "app-design",
    title: "Design de Aplicativos",
    description: "Interface completa para aplicativos mobile com foco na usabilidade.",
    icon: Smartphone,
    color: "#2196F3",
    colorScheme: {
      primary: "from-indigo-500 to-purple-500",
      secondary: "from-purple-400 to-indigo-600",
      accent: "from-pink-500 to-rose-500"
    },
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
    colorScheme: {
      primary: "from-teal-500 to-cyan-500",
      secondary: "from-cyan-400 to-teal-600",
      accent: "from-blue-500 to-indigo-500"
    },
    features: ["Animações 2D", "Vídeos promocionais", "Intros/Outros", "GIFs animados"],
    price: "A partir de R$ 60",
    deliveryTime: "5-10 dias",
  },
]

// Componente de partículas animadas
const AnimatedParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  )
}

export default function DesignCategories() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background dinâmico */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20"></div>
      
      {/* Partículas animadas */}
      <AnimatedParticles />

      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              Nossos Serviços de Design
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Transforme sua marca com designs únicos e memoráveis que impressionam e convertem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {designCategories.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300">
                  {/* Background gradiente */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${design.colorScheme.primary} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Efeito de brilho */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg bg-gradient-to-r ${design.colorScheme.secondary}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <design.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                      {design.title}
                    </CardTitle>
                    <CardDescription className="text-white/80 leading-relaxed">
                      {design.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        O que inclui:
                      </h4>
                      <ul className="space-y-2">
                        {design.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            className="text-sm text-white/90 flex items-center gap-2"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${design.colorScheme.accent}`}></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60 flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          Preço:
                        </span>
                        <span className="font-bold text-lg" style={{ color: design.color }}>
                          {design.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/60">Prazo:</span>
                        <span className="text-sm font-medium text-white">{design.deliveryTime}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mt-auto bg-gradient-to-r ${design.colorScheme.accent} border-0 group-hover:shadow-2xl`}
                    >
                      <Link href={`/design/contato?service=${design.id}`} className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        🎨 Solicitar Design
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Pronto para Transformar sua Marca?
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </h3>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Entre em contato conosco e descubra como podemos criar designs únicos que elevam sua marca ao próximo nível
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <Link href="/design/contato" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  🚀 Começar Agora
                  <Sparkles className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
