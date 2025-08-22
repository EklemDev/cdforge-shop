"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Download, 
  CheckCircle, 
  Sparkles, 
  Rocket, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Star,
  Gift,
  Clock
} from "lucide-react"
import { ReceiptGenerator, ReceiptData } from "@/lib/receipt-generator"
import { PlanNotificationService } from "@/lib/plan-notification-service"

interface PlanSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: any
}

export function PlanSelectionModal({ isOpen, onClose, selectedPlan }: PlanSelectionModalProps) {
  // Estados para controle do fluxo
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showFinalScreen, setShowFinalScreen] = useState(false)
  
  // Estados para submissão
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Recursos disponíveis por tipo de plano
  const getPlanFeatures = () => {
    const featuresMap = {
      "bot": [
        { id: 'automation', name: 'Automação Completa', icon: Zap, description: 'Automatize 80% das tarefas repetitivas' },
        { id: 'support', name: 'Suporte 24/7', icon: Shield, description: 'Atendimento técnico especializado' },
        { id: 'analytics', name: 'Relatórios Detalhados', icon: TrendingUp, description: 'Métricas e insights completos' },
        { id: 'integration', name: 'Integração Total', icon: Target, description: 'Conecte com suas ferramentas' }
      ],
      "site": [
        { id: 'responsive', name: 'Design Responsivo', icon: Target, description: 'Perfeito em todos os dispositivos' },
        { id: 'seo', name: 'Otimização SEO', icon: TrendingUp, description: 'Apareça no topo do Google' },
        { id: 'speed', name: 'Carregamento Rápido', icon: Zap, description: 'Velocidade de carregamento otimizada' },
        { id: 'security', name: 'Segurança Total', icon: Shield, description: 'Certificado SSL e proteção' }
      ],
      "design": [
        { id: 'branding', name: 'Identidade Visual', icon: Target, description: 'Logo e identidade completa' },
        { id: 'social', name: 'Posts para Redes', icon: TrendingUp, description: 'Conteúdo para Instagram/Facebook' },
        { id: 'print', name: 'Material Impresso', icon: Shield, description: 'Cartões, folders e banners' },
        { id: 'web', name: 'Design Web', icon: Zap, description: 'Interfaces modernas e atrativas' }
      ]
    }
    
    // Determinar tipo baseado no nome do plano
    const planType = selectedPlan.name.toLowerCase().includes('bot') ? 'bot' : 
                    selectedPlan.name.toLowerCase().includes('site') ? 'site' : 'design'
    
    return featuresMap[planType as keyof typeof featuresMap] || []
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowFinalScreen(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      // Simular progresso de download
      setDownloadState('downloading')
      setDownloadProgress(0)
      
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Criar ordem no sistema
      const order = await PlanNotificationService.createPlanOrder({
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        testDays: selectedPlan.testDays,
        promotion: selectedPlan.promotion,
        customerName: "Cliente",
        customerEmail: "",
        customerPhone: "",
        status: 'pending'
      })

      // Gerar comprovante
      const receiptData: ReceiptData = {
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        testDays: selectedPlan.testDays,
        promotion: selectedPlan.promotion,
        customerName: "Cliente",
        customerEmail: "",
        orderDate: new Date(),
        orderId: order.id
      }

      // Download do comprovante
      ReceiptGenerator.downloadReceipt(receiptData)

      setDownloadProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setDownloadState('completed')
      await new Promise(resolve => setTimeout(resolve, 800))

      // Marcar como sucesso
      setIsSuccess(true)

    } catch (err) {
      console.error('Erro ao processar solicitação:', err)
      setError('Erro ao processar solicitação. Tente novamente.')
      setDownloadState('idle')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing) {
      onClose()
      // Resetar estados
      setCurrentStep(1)
      setSelectedFeatures([])
      setShowFinalScreen(false)
      setIsSuccess(false)
      setDownloadState('idle')
      setDownloadProgress(0)
      setError(null)
    }
  }

  const handleCompletedClick = () => {
    onClose()
  }

  // Renderizar etapa específica
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      default:
        return renderStep1()
    }
  }

  // Etapa 1: Informações do plano
  const renderStep1 = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Plano Selecionado
          </h2>
          <p className="text-lg text-gray-600">
            Confirme os detalhes do seu plano
          </p>
        </div>

        {/* Card do Plano */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedPlan.name}
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                R$ {selectedPlan.price.toFixed(2)}/mês
              </div>
              
              {selectedPlan.testDays && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">
                    {selectedPlan.testDays} dias de teste grátis
                  </span>
                </div>
              )}
              
              {selectedPlan.promotion && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-yellow-600 font-semibold">
                    {selectedPlan.promotion}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Ativação imediata</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Navegação */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleClose}
            className="px-6 py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Continuar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    )
  }

  // Etapa 2: Seleção de recursos
  const renderStep2 = () => {
    const features = getPlanFeatures()
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Personalize seu Plano
          </h2>
          <p className="text-lg text-gray-600">
            Selecione os recursos que deseja incluir
          </p>
        </div>

        {/* Grid de Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature) => {
            const FeatureIcon = feature.icon
            const isSelected = selectedFeatures.includes(feature.id)
            
            return (
              <Card
                key={feature.id}
                className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleFeatureToggle(feature.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <FeatureIcon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {feature.name}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="px-6 py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Continuar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    )
  }

  // Etapa 3: Resumo e confirmação
  const renderStep3 = () => {
    const features = getPlanFeatures()
    const selectedFeatureNames = selectedFeatures.map(id => 
      features.find(f => f.id === id)?.name
    ).filter(Boolean)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Resumo da Solicitação
          </h2>
          <p className="text-lg text-gray-600">
            Confirme os detalhes antes de prosseguir
          </p>
        </div>

        {/* Resumo */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Plano:</span>
              <span className="text-gray-900">{selectedPlan.name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Valor:</span>
              <span className="text-gray-900">R$ {selectedPlan.price.toFixed(2)}/mês</span>
            </div>
            
            {selectedPlan.testDays && (
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Teste grátis:</span>
                <span className="text-gray-900">{selectedPlan.testDays} dias</span>
              </div>
            )}
            
            {selectedFeatureNames.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Recursos selecionados:</span>
                <div className="mt-2 space-y-1">
                  {selectedFeatureNames.map((name, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-900">
                      <Check className="w-4 h-4 text-green-500" />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="px-6 py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            Confirmar e Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    )
  }

  // Tela final simplificada
  if (showFinalScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Rocket className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Tudo certo até aqui! 🚀
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Envie sua solicitação e baixe o comprovante.
          </motion.p>
        </div>

        {/* Mensagem Adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 mb-8"
        >
          <div className="flex items-start gap-3">
            <MessageCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Entre em contato e envie seu comprovante via WhatsApp para garantir uma resposta mais rápida e segura.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Botão Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleSubmit}
            disabled={isProcessing || downloadState === 'downloading'}
            className="w-full py-6 text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl transition-all duration-300 rounded-2xl font-bold text-lg"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Enviando solicitação...
              </div>
            ) : downloadState === 'downloading' ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Baixando Comprovante...
                <span className="text-sm">({downloadProgress}%)</span>
              </div>
            ) : downloadState === 'completed' ? (
              <div 
                className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={handleCompletedClick}
                title="Clique para fechar"
              >
                <CheckCircle className="w-6 h-6" />
                Concluído!
                <Sparkles className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Download className="w-6 h-6" />
                Enviar Solicitação e Baixar Comprovante
                <Sparkles className="w-5 h-5" />
              </div>
            )}
          </Button>
        </motion.div>

        {/* Mensagem de erro */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-700 text-center">{error}</p>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Solicitar {selectedPlan.name}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Plano selecionado: R$ {selectedPlan.price.toFixed(2)}/mês
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Dialog de Sucesso */}
        {isSuccess && (
          <Dialog open={isSuccess} onOpenChange={() => setIsSuccess(false)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-green-600 text-xl">
                  <CheckCircle className="w-6 h-6" />
                  Solicitação Enviada com Sucesso! 🎉
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  Sua solicitação foi enviada com sucesso! Entre em contato via WhatsApp e envie seu comprovante para uma resposta mais rápida.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Próximos passos:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Baixe o comprovante (já feito)</li>
                  <li>• Entre em contato via WhatsApp</li>
                  <li>• Envie o comprovante</li>
                  <li>• Receba resposta em até 24h</li>
                </ul>
              </div>
              <DialogFooter>
                <Button onClick={handleClose} className="w-full">
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}
