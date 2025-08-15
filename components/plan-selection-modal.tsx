"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Loader2, Download, CheckCircle, AlertCircle } from "lucide-react"
import { ReceiptGenerator, ReceiptData } from "@/lib/receipt-generator"
import { PlanNotificationService } from "@/lib/plan-notification-service"

interface PlanSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: any
}

export function PlanSelectionModal({ isOpen, onClose, selectedPlan }: PlanSelectionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
        customerEmail: formData.email,
        customerPhone: formData.phone,
        status: 'pending'
      })

      // Gerar comprovante
      const receiptData: ReceiptData = {
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        testDays: selectedPlan.testDays,
        promotion: selectedPlan.promotion,
        customerName: formData.name,
        customerEmail: formData.email,
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
        email: "",
        phone: "",
        message: ""
      })

      // Fechar modal após 3 segundos
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
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
        email: "",
        phone: "",
        message: ""
      })
      setIsSuccess(false)
      setError(null)
    }
  }

  if (!selectedPlan) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-900">
            {isSuccess ? "Pedido Realizado com Sucesso!" : "Selecionar Plano"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess 
              ? "Seu comprovante foi baixado automaticamente e você receberá um contato em breve."
              : "Preencha seus dados para prosseguir com o plano selecionado."
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
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Campos do Formulário */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  disabled={isProcessing}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                  disabled={isProcessing}
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <Label htmlFor="message">Mensagem (Opcional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Alguma observação ou necessidade específica..."
                  rows={3}
                  disabled={isProcessing}
                />
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
                type="submit"
                disabled={isProcessing || !formData.name || !formData.email}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Confirmar e Baixar Comprovante
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
