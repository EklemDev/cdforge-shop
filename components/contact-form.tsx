"use client"

import { useState } from "react"
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
  Download,
  MessageCircle
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useOrders } from "@/hooks/useFirebaseData"

interface ContactFormProps {
  serviceType: string
  serviceName: string
  serviceColor: string
  onSubmit: (data: any) => Promise<void>
}

export default function ContactForm({ serviceType, serviceName, serviceColor, onSubmit }: ContactFormProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const { addOrder } = useOrders()

  const getServiceColor = () => {
    switch (serviceType.toLowerCase()) {
      case "bot": return "from-blue-500 to-cyan-500"
      case "site": return "from-green-500 to-emerald-500"
      case "design": return "from-purple-500 to-pink-500"
      case "service": return "from-orange-500 to-red-500"
      default: return "from-blue-500 to-purple-500"
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
        { label: "Serviço Solicitado:", value: serviceName },
        { label: "Tipo de Serviço:", value: serviceType },
      ]
      
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
      const fileName = `comprovante_${serviceType.toLowerCase()}_${currentDate.toISOString().split('T')[0]}.pdf`
      
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
    setLoading(true)
    try {
      // Salvar pedido no Firebase
      await addOrder({
        customerName: "Cliente",
        customerEmail: "",
        customerPhone: "",
        projectType: serviceType as 'bot' | 'site' | 'design' | 'service',
        category: serviceName,
        description: `Solicitação de ${serviceName}`,
        budget: "",
        timeline: "",
        status: 'pending',
        assignedTo: '',
        priority: 'medium',
        notes: `Solicitação simplificada - Cliente deve entrar em contato via WhatsApp`
      })

      // Gerar e baixar o PDF
      await generateAndDownloadPDF()

      // Chamar função original de onSubmit se existir
      if (onSubmit) {
        await onSubmit({
          serviceType,
          serviceName,
        })
      }
      
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      })
      setDownloadState('idle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-12">
          {/* Ícone e Título */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 bg-gradient-to-r ${getServiceColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
              <Rocket className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tudo certo até aqui! 🚀
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Envie sua solicitação e baixe o comprovante.
            </p>
          </div>

          {/* Mensagem Adicional */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 mb-8">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Entre em contato e envie seu comprovante via WhatsApp para garantir uma resposta mais rápida e segura.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Principal */}
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={loading || downloadState === 'downloading'}
              className={`w-full py-6 text-xl bg-gradient-to-r ${getServiceColor()} text-white hover:shadow-2xl transition-all duration-300 rounded-2xl font-bold text-lg`}
              size="lg"
            >
              {loading ? (
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
                <div className="flex items-center gap-3">
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
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Sucesso */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
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
            <Button onClick={() => setShowSuccessModal(false)} className="w-full">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
