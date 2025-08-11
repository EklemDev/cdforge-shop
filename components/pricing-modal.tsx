"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  bot: {
    title: string
    icon: any
    color: string
    buttonColor: string
  }
  plan: {
    name: string
    price: number
    features: string[]
  }
}

export default function PricingModal({ isOpen, onClose, bot, plan }: PricingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">Comprar Plano: {plan.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bot Info */}
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: bot.color + "20" }}
            >
              {typeof bot.icon === "string" ? (
                <img
                  src={bot.icon || "/placeholder.svg"}
                  alt={`${bot.title} logo`}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <bot.icon className="w-8 h-8" style={{ color: bot.color }} />
              )}
            </div>
            <h3 className="font-semibold text-gray-900">{bot.title}</h3>
            <Badge className="text-white mt-2 border-0" style={{ backgroundColor: bot.color }}>
              {plan.name} - R$ {plan.price}/mês
            </Badge>
          </div>

          {/* Plan Features */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Funcionalidades incluídas:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: bot.color + "10" }}>
            <p className="text-sm text-gray-700 mb-3">
              Para comprar o plano e ser adicionado ao servidor do seu plano ({plan.name}), você precisa entrar em
              contato com o <strong>M E L K E</strong> no Discord.
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Instruções:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Acesse o servidor do Discord</li>
                <li>
                  Procure pelo usuário <strong>M E L K E</strong>
                </li>
                <li>Pergunte sobre o plano {plan.name}</li>
                <li>Aguarde o retorno para finalizar a compra</li>
              </ol>
            </div>
          </div>

          {/* Action Button */}
          <Button asChild className={`w-full text-white ${bot.buttonColor}`}>
            <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
              Acessar Discord
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
