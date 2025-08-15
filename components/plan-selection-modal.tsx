"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Loader2, Download, CheckCircle, AlertCircle, User, Target, Shield, Check, Gift, MessageCircle, Mail, Phone, Bot, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { ReceiptGenerator, ReceiptData } from "@/lib/receipt-generator"
import { PlanNotificationService } from "@/lib/plan-notification-service"
import CompletionButton from "@/components/completion-button"

interface PlanSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: any
}

export function PlanSelectionModal({ isOpen, onClose, selectedPlan }: PlanSelectionModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contactMethods: {
      whatsapp: false,
      email: false,
      phone: false,
      discord: false
    },
    additionalInfo: ""
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleContactMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      contactMethods: {
        ...prev.contactMethods,
        [method]: checked
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    try {
      // Criar ordem no sistema
      const order = await PlanNotificationService.createPlanOrder({
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        testDays: selectedPlan.testDays,
        promotion: selectedPlan.promotion,
        customerName: formData.name,
        customerEmail: "", // Será preenchido no contato final
        customerPhone: "", // Será preenchido no contato final
        status: 'pending'
      })

      // Gerar comprovante
      const receiptData: ReceiptData = {
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        testDays: selectedPlan.testDays,
        promotion: selectedPlan.promotion,
        customerName: formData.name,
        customerEmail: "", // Será preenchido no contato final
        orderDate: new Date(),
        orderId: order.id
      }

      // Download do comprovante
      ReceiptGenerator.downloadReceipt(receiptData)

      // Marcar como sucesso
      setIsSuccess(true)

      // Limpar formulário
      setFormData({
        name: "",
        company: "",
        contactMethods: {
          whatsapp: false,
          email: false,
          phone: false,
          discord: false
        },
        additionalInfo: ""
      })

      // Fechar modal após 3 segundos
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        setCurrentStep(1)
      }, 3000)

    } catch (err) {
      setError("Erro ao processar pedido. Tente novamente.")
      console.error("Erro ao processar pedido:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing) {
      onClose()
      setFormData({
        name: "",
        company: "",
        contactMethods: {
          whatsapp: false,
          email: false,
          phone: false,
          discord: false
        },
        additionalInfo: ""
      })
      setIsSuccess(false)
      setError(null)
      setCurrentStep(1)
    }
  }

  if (!selectedPlan) return null

  // Renderizar etapa 1: Dados básicos
  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vamos nos conhecer melhor! 👋
        </h2>
        <p className="text-gray-600">
          Primeiro, precisamos conhecer você para criar a solução perfeita
        </p>
      </div>

      {/* Campos do Formulário */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome completo *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Como devemos te chamar?"
            required
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="company" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Empresa/Projeto
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Nome da sua empresa ou projeto"
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Seção de Benefícios */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Dados 100% seguros</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-600" />
            <span>Sem spam</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-purple-600" />
            <span>Proposta gratuita</span>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          disabled={isProcessing || !formData.name}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  // Renderizar etapa 2: Formas de contato
  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Como prefere ser contatado? 📞
        </h2>
        <p className="text-gray-600">
          Escolha suas formas preferidas de comunicação para acompanharmos seu projeto
        </p>
      </div>

      {/* Cards de Formas de Contato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'whatsapp', name: 'WhatsApp', description: 'Resposta instantânea', icon: MessageCircle, color: 'from-green-500 to-green-600' },
          { id: 'email', name: 'E-mail', description: 'Documentação completa', icon: Mail, color: 'from-blue-500 to-blue-600' },
          { id: 'phone', name: 'Telefone', description: 'Conversa direta', icon: Phone, color: 'from-pink-500 to-pink-600' },
          { id: 'discord', name: 'Discord', description: 'Comunidade ativa', icon: Bot, color: 'from-purple-500 to-purple-600' }
        ].map((method) => {
          const IconComponent = method.icon
          return (
            <div
              key={method.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                formData.contactMethods[method.id as keyof typeof formData.contactMethods]
                  ? `border-purple-500 bg-gradient-to-br ${method.color} bg-opacity-10`
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handleContactMethodChange(method.id, !formData.contactMethods[method.id as keyof typeof formData.contactMethods])}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  formData.contactMethods[method.id as keyof typeof formData.contactMethods]
                    ? `bg-gradient-to-br ${method.color}`
                    : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    formData.contactMethods[method.id as keyof typeof formData.contactMethods]
                      ? 'text-white'
                      : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isProcessing}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <Button
          type="button"
          onClick={nextStep}
          disabled={isProcessing || !Object.values(formData.contactMethods).some(Boolean)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )

  // Renderizar etapa 3: Informações adicionais e envio
  const renderStep3 = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informações adicionais ✨
        </h2>
        <p className="text-gray-600">
          Conte-nos mais sobre seu projeto para criarmos a solução ideal
        </p>
      </div>

      {/* Resumo do Plano */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">{selectedPlan.name}</h4>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            R$ {selectedPlan.price.toFixed(2)}
            <span className="text-sm font-normal text-gray-600">/mês</span>
          </span>
          <span className="text-sm text-blue-600 font-medium">
            {selectedPlan.testDays} dias de teste
          </span>
        </div>
        {selectedPlan.promotion?.active && (
          <div className="mt-2 text-sm text-green-600 font-medium">
            {selectedPlan.promotion.description}
          </div>
        )}
      </div>

      {/* Campo de Informações Adicionais */}
      <div>
        <Label htmlFor="additionalInfo" className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Informações adicionais
        </Label>
        <Textarea
          id="additionalInfo"
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
          placeholder="Links de referência, exemplos, requisitos específicos, ou qualquer outra informação que considere importante para entendermos melhor seu projeto..."
          rows={4}
          disabled={isProcessing}
        />
      </div>

      {/* Banner de Proposta */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Pronto para transformar sua ideia em realidade?</h3>
        </div>
        <p className="text-gray-600 mb-3">
          Envie sua solicitação e receba uma proposta personalizada em até 24 horas!
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            <span>Proposta gratuita</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            <span>Sem compromisso</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-600" />
            <span>Resposta em 24h</span>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isProcessing}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <Button
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Enviar Solicitação
            </>
          )}
        </Button>
      </div>
    </form>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            {isSuccess ? "Pedido Realizado com Sucesso!" : `Etapa ${currentStep} de 3`}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess 
              ? "Seu comprovante foi baixado automaticamente e você receberá um contato em breve."
              : "Preencha as informações para prosseguir com o plano selecionado."
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plano {selectedPlan.name} Selecionado
            </h3>
            <p className="text-gray-600 mb-4">
              R$ {selectedPlan.price.toFixed(2)}/mês • {selectedPlan.testDays} dias de teste
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <Download className="w-4 h-4" />
              <span>Comprovante baixado automaticamente</span>
            </div>
          </motion.div>
        ) : (
          <>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">{error}</span>
              </motion.div>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </>
        )}

        {/* Estado de Sucesso */}
        {isSuccess && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pedido Confirmado!
              </h3>
              <p className="text-gray-600 mb-6">
                Seu comprovante foi baixado automaticamente. 
                Entraremos em contato em breve!
              </p>
            </div>
            <CompletionButton />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
