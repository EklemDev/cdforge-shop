"use client"

import { 
  Bot, 
  Globe, 
  Palette, 
  Code, 
  Zap, 
  Star, 
  Rocket, 
  Sparkles,
  MessageCircle,
  Users,
  Award,
  TrendingUp,
  ShoppingCart,
  Smartphone,
  Database,
  Clock
} from "lucide-react"
import { SimpleCarousel } from "./simple-carousel"
import { SimpleCard } from "./simple-card"
import { SimpleButton } from "./simple-button"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"

const carouselItems = [
  {
    id: "1",
    title: "Bots Inteligentes",
    description: "Automatize processos e revolucione seu negócio com IA avançada",
    icon: <Bot className="w-24 h-24" />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    actionText: "PERSONALIZE JÁ"
  },
  {
    id: "2", 
    title: "Sites Profissionais",
    description: "Crie presença digital impactante com designs modernos e responsivos",
    icon: <Globe className="w-24 h-24" />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    actionText: "PERSONALIZE JÁ"
  },
  {
    id: "3",
    title: "Design Criativo",
    description: "Transforme sua marca com identidade visual única e memorável",
    icon: <Palette className="w-24 h-24" />,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    actionText: "PERSONALIZE JÁ"
  },
  {
    id: "4",
    title: "Desenvolvimento",
    description: "Soluções customizadas para suas necessidades específicas",
    icon: <Code className="w-24 h-24" />,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    actionText: "PERSONALIZE JÁ"
  }
]

const serviceCards = [
  {
    title: "Chatbots Avançados",
    description: "Atendimento 24/7 com IA conversacional personalizada",
    icon: MessageCircle,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "E-commerce",
    description: "Lojas virtuais completas com pagamentos seguros",
    icon: ShoppingCart,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "Landing Pages",
    description: "Páginas de conversão otimizadas para resultados",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "Apps Mobile",
    description: "Aplicativos nativos e híbridos para iOS e Android",
    icon: Smartphone,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "Sistemas Web",
    description: "Plataformas completas para gestão empresarial",
    icon: Database,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "Consultoria Tech",
    description: "Estratégia digital e transformação tecnológica",
    icon: Users,
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  }
]

const stats = [
  { icon: Award, value: "500+", label: "Projetos Entregues" },
          { icon: Users, value: "100%", label: "Satisfação dos Clientes" },
  { icon: Clock, value: "24/7", label: "Suporte Disponível" },
  { icon: Star, value: "4.9", label: "Avaliação Média" }
]

export const HomeContent = () => {
  return (
    <>
      {/* Hero Section Épica */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            {/* Logo e Nome */}
            <div className="mb-8 animate-bounce-in">
                              <div className="relative inline-block mt-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-900/90 to-blue-800/80 backdrop-blur-xl p-4 rounded-full border border-blue-400/30 shadow-2xl">
                    <div className="-mt-2">
                      <CodeForgeLogoEnhanced size={128} color="white" />
                    </div>
                  </div>
                </div>
            </div>

            {/* Título Principal */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-fade-in-up">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-gradient-x">
                CodeForge
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 animate-fade-in-up">
              Transforme suas ideias em soluções digitais épicas com tecnologia de ponta e design inovador
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
              <SimpleButton
                size="lg"
                variant="primary"
                icon={Rocket}
                onClick={() => window.location.href = '/categorias'}
              >
                Começar Agora
              </SimpleButton>
              
              <SimpleButton
                size="lg"
                variant="ghost"
                icon={MessageCircle}
                onClick={() => window.open('https://discord.gg/jp2BzA4H', '_blank')}
              >
                Falar no Discord
              </SimpleButton>
            </div>
          </div>

          {/* Carrossel Épico */}
          <div className="mb-20 animate-fade-in">
            <SimpleCarousel items={carouselItems} />
          </div>
        </div>
      </section>

      {/* Seção de Serviços */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Serviços</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Soluções completas para impulsionar seu negócio digital
            </p>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((card, index) => (
              <SimpleCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                gradient={card.gradient}
                delay={index}
                onClick={() => {
                  if (card.title === "Landing Pages") {
                    window.location.href = '/design'
                  } else {
                    window.location.href = '/categorias'
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl p-4 rounded-full border border-white/20 shadow-xl">
                    <stat.icon className="w-8 h-8 text-white mx-auto" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Transformar</span> seu Negócio?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Junte-se a centenas de empresas que já revolucionaram sua presença digital conosco
            </p>
            <SimpleButton
              size="lg"
              variant="primary"
              icon={Zap}
              onClick={() => window.location.href = '/design'}
            >
              Começar Transformação
            </SimpleButton>
          </div>
        </div>
      </section>
    </>
  )
}
