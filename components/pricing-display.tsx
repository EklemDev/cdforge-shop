"use client"

import { usePricingSync } from "@/hooks/usePricingSync"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Globe, Palette, Check, Star } from "lucide-react"
import { useState } from "react"
import OrderForm from "./order-form"

export default function PricingDisplay() {
  const { getActivePlans } = usePricingSync()
  const [showOrderForm, setShowOrderForm] = useState(false)

  const botPlans = getActivePlans('bots')
  const sitePlans = getActivePlans('sites')
  const designPlans = getActivePlans('design')

  const serviceConfigs = [
    {
      title: "Bots Discord",
      icon: Bot,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      plans: botPlans
    },
    {
      title: "Sites Web",
      icon: Globe,
      color: "text-green-600",
      bgColor: "bg-green-50",
      plans: sitePlans
    },
    {
      title: "Design Gráfico",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      plans: designPlans
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Preços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos transparentes e competitivos para todos os nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceConfigs.map((service, serviceIndex) => (
            <div key={serviceIndex} className="space-y-6">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} rounded-full mb-4`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
              </div>

              <div className="space-y-4">
                {service.plans.map((plan, planIndex) => (
                  <Card key={plan.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {planIndex === 1 && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                        <Star className="w-3 h-3 inline mr-1" />
                        Popular
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {plan.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {planIndex === 0 ? "Básico" : planIndex === 1 ? "Premium" : "Enterprise"}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-gray-600">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-3xl font-bold text-gray-900">
                            R$ {plan.price.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">/projeto</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <p className="text-sm font-medium text-gray-700">Inclui:</p>
                        <ul className="space-y-2">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                                             <Button 
                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                         size="lg"
                         onClick={() => setShowOrderForm(true)}
                       >
                         Solicitar Orçamento
                       </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

                 <div className="mt-12 text-center">
           <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
             <h3 className="text-xl font-semibold text-gray-900 mb-2">
               Preços Sincronizados em Tempo Real
             </h3>
             <p className="text-gray-600">
               Todos os preços são atualizados automaticamente pelo nosso sistema administrativo
             </p>
           </div>
         </div>
       </div>

       {/* Modal do Formulário de Pedido */}
       {showOrderForm && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
             <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">
                   Solicitar Orçamento
                 </h2>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setShowOrderForm(false)}
                   className="text-gray-500 hover:text-gray-700"
                 >
                   ✕
                 </Button>
               </div>
               <OrderForm />
             </div>
           </div>
         </div>
       )}
     </section>
   )
 }
