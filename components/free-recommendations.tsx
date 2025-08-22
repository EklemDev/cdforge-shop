"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Shield, 
  Code, 
  AlertCircle, 
  Star, 
  Zap, 
  Crown, 
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Gift,
  TrendingUp,
  Users,
  Settings,
  Bot,
  Globe,
  Palette,
  Wrench,
  Heart,
  Rocket,
  Target,
  Award,
  Timer,
  DollarSign,
  Percent,
  Flame
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePlans } from "@/hooks/usePlans"
import Link from "next/link"
import { PlanSelectionModal } from "./plan-selection-modal"

// Interface para planos com propriedades de renderização
interface DisplayPlan {
  id: string
  name: string
  description: string
  icon: any
  color: string
  features: string[]
  price: number
  testDays: number
  promotion: {
    active: boolean
    type: 'percentage' | 'fixed'
    value: number
    description: string
  }
  contacts: {
    melke: string
    zanesco: string
    pedro: string
  }
}

// Componente de contato flutuante
const ContactFloating = ({ contacts }: { contacts: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  const contactMethods = [
    {
      name: "Melke",
      value: contacts?.melke || "melke",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      description: "Líder Técnico"
    },
    {
      name: "Zanesco", 
      value: contacts?.zanesco || "zanesco",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      description: "Especialista"
    },
    {
      name: "Pedro",
      value: contacts?.pedro || "pedro", 
      icon: Settings,
      color: "from-green-500 to-emerald-500",
      description: "Suporte"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80"
          >
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Fale com Nossa Equipe</h3>
              <p className="text-sm text-gray-600">Escolha quem melhor pode te ajudar</p>
            </div>
            
            <div className="space-y-3">
              {contactMethods.map((contact, index) => (
                <motion.button
                  key={contact.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  onClick={() => {
                    window.open(`https://discord.gg/jp2BzA4H`, '_blank')
                    setIsOpen(false)
                  }}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer`}>
                    <contact.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}

/**
 * Componente principal de exibição de planos
 * 
 * Funcionalidades:
 * - Filtra apenas planos ativos (active: true)
 * - Mapeia planos do Firebase para incluir propriedades de renderização
 * - Integra com modal de seleção de plano
 * - Gera comprovante PDF automaticamente
 * - Cria pedido no sistema e notifica admin
 * 
 * Fluxo do usuário:
 * 1. Visualiza planos ativos
 * 2. Seleciona plano → Modal abre
 * 3. Preenche dados → Confirma
 * 4. Comprovante baixa → Pedido criado → Admin notificado
 */
export default function FreeRecommendations() {
  const { plans, loading, error } = usePlans()
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)



  // Mostrar erro se houver
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao Carregar Planos</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
          >
            Tentar Novamente
          </Button>
        </div>
      </section>
    )
  }

  // Mostrar loading enquanto carrega os dados
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando planos...</p>
        </div>
      </section>
    )
  }

  // Se não há planos ativos, mostrar mensagem
  const activePlans = plans.filter(plan => plan.active === true)
  
  if (activePlans.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nenhum Plano Disponível</h2>
          <p className="text-gray-600 mb-6">
            No momento não temos planos ativos. Entre em contato conosco para mais informações.
          </p>
          <Button
            onClick={() => window.open('https://discord.gg/jp2BzA4H', '_blank')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Falar Conosco
          </Button>
        </div>
      </section>
    )
  }

  const contacts = plans[0]?.contacts || {
    melke: "melke",
    zanesco: "zanesco", 
    pedro: "pedro"
  }

  // Filtrar apenas planos ativos e mapear para renderização
  const mappedPlans: DisplayPlan[] = plans
    .filter((plan) => plan.active === true) // Filtrar apenas planos ativos
    .map((plan) => {
      // Mapear ícones baseado no tipo do plano
      const getIcon = (planType: string) => {
        switch (planType) {
          case 'basic': return Bot
          case 'pro': return Crown
          case 'enterprise': return Rocket
          default: return Bot
        }
      }

      // Mapear cores baseado no tipo do plano
      const getColor = (planType: string) => {
        switch (planType) {
          case 'basic': return "from-blue-500 to-cyan-500"
          case 'pro': return "from-purple-500 to-pink-500"
          case 'enterprise': return "from-orange-500 to-red-500"
          default: return "from-blue-500 to-cyan-500"
        }
      }

      // Usar type assertion para acessar propriedades que podem não existir na interface Plan
      const planAny = plan as any

      return {
        ...plan,
        icon: getIcon(planAny.type || 'basic'),
        color: getColor(planAny.type || 'basic'),
        description: planAny.description || "Plano personalizado para suas necessidades",
        features: planAny.features || ["Funcionalidades personalizadas", "Suporte especializado"],
        testDays: plan.testDays || 30
      } as DisplayPlan
    })

  const formatPrice = (price: number, promotion: any) => {
    if (promotion?.active) {
      const discount = promotion.type === 'percentage' 
        ? price * (promotion.value / 100)
        : promotion.value
      const finalPrice = price - discount
      return {
        original: price,
        final: finalPrice,
        discount: discount
      }
    }
    return { original: price, final: price, discount: 0 }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Teste por 430 Dias
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experimente nossos bots por <span className="font-bold text-orange-600">430 dias gratuitos</span> e transforme seu negócio com automação inteligente
          </p>

          {/* Destaque do período de teste */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg mb-8"
          >
            <Flame className="w-5 h-5 animate-pulse" />
            <span className="font-bold">430 DIAS DE TESTE GRÁTIS</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Planos Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {mappedPlans.map((plan, index) => {
            const pricing = formatPrice(plan.price, plan.promotion)
            const IconComponent = plan.icon || Bot
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 ${
                  plan.promotion?.active 
                    ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white' 
                    : 'border-gray-200 bg-white'
                }`}>
                  
                  {/* Badge de Promoção */}
                  {plan.promotion?.active && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg">
                        <Gift className="w-4 h-4 mr-1" />
                        {plan.promotion.description}
                      </Badge>
                    </motion.div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                                          <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {plan.description}
                    </CardDescription>

                    {/* Período de Teste */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-bold text-blue-800">Período de Teste</span>
                      </div>
                      <p className="text-sm text-blue-700 font-semibold">
                        <span className="text-lg">{plan.testDays} dias</span> completamente grátis
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Preços */}
                    <div className="text-center">
                      {plan.promotion?.active ? (
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-gray-900">
                            R$ {pricing.final.toFixed(0)}
                            <span className="text-lg text-gray-500">/mês</span>
                          </div>
                          <div className="text-lg text-gray-500 line-through">
                            R$ {pricing.original.toFixed(0)}/mês
                          </div>
                          <div className="text-sm text-green-600 font-semibold">
                            Economia de R$ {pricing.discount.toFixed(0)}/mês
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-gray-900">
                          R$ {pricing.final.toFixed(0)}
                          <span className="text-lg text-gray-500">/mês</span>
                        </div>
                      )}
                    </div>

                    {/* Funcionalidades */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Funcionalidades Incluídas:
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * featureIndex }}
                            className="text-sm text-gray-600 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className={`w-full text-white transition-all duration-300 hover:shadow-xl ${
                          plan.promotion?.active 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                            : `bg-gradient-to-r ${plan.color}`
                        }`}
                        onClick={() => {
                          setSelectedPlan(plan)
                          setIsModalOpen(true)
                        }}
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        Selecionar Plano
                      </Button>
                    </motion.div>

                    {/* Garantia */}
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Cancelamento gratuito a qualquer momento</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Seção de Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Por que escolher nossos planos?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Timer,
                title: "430 Dias de Teste",
                description: "Período extenso para testar todas as funcionalidades sem compromisso"
              },
              {
                icon: Users,
                title: "Suporte Especializado",
                description: "Equipe dedicada com Melke, Zanesco e Pedro para te ajudar"
              },
              {
                icon: TrendingUp,
                title: "Resultados Garantidos",
                description: "Automação que realmente funciona e gera resultados para seu negócio"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pronto para transformar seu negócio?</h3>
            <p className="text-blue-100 mb-6">
              Junte-se a milhares de empresas que já automatizaram seus processos com nossos bots
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3"
              onClick={() => window.open('https://discord.gg/jp2BzA4H', '_blank')}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Começar Agora - 430 Dias Grátis
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Botão de Contato Flutuante */}
      <ContactFloating contacts={contacts} />

      {/* Modal de Seleção de Plano */}
      <PlanSelectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPlan(null)
        }}
        selectedPlan={selectedPlan}
      />
    </section>
  )
}
