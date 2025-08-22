"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Rocket,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Download,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Bot,
  Globe,
  Palette,
  Settings
} from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"
import FirebaseDataService from "@/lib/firebase-data-service"
import { useRouter } from "next/navigation"

interface CategoryOrderFormProps {
  category: MainCategory
  onBack: () => void
}

export default function CategoryOrderForm({ category, onBack }: CategoryOrderFormProps) {
  // Estados para controle do fluxo
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showFinalScreen, setShowFinalScreen] = useState(false)
  
  // Estados para submissão
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)
  
  const router = useRouter()

  const getCategoryColor = () => {
    switch (category.title.toLowerCase()) {
      case "bots": return "from-blue-500 to-cyan-500"
      case "sites": return "from-green-500 to-emerald-500"
      case "design": return "from-purple-500 to-pink-500"
      case "assistência": return "from-orange-500 to-red-500"
      default: return "from-blue-500 to-purple-500"
    }
  }

  const getCategoryIcon = () => {
    switch (category.title.toLowerCase()) {
      case "bots": return Bot
      case "sites": return Globe
      case "design": return Palette
      case "assistência": return Settings
      default: return Settings
    }
  }

  // Recursos disponíveis por categoria
  const getCategoryFeatures = () => {
    const featuresMap = {
      "bots": [
        { id: 'automation', name: 'Automação de Mensagens', icon: Zap, description: 'Automatize 80% das tarefas repetitivas' },
        { id: 'support', name: 'Atendimento 24/7', icon: Shield, description: 'Atendimento técnico especializado' },
        { id: 'analytics', name: 'Relatórios Detalhados', icon: TrendingUp, description: 'Métricas e insights completos' },
        { id: 'integration', name: 'Integração com CRM', icon: Target, description: 'Conecte com suas ferramentas' }
      ],
      "sites": [
        { id: 'responsive', name: 'Design Responsivo', icon: Target, description: 'Perfeito em todos os dispositivos' },
        { id: 'seo', name: 'Otimização SEO', icon: TrendingUp, description: 'Apareça no topo do Google' },
        { id: 'speed', name: 'Carregamento Rápido', icon: Zap, description: 'Velocidade de carregamento otimizada' },
        { id: 'security', name: 'Certificado SSL', icon: Shield, description: 'Segurança e proteção total' }
      ],
      "design": [
        { id: 'branding', name: 'Identidade Visual', icon: Target, description: 'Logo e identidade completa' },
        { id: 'social', name: 'Posts para Redes Sociais', icon: TrendingUp, description: 'Conteúdo para Instagram/Facebook' },
        { id: 'print', name: 'Material Impresso', icon: Shield, description: 'Cartões, folders e banners' },
        { id: 'web', name: 'Design Web', icon: Zap, description: 'Interfaces modernas e atrativas' }
      ],
      "assistência": [
        { id: 'strategy', name: 'Estratégia de Marketing', icon: Target, description: 'Planejamento estratégico completo' },
        { id: 'analytics', name: 'Análise de Dados', icon: TrendingUp, description: 'Métricas e insights detalhados' },
        { id: 'support', name: 'Suporte Técnico', icon: Shield, description: 'Atendimento especializado' },
        { id: 'optimization', name: 'Otimização Contínua', icon: Zap, description: 'Melhorias constantes' }
      ]
    }
    
    return featuresMap[category.title.toLowerCase() as keyof typeof featuresMap] || []
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

  // Função para gerar e baixar o PDF
  const generateAndDownloadPDF = async () => {
    try {
      setDownloadState('downloading')
      setDownloadProgress(0)
      
      // Simular progresso de download
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Importar jsPDF dinamicamente
      const { default: jsPDF } = await import('jspdf')
      
      const doc = new jsPDF()
      doc.setFont("helvetica")
      doc.setFontSize(20)
      
      // Título principal
      doc.setTextColor(59, 130, 246)
      doc.text("COMPROVANTE DE SOLICITAÇÃO", 105, 30, { align: "center" })
      
      // Linha separadora
      doc.setDrawColor(59, 130, 246)
      doc.setLineWidth(0.5)
      doc.line(20, 40, 190, 40)
      
      // Informações do comprovante
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      
      const currentDate = new Date()
      const formattedDate = currentDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      
      const data = [
        { label: "Data e Hora:", value: formattedDate },
        { label: "Categoria Solicitada:", value: category.title },
        { label: "Descrição:", value: category.description },
      ]

      // Adicionar recursos selecionados
      if (selectedFeatures.length > 0) {
        const features = getCategoryFeatures()
        const selectedFeatureNames = selectedFeatures.map(id => 
          features.find(f => f.id === id)?.name
        ).filter(Boolean)
        data.push({ label: "Recursos:", value: selectedFeatureNames.join(', ') })
      }
      
      let yPosition = 60
      data.forEach((item) => {
        doc.setFont("helvetica", "bold")
        doc.text(item.label, 20, yPosition)
        
        doc.setFont("helvetica", "normal")
        const valueX = 20 + doc.getTextWidth(item.label) + 5
        doc.text(item.value, valueX, yPosition)
        
        yPosition += 15
      })
      
      // Status da solicitação
      yPosition += 10
      doc.setFont("helvetica", "bold")
      doc.setTextColor(59, 130, 246)
      doc.text("Status da Solicitação", 20, yPosition)
      
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      yPosition += 10
      doc.text("✅ Solicitação recebida com sucesso", 20, yPosition)
      yPosition += 8
      doc.text("⏳ Aguardando análise da equipe", 20, yPosition)
      yPosition += 8
      doc.text("📞 Entraremos em contato em breve", 20, yPosition)
      
      // Rodapé
      yPosition += 20
      doc.setFontSize(10)
      doc.setTextColor(107, 114, 128)
      doc.text("CodeForge - Transformando ideias em realidade", 105, yPosition, { align: "center" })
      
      // Gerar nome do arquivo
      const fileName = `comprovante_${category.title.toLowerCase()}_${currentDate.toISOString().split('T')[0]}.pdf`
      
      setDownloadProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      doc.save(fileName)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setDownloadState('completed')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar o comprovante. Tente novamente.')
      setDownloadState('idle')
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const firebaseService = FirebaseDataService.getInstance()
      
      // Criar dados completos do pedido
      const orderData = {
        customerName: "Cliente",
        customerEmail: "",
        customerPhone: "",
        projectType: category.title,
        category: category.title,
        description: category.description,
        features: selectedFeatures,
        budget: "",
        timeline: "",
        status: 'pending' as const,
        assignedTo: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        notes: `Solicitação com recursos: ${selectedFeatures.join(', ') || 'Nenhum'}`,
      }

      await firebaseService.addOrder(orderData)
      await generateAndDownloadPDF()
      
      setIsSubmitting(false)
      setIsSuccessDialogOpen(true)
    } catch (error) {
      console.error('Erro ao enviar pedido:', error)
      setIsSubmitting(false)
      setDownloadState('idle')
      alert('Erro ao enviar pedido. Tente novamente.')
    }
  }

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false)
    router.push('/categorias')
  }

  const handleCompletedClick = () => {
    router.push('/categorias')
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

  // Etapa 1: Informações da categoria
  const renderStep1 = () => {
    const IconComponent = getCategoryIcon()
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {category.title}
              </h1>
              <p className="text-lg text-gray-600">
                {category.description}
              </p>
            </div>

            {/* Card da Categoria */}
            <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    O que você receberá:
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Solução personalizada para seu negócio</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Suporte técnico especializado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Entrega dentro do prazo acordado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Garantia de qualidade</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={onBack}
                className="px-6 py-3"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleNext}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white`}
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 2: Seleção de recursos
  const renderStep2 = () => {
    const IconComponent = getCategoryIcon()
    const features = getCategoryFeatures()
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Personalize seu {category.title}
              </h1>
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
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white`}
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 3: Resumo e confirmação
  const renderStep3 = () => {
    const IconComponent = getCategoryIcon()
    const features = getCategoryFeatures()
    const selectedFeatureNames = selectedFeatures.map(id => 
      features.find(f => f.id === id)?.name
    ).filter(Boolean)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Resumo da Solicitação
              </h1>
              <p className="text-lg text-gray-600">
                Confirme os detalhes antes de prosseguir
              </p>
            </div>

            {/* Resumo */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Categoria:</span>
                  <span className="text-gray-900">{category.title}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Descrição:</span>
                  <span className="text-gray-900">{category.description}</span>
                </div>
                
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
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white`}
              >
                Confirmar e Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Tela final simplificada
  if (showFinalScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-12">
                  {/* Ícone e Título */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className={`w-24 h-24 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                    >
                      <Rocket className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl font-bold text-gray-900 mb-4"
                    >
                      Tudo certo até aqui! 🚀
                    </motion.h1>
                    
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
                      disabled={isSubmitting || downloadState === 'downloading'}
                      className={`w-full py-6 text-xl bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-2xl transition-all duration-300 rounded-2xl font-bold text-lg`}
                      size="lg"
                    >
                      {isSubmitting ? (
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
                          title="Clique para voltar às categorias"
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
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar etapas normais
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Dialog de Sucesso */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
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
            <Button onClick={handleSuccessDialogClose} className="w-full">
              Voltar às Categorias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
