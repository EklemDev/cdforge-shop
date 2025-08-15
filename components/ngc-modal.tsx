"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  FileText,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"

interface NGCModalProps {
  isOpen: boolean
  onClose: () => void
  selectedContactMethod: string
  category: MainCategory
  customerName: string
  onComplete: () => void
}

// Configuração dos métodos de contato
const contactMethodConfig = {
  whatsapp: {
    label: "WhatsApp",
    icon: "💬",
    placeholder: "Digite seu número do WhatsApp",
    type: "tel",
    description: "Receba respostas instantâneas via WhatsApp"
  },
  email: {
    label: "E-mail",
    icon: "📧",
    placeholder: "Digite seu e-mail",
    type: "email",
    description: "Receba documentação completa por e-mail"
  },
  phone: {
    label: "Telefone",
    icon: "📞",
    placeholder: "Digite seu número de telefone",
    type: "tel",
    description: "Conversa direta com nossa equipe"
  },
  discord: {
    label: "Discord",
    icon: "🎮",
    placeholder: "Digite seu usuário do Discord",
    type: "text",
    description: "Participe da nossa comunidade ativa"
  }
}

export default function NGCModal({ 
  isOpen, 
  onClose, 
  selectedContactMethod, 
  category, 
  customerName,
  onComplete 
}: NGCModalProps) {
  // Estados do componente
  const [contactValue, setContactValue] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)

  // Configuração do método de contato selecionado
  const config = contactMethodConfig[selectedContactMethod as keyof typeof contactMethodConfig] || contactMethodConfig.whatsapp

  // Função para confirmar o método de contato
  const handleConfirmContact = () => {
    if (!contactValue.trim()) {
      return
    }

    setIsConfirming(true)
    
    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      setIsConfirming(false)
      onComplete()
    }, 800)
  }

  // Função para resetar o modal
  const handleClose = () => {
    setContactValue("")
    setIsConfirming(false)
    onClose()
  }

  // Se não há método de contato válido, não renderiza o modal
  if (!selectedContactMethod || !contactMethodConfig[selectedContactMethod as keyof typeof contactMethodConfig]) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key="contact-confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                <FileText className="w-6 h-6 text-blue-600" />
                Confirmar Método de Contato
              </DialogTitle>
              <DialogDescription>
                Confirme suas informações para que possamos entrar em contato
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Informações da categoria */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-blue-900">
                      Categoria Selecionada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">
                          {category.title === 'BOTS' ? '🤖' :
                           category.title === 'SITES' ? '🌐' :
                           category.title === 'DESIGN' ? '🎨' : '⚙️'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">{category.title}</h4>
                        <p className="text-sm text-blue-700">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Método de contato selecionado */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-green-900">
                      Método de Contato Escolhido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">{config.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">{config.label}</h4>
                        <p className="text-sm text-green-700">{config.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Campo de contato */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium">
                    Seu {config.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id="contact"
                      type={config.type}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={config.placeholder}
                      className="pr-10"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                      {config.icon}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Usaremos este contato para enviar sua proposta personalizada
                  </p>
                </div>

                {/* Informações do cliente */}
                <Card className="border-gray-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customerName}</p>
                        <p className="text-xs text-gray-500">Cliente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full sm:w-auto"
                  disabled={isConfirming}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmContact}
                  disabled={!contactValue.trim() || isConfirming}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                >
                  {isConfirming ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Confirmando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Confirmar Contato
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
