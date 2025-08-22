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
  ArrowLeft,
  Download,
  MessageCircle
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SejaAgentePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)

  const getCategoryColor = () => {
    return "from-purple-500 to-pink-500"
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
      doc.text("COMPROVANTE DE CANDIDATURA", 105, 30, { align: "center" })
      
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
        { label: "Candidatura:", value: "Seja Agente" },
        { label: "Categoria:", value: "Recrutamento" },
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
      doc.text("Status da Candidatura", 20, yPosition)
      
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      yPosition += 10
      doc.text("✅ Candidatura recebida com sucesso", 20, yPosition)
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
      const fileName = `comprovante_candidatura_${currentDate.toISOString().split('T')[0]}.pdf`
      
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
      // Aqui você pode adicionar a lógica para salvar no Firebase se necessário
      await generateAndDownloadPDF()
      
      setIsSubmitting(false)
      setIsSuccessDialogOpen(true)
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error)
      setIsSubmitting(false)
      setDownloadState('idle')
      alert('Erro ao enviar candidatura. Tente novamente.')
    }
  }

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false)
    router.push('/ajuda')
  }

  const handleCompletedClick = () => {
    router.push('/ajuda')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.push('/ajuda')}
            className="mb-6 px-6 py-3 text-lg rounded-xl border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-12">
              {/* Ícone e Título */}
              <div className="text-center mb-8">
                <div className={`w-24 h-24 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                  <Rocket className="w-12 h-12 text-white" />
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Tudo certo até aqui! 🚀
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Envie sua candidatura e baixe o comprovante.
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
                  disabled={isSubmitting || downloadState === 'downloading'}
                  className={`w-full py-6 text-xl bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-2xl transition-all duration-300 rounded-2xl font-bold text-lg`}
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Enviando candidatura...
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
                      title="Clique para voltar à ajuda"
                    >
                      <CheckCircle className="w-6 h-6" />
                      Concluído!
                      <Sparkles className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Download className="w-6 h-6" />
                      Enviar Candidatura e Baixar Comprovante
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de Sucesso */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600 text-xl">
              <CheckCircle className="w-6 h-6" />
              Candidatura Enviada com Sucesso! 🎉
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Sua candidatura foi enviada com sucesso! Entre em contato via WhatsApp e envie seu comprovante para uma resposta mais rápida.
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
              Voltar à Ajuda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
