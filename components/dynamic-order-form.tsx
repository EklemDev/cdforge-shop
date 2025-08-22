"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { 
  Rocket,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Download,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Bot,
  Globe,
  Palette,
  Settings,
  MessageSquare,
  Instagram,
  Monitor,
  Zap,
  Target,
  Shield,
  TrendingUp,
  ArrowRight,
  Check,
  User,
  Mail,
  Phone,
  MessageSquare as DiscordIcon,
  Clock,
  DollarSign,
  AlertTriangle,
  Star,
  Gift
} from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"
import FirebaseDataService from "@/lib/firebase-data-service"
import { useRouter } from "next/navigation"
import Image from "next/image"
import jsPDF from 'jspdf'

interface DynamicOrderFormProps {
  category: MainCategory
  onBack: () => void
}

export default function DynamicOrderForm({ category, onBack }: DynamicOrderFormProps) {
  // Estados para controle do fluxo
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showFinalScreen, setShowFinalScreen] = useState(false)
  
  // Estados para dados do cliente
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    discord: ''
  })
  
  // Estados para descrição do projeto
  const [projectDescription, setProjectDescription] = useState({
    howItShouldBe: '',
    howItShouldBeDone: ''
  })
  
  // Estados para orçamento e prazo
  const [budget, setBudget] = useState<string>('')
  const [timeline, setTimeline] = useState<string>('')
  const [urgency, setUrgency] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal')
  
  // Estados para botões de atalho de descrição
  const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([])
  
  // Estados para submissão
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)
  
  const router = useRouter()
  const { toast } = useToast()

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

  // Plataformas disponíveis para bots
  const platforms = [
    { 
      id: 'whatsapp', 
      name: 'WhatsApp', 
      description: 'Automação para WhatsApp Business',
      logo: '/whatsapp.png',
      icon: MessageSquare
    },
    { 
      id: 'discord', 
      name: 'Discord', 
      description: 'Bots para servidores Discord',
      logo: '/discord.png',
      icon: Bot
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      description: 'Automação para Instagram',
      logo: '/instagram.png',
      icon: Instagram
    },
    { 
      id: 'web', 
      name: 'Website', 
      description: 'Web Scraping e automação web',
              logo: '/logo.svg',
      icon: Monitor
    }
  ]

  // Recursos disponíveis por categoria
  const getCategoryFeatures = () => {
    const featuresMap = {
      "bots": [
        { id: 'automation', name: 'Automação de Mensagens', icon: Zap },
        { id: 'support', name: 'Atendimento 24/7', icon: Shield },
        { id: 'analytics', name: 'Relatórios Detalhados', icon: TrendingUp },
        { id: 'integration', name: 'Integração com CRM', icon: Target }
      ],
      "sites": [
        { id: 'responsive', name: 'Design Responsivo', icon: Monitor },
        { id: 'seo', name: 'Otimização SEO', icon: TrendingUp },
        { id: 'speed', name: 'Carregamento Rápido', icon: Zap },
        { id: 'security', name: 'Certificado SSL', icon: Shield }
      ],
      "design": [
        { id: 'branding', name: 'Identidade Visual', icon: Palette },
        { id: 'social', name: 'Posts para Redes Sociais', icon: Instagram },
        { id: 'print', name: 'Material Impresso', icon: Target },
        { id: 'web', name: 'Design Web', icon: Globe }
      ],
      "assistência": [
        { id: 'strategy', name: 'Estratégia de Marketing', icon: Target },
        { id: 'analytics', name: 'Análise de Dados', icon: TrendingUp },
        { id: 'support', name: 'Suporte Técnico', icon: Shield },
        { id: 'optimization', name: 'Otimização Contínua', icon: Zap }
      ]
    }
    
    return featuresMap[category.title.toLowerCase() as keyof typeof featuresMap] || []
  }

  // Opções de orçamento por categoria
  const getBudgetOptions = () => {
    const budgetMap = {
      "bots": [
        { value: '15-50', label: 'R$ 15 - R$ 50', description: 'Bot básico com automação simples' },
        { value: '50-100', label: 'R$ 50 - R$ 100', description: 'Bot intermediário com recursos avançados' },
        { value: '100-200', label: 'R$ 100 - R$ 200', description: 'Bot completo com integrações' },
        { value: '200-250', label: 'R$ 200 - R$ 250', description: 'Bot premium com IA e analytics' },
        { value: 'flexible', label: 'Vamos conversar', description: 'Orçamento flexível para projetos complexos' }
      ],
      "sites": [
        { value: '50-100', label: 'R$ 50 - R$ 100', description: 'Site básico responsivo' },
        { value: '100-200', label: 'R$ 100 - R$ 200', description: 'Site com SEO e otimizações' },
        { value: '200-300', label: 'R$ 200 - R$ 300', description: 'Site completo com funcionalidades' },
        { value: '300-500', label: 'R$ 300 - R$ 500', description: 'Site premium com e-commerce' },
        { value: 'flexible', label: 'Vamos conversar', description: 'Orçamento flexível para projetos complexos' }
      ],
      "design": [
        { value: '30-80', label: 'R$ 30 - R$ 80', description: 'Logo e identidade básica' },
        { value: '80-150', label: 'R$ 80 - R$ 150', description: 'Identidade visual completa' },
        { value: '150-250', label: 'R$ 150 - R$ 250', description: 'Design premium com material impresso' },
        { value: '250-400', label: 'R$ 250 - R$ 400', description: 'Pacote completo de branding' },
        { value: 'flexible', label: 'Vamos conversar', description: 'Orçamento flexível para projetos complexos' }
      ],
      "assistência": [
        { value: '50-100', label: 'R$ 50 - R$ 100', description: 'Consultoria básica' },
        { value: '100-200', label: 'R$ 100 - R$ 200', description: 'Estratégia completa' },
        { value: '200-300', label: 'R$ 200 - R$ 300', description: 'Suporte técnico especializado' },
        { value: '300-500', label: 'R$ 300 - R$ 500', description: 'Gestão completa de marketing' },
        { value: 'flexible', label: 'Vamos conversar', description: 'Orçamento flexível para projetos complexos' }
      ]
    }
    
    return budgetMap[category.title.toLowerCase() as keyof typeof budgetMap] || budgetMap.bots
  }

  // Opções de prazo
  const getTimelineOptions = () => [
    { value: '1-3-days', label: '1-3 dias', description: 'Entrega rápida' },
    { value: '2-4-weeks', label: '2-4 semanas', description: 'Prazo padrão' },
    { value: '1-2-months', label: '1-2 meses', description: 'Projeto complexo' },
    { value: '2-3-months', label: '2-3 meses', description: 'Projeto extenso' },
    { value: 'flexible', label: 'Sem pressa', description: 'Prazo flexível' }
  ]

  // Opções de urgência
  const getUrgencyOptions = () => [
    { value: 'low', label: 'Baixa', description: 'Sem pressa, pode aguardar', color: 'text-green-600' },
    { value: 'normal', label: 'Normal', description: 'Prazo padrão', color: 'text-blue-600' },
    { value: 'high', label: 'Alta', description: 'Precisa ser rápido', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgente', description: 'Máxima prioridade', color: 'text-red-600' }
  ]

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const handleClientDataChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleProjectDescriptionChange = (field: string, value: string) => {
    setProjectDescription(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isClientDataValid = () => {
    return clientData.name.trim() !== '' && 
           clientData.email.trim() !== '' && 
           clientData.phone.trim() !== ''
  }

  const isProjectDescriptionValid = () => {
    return projectDescription.howItShouldBe.trim() !== '' && 
           projectDescription.howItShouldBeDone.trim() !== ''
  }

  const isBudgetAndTimelineValid = () => {
    return budget !== '' && timeline !== ''
  }

  // Função para gerenciar atalhos de descrição
  const handleShortcutToggle = (shortcut: string) => {
    setSelectedShortcuts(prev => 
      prev.includes(shortcut) 
        ? prev.filter(s => s !== shortcut)
        : [...prev, shortcut]
    )
  }

  // Função para obter atalhos de descrição específicos por categoria
  const getDescriptionShortcuts = () => {
    const shortcutsMap = {
      "bots": [
        { id: 'automation', label: '🤖 Automação avançada', description: 'Automatize processos complexos' },
        { id: 'security', label: '🔒 Segurança robusta', description: 'Proteção máxima de dados' },
        { id: 'integration', label: '🔗 Integração completa', description: 'Conecte com outras ferramentas' },
        { id: 'analytics', label: '📊 Relatórios detalhados', description: 'Métricas e insights completos' }
      ],
      "sites": [
        { id: 'responsive', label: '📱 Design responsivo', description: 'Perfeito em todos os dispositivos' },
        { id: 'seo', label: '🔍 Otimização SEO', description: 'Apareça no topo do Google' },
        { id: 'modern', label: '✨ Design moderno', description: 'Interface atual e inovadora' },
        { id: 'speed', label: '⚡ Carregamento rápido', description: 'Velocidade otimizada' }
      ],
      "design": [
        { id: 'creative', label: '🎨 Design criativo', description: 'Foco na criatividade e originalidade' },
        { id: 'branding', label: '🏷️ Identidade visual', description: 'Logo e marca completa' },
        { id: 'social', label: '📱 Redes sociais', description: 'Posts e conteúdo social' },
        { id: 'print', label: '🖨️ Material impresso', description: 'Cartões, folders e banners' }
      ],
      "assistência": [
        { id: 'strategy', label: '📋 Estratégia completa', description: 'Planejamento estratégico' },
        { id: 'support', label: '🛠️ Suporte técnico', description: 'Acompanhamento especializado' },
        { id: 'optimization', label: '⚡ Otimização contínua', description: 'Melhorias constantes' },
        { id: 'training', label: '🎓 Treinamento', description: 'Capacitação da equipe' }
      ]
    }
    
    return shortcutsMap[category.title.toLowerCase() as keyof typeof shortcutsMap] || shortcutsMap.bots
  }

  const handleNext = () => {
    console.log('handleNext chamado, currentStep:', currentStep)
    
    // Determinar qual etapa real estamos baseado na categoria
    let realStep = currentStep
    if (category.title.toLowerCase() !== 'bots' && currentStep === 1) {
      realStep = 2 // Para categorias que não são bots, a etapa 1 é na verdade a etapa 2
    }
    
    // Validações específicas por etapa
    if (realStep === 1 && category.title.toLowerCase() === 'bots' && !selectedPlatform) {
      console.log('Validação falhou: plataforma não selecionada')
      toast({
        title: "Selecione uma plataforma",
        description: "Por favor, escolha uma plataforma para continuar.",
        variant: "destructive",
      })
      return
    }
    
    if (realStep === 4 && !isProjectDescriptionValid()) {
      console.log('Validação falhou: descrição do projeto não preenchida')
      toast({
        title: "Preencha a descrição do projeto",
        description: "Por favor, detalhe como você quer que o projeto seja e como ele deve ser feito.",
        variant: "destructive",
      })
      return
    }
    
    if (realStep === 5 && !isClientDataValid()) {
      console.log('Validação falhou: dados do cliente não preenchidos')
      toast({
        title: "Preencha seus dados de contato",
        description: "Nome, e-mail e telefone são obrigatórios para prosseguir.",
        variant: "destructive",
      })
      return
    }
    
    if (realStep === 6 && !isBudgetAndTimelineValid()) {
      console.log('Validação falhou: orçamento e prazo não selecionados')
      toast({
        title: "Selecione o orçamento e o prazo",
        description: "Por favor, escolha uma opção de orçamento e prazo para o seu projeto.",
        variant: "destructive",
      })
      return
    }
    
    console.log('Validação passou, avançando para próxima etapa')
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowFinalScreen(true)
    }
  }

  const handlePrev = () => {
    // Para categorias que não são bots, se estiver na etapa 2 (que é a primeira visível), voltar para categorias
    if (category.title.toLowerCase() !== 'bots' && currentStep === 2) {
      onBack()
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      // Se estiver na primeira etapa (apenas para bots), voltar para a tela de categorias
      onBack()
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

      // Criar documento PDF com tratamento de erro específico
      console.log('Criando documento PDF...')
      let doc
      try {
        doc = new jsPDF()
        console.log('Documento PDF criado com sucesso')
      } catch (pdfError) {
        console.error('Erro ao criar documento PDF:', pdfError)
        throw new Error('Falha ao inicializar o gerador de PDF')
      }
      
      // Configurações básicas do PDF
      try {
        doc.setFont("helvetica")
        doc.setFontSize(16)
      } catch (fontError) {
        console.error('Erro ao configurar fonte:', fontError)
      }
      
      // Título principal
      try {
        doc.setTextColor(59, 130, 246)
        doc.text("COMPROVANTE DE SOLICITAÇÃO", 105, 30, { align: "center" })
        
        // Linha separadora
        doc.setDrawColor(59, 130, 246)
        doc.setLineWidth(0.5)
        doc.line(20, 40, 190, 40)
      } catch (headerError) {
        console.error('Erro ao criar cabeçalho:', headerError)
        // Título simples em caso de erro
        doc.text("COMPROVANTE DE SOLICITAÇÃO", 20, 30)
      }
      
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

      // Adicionar plataforma se for bot
      if (category.title.toLowerCase() === 'bots' && selectedPlatform) {
        const platform = platforms.find(p => p.id === selectedPlatform)
        data.push({ label: "Plataforma:", value: platform?.name || selectedPlatform })
      }

      // Adicionar recursos selecionados
      if (selectedFeatures.length > 0) {
        const features = getCategoryFeatures()
        const selectedFeatureNames = selectedFeatures.map(id => 
          features.find(f => f.id === id)?.name
        ).filter(Boolean)
        data.push({ label: "Recursos:", value: selectedFeatureNames.join(', ') })
      }

      // Adicionar dados do cliente
      if (clientData.name) {
        data.push({ label: "Cliente:", value: clientData.name })
      }
      if (clientData.email) {
        data.push({ label: "E-mail:", value: clientData.email })
      }
      if (clientData.phone) {
        data.push({ label: "Telefone:", value: clientData.phone })
      }
      if (clientData.discord) {
        data.push({ label: "Discord:", value: clientData.discord })
      }

      // Adicionar descrição do projeto
      if (projectDescription.howItShouldBe) {
        data.push({ label: "Como deve ser:", value: projectDescription.howItShouldBe })
      }
      if (projectDescription.howItShouldBeDone) {
        data.push({ label: "Como deve ser feito:", value: projectDescription.howItShouldBeDone })
      }
      
      // Adicionar atalhos de descrição selecionados
      if (selectedShortcuts.length > 0) {
        const shortcuts = getDescriptionShortcuts()
        const selectedShortcutNames = selectedShortcuts.map(id => 
          shortcuts.find(s => s.id === id)?.label
        ).filter(Boolean)
        
        // Limpar emojis e caracteres especiais dos atalhos
        const cleanShortcutNames = selectedShortcutNames.map((name: string | undefined) => 
          name ? name.replace(/[^\w\s\-.,()]/g, '').trim() : ''
        ).filter((name: string) => name.length > 0)
        
        data.push({ label: "Atalhos selecionados:", value: cleanShortcutNames.join(', ') })
      }

      // Adicionar orçamento e prazo
      if (budget) {
        const budgetOptions = getBudgetOptions()
        const budgetOption = budgetOptions.find(b => b.value === budget)
        data.push({ label: "Orçamento:", value: budgetOption?.label || budget })
      }
      if (timeline) {
        const timelineOptions = getTimelineOptions()
        const timelineOption = timelineOptions.find(t => t.value === timeline)
        data.push({ label: "Prazo:", value: timelineOption?.label || timeline })
      }

      // Adicionar urgência
      if (urgency) {
        const urgencyOptions = getUrgencyOptions()
        const urgencyOption = urgencyOptions.find(u => u.value === urgency)
        data.push({ label: "Urgência:", value: urgencyOption?.label || urgency })
      }
      
      let yPosition = 60
      try {
        data.forEach((item) => {
          // Função para quebrar texto em múltiplas linhas
          const splitTextToSize = (text: string, maxWidth: number) => {
            // Limpar caracteres especiais que podem causar problemas
            const cleanText = text.replace(/[^\w\s\-.,()]/g, ' ').replace(/\s+/g, ' ').trim()
            
            if (!cleanText) return ['']
            
            const words = cleanText.split(' ')
            const lines: string[] = []
            let currentLine = ''
            
            words.forEach(word => {
              const testLine = currentLine ? currentLine + ' ' + word : word
              
              try {
                const testWidth = doc.getTextWidth(testLine)
                
                if (testWidth > maxWidth && currentLine) {
                  lines.push(currentLine)
                  currentLine = word
                } else {
                  currentLine = testLine
                }
              } catch (error) {
                // Fallback: quebrar por tamanho fixo se getTextWidth falhar
                if (testLine.length > 30 && currentLine) {
                  lines.push(currentLine)
                  currentLine = word
                } else {
                  currentLine = testLine
                }
              }
            })
            
            if (currentLine) {
              lines.push(currentLine)
            }
            
            return lines.length > 0 ? lines : ['']
          }
          
          // Simplificar formatação para evitar erros
          doc.setFont("helvetica", "bold")
          doc.text(item.label, 20, yPosition)
          
          doc.setFont("helvetica", "normal")
          
          // Quebrar texto do valor em múltiplas linhas
          const maxWidth = 100 // Largura máxima em pontos
          const valueLines = splitTextToSize(item.value, maxWidth)
          
          // Adicionar cada linha do valor
          valueLines.forEach((line, index) => {
            const lineY = yPosition + (index * 5) // 5 pontos de espaçamento entre linhas
            doc.text(line, 80, lineY)
          })
          
          // Ajustar posição Y baseado no número de linhas
          yPosition += Math.max(12, valueLines.length * 8)
        })
      } catch (dataError) {
        console.error('Erro ao adicionar dados:', dataError)
        // Adicionar dados básicos em caso de erro
        doc.text("Erro ao processar dados completos", 20, yPosition)
      }
      
      // Status da solicitação
      yPosition += 10
      try {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(59, 130, 246)
        doc.text("Status da Solicitação", 20, yPosition)
        
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0)
        yPosition += 10
        doc.text("Solicitação recebida com sucesso", 20, yPosition)
        yPosition += 8
        doc.text("Aguardando análise da equipe", 20, yPosition)
        yPosition += 8
        doc.text("Entraremos em contato em breve", 20, yPosition)
        
        // Rodapé
        yPosition += 20
        doc.setFontSize(10)
        doc.setTextColor(107, 114, 128)
        doc.text("CodeForge - Transformando ideias em realidade", 105, yPosition, { align: "center" })
      } catch (statusError) {
        console.error('Erro ao adicionar status:', statusError)
        doc.text("Status: Solicitação recebida", 20, yPosition)
      }
      
      // Gerar nome do arquivo
      const fileName = `comprovante_${category.title.toLowerCase()}_${currentDate.toISOString().split('T')[0]}.pdf`
      
      setDownloadProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      try {
        doc.save(fileName)
        console.log('PDF salvo com sucesso:', fileName)
        await new Promise(resolve => setTimeout(resolve, 800))
        setDownloadState('completed')
      } catch (saveError) {
        console.error('Erro ao salvar PDF:', saveError)
        throw new Error('Falha ao salvar o arquivo PDF')
      }
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
      alert(`Erro ao gerar o comprovante: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Tente novamente.`)
      setDownloadState('idle')
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const firebaseService = FirebaseDataService.getInstance()
      
      // Criar dados completos do pedido
      const orderData = {
        customerName: clientData.name,
        customerEmail: clientData.email,
        customerPhone: clientData.phone,
        customerDiscord: clientData.discord,
        projectType: category.title,
        category: category.title,
        description: category.description,
        platform: selectedPlatform || "",
        features: selectedFeatures,
        projectDescription: projectDescription,
        selectedShortcuts: selectedShortcuts,
        budget: budget,
        timeline: timeline,
        urgency: urgency,
        status: 'pending' as const,
        assignedTo: '',
        priority: (urgency === 'normal' ? 'medium' : urgency === 'urgent' ? 'high' : urgency) as 'low' | 'medium' | 'high',
        notes: `Solicitação completa - Plataforma: ${selectedPlatform || 'N/A'}, Recursos: ${selectedFeatures.join(', ') || 'Nenhum'}, Atalhos: ${selectedShortcuts.join(', ') || 'Nenhum'}, Orçamento: ${budget}, Prazo: ${timeline}, Urgência: ${urgency}`,
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
      case 4:
        return renderStep4()
      case 5:
        return renderStep5()
      case 6:
        return renderStep6()
      case 7:
        return renderStep7()
      default:
        return renderStep1()
    }
  }

  // Etapa 1: Seleção de plataforma (apenas para bots)
  const renderStep1 = () => {
    const IconComponent = getCategoryIcon()
    
    if (category.title.toLowerCase() !== 'bots') {
      // Para outras categorias, ir direto para a etapa de descrição do projeto
      return renderStep2()
    }

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🤖 Qual plataforma você deseja?
              </h1>
              <p className="text-lg text-gray-600">
                Escolha a plataforma para seu bot
              </p>
            </div>

            {/* Grid de Plataformas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {platforms.map((platform) => {
                const PlatformIcon = platform.icon
                return (
                  <Card
                    key={platform.id}
                    className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      selectedPlatform === platform.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {platform.id === 'whatsapp' ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 text-white" />
                            </div>
                          ) : platform.id === 'discord' ? (
                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                              <DiscordIcon className="w-4 h-4 text-white" />
                            </div>
                          ) : platform.id === 'instagram' ? (
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                              <Instagram className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <PlatformIcon className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {platform.description}
                          </p>
                        </div>
                        {selectedPlatform === platform.id && (
                          <Check className="w-6 h-6 text-blue-500 ml-auto" />
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
                onClick={onBack}
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                🔙 Voltar
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedPlatform}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  !selectedPlatform ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                ✅ Continuar
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ⚙️ Personalize seu {category.title}
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
                    className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <FeatureIcon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                          {feature.name}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-500 ml-auto" />
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
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105`}
              >
                ✅ Continuar
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                📋 Resumo da Solicitação
              </h1>
              <p className="text-lg text-gray-600">
                Confirme os detalhes antes de prosseguir
              </p>
            </div>

            {/* Resumo */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">📂 Categoria:</span>
                  <span className="text-gray-900">{category.title}</span>
                </div>
                
                {category.title.toLowerCase() === 'bots' && selectedPlatform && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">🌐 Plataforma:</span>
                    <span className="text-gray-900">
                      {platforms.find(p => p.id === selectedPlatform)?.name}
                    </span>
                  </div>
                )}
                
                {selectedFeatureNames.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">⚙️ Recursos selecionados:</span>
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
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105`}
              >
                ✅ Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 4: Descrição do projeto
  const renderStep4 = () => {
    const IconComponent = getCategoryIcon()
    const shortcuts = getDescriptionShortcuts()
    
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
                📝 Descreva seu {category.title}
              </h1>
              <p className="text-lg text-gray-600">
                Conte-nos como você quer que seja seu projeto
              </p>
            </div>

            {/* Botões de Atalho */}
            <div className="mb-6">
              <Label className="text-base font-semibold text-gray-900 mb-3 block">
                🚀 Atalhos para complementar sua descrição:
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shortcuts.map((shortcut) => {
                  const isSelected = selectedShortcuts.includes(shortcut.id)
                  return (
                    <Card
                      key={shortcut.id}
                      className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleShortcutToggle(shortcut.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium text-sm ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                            {shortcut.label}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-500 ml-auto" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {shortcut.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Formulário de Descrição */}
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="howItShouldBe" className="text-base font-semibold text-gray-900 mb-2 block">
                  Como você quer que seja o projeto? *
                </Label>
                <Textarea
                  id="howItShouldBe"
                  placeholder="Descreva como você imagina o resultado final do seu projeto..."
                  value={projectDescription.howItShouldBe}
                  onChange={(e) => handleProjectDescriptionChange('howItShouldBe', e.target.value)}
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>

              <div>
                <Label htmlFor="howItShouldBeDone" className="text-base font-semibold text-gray-900 mb-2 block">
                  Como você deseja que seja feito? *
                </Label>
                <Textarea
                  id="howItShouldBeDone"
                  placeholder="Detalhes técnicos, criativos ou específicos sobre como você quer que seja desenvolvido..."
                  value={projectDescription.howItShouldBeDone}
                  onChange={(e) => handleProjectDescriptionChange('howItShouldBeDone', e.target.value)}
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isProjectDescriptionValid()}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  !isProjectDescriptionValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                ✅ Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 5: Dados do cliente
  const renderStep5 = () => {
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
                👤 Seus Dados de Contato
              </h1>
              <p className="text-lg text-gray-600">
                Preencha suas informações para entrarmos em contato
              </p>
            </div>

            {/* Formulário de Dados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="name" className="text-base font-semibold text-gray-900 mb-2 block">
                  👤 Nome Completo *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={clientData.name}
                    onChange={(e) => handleClientDataChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-semibold text-gray-900 mb-2 block">
                  📧 E-mail *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={clientData.email}
                    onChange={(e) => handleClientDataChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold text-gray-900 mb-2 block">
                  📱 Telefone/WhatsApp *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={clientData.phone}
                    onChange={(e) => handleClientDataChange('phone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="discord" className="text-base font-semibold text-gray-900 mb-2 block">
                  🎮 Discord (Opcional)
                </Label>
                <div className="relative">
                  <DiscordIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="discord"
                    type="text"
                    placeholder="seu_usuario#1234"
                    value={clientData.discord}
                    onChange={(e) => handleClientDataChange('discord', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isClientDataValid()}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  !isClientDataValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                ✅ Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 6: Orçamento, Prazo e Urgência
  const renderStep6 = () => {
    const IconComponent = getCategoryIcon()
    const budgetOptions = getBudgetOptions()
    const timelineOptions = getTimelineOptions()
    const urgencyOptions = getUrgencyOptions()
    
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
                📄 Orçamento e Prazo
              </h1>
              <p className="text-lg text-gray-600">
                Defina seu orçamento, prazo e urgência do projeto
              </p>
            </div>

            {/* Orçamento */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                💰 Orçamento Disponível
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      budget === option.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBudget(option.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          budget === option.value ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <DollarSign className={`w-5 h-5 ${budget === option.value ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium ${budget === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {option.description}
                          </p>
                        </div>
                        {budget === option.value && (
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Prazo */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                ⏳ Prazo Desejado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timelineOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      timeline === option.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setTimeline(option.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          timeline === option.value ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Clock className={`w-5 h-5 ${timeline === option.value ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium ${timeline === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {option.description}
                          </p>
                        </div>
                        {timeline === option.value && (
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Urgência */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                🚀 Urgência do Projeto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgencyOptions.map((option) => (
                  <Card
                    key={option.value}
                    className={`relative overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      urgency === option.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setUrgency(option.value as any)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          urgency === option.value ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${option.color}`} />
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium ${urgency === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            {option.description}
                          </p>
                        </div>
                        {urgency === option.value && (
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Aviso para urgência alta */}
              {urgency === 'urgent' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">Projeto Urgente</h4>
                      <p className="text-sm text-red-700 mt-1">
                        Projetos urgentes podem ter acréscimo no orçamento devido à prioridade máxima e recursos adicionais necessários.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isBudgetAndTimelineValid()}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  !isBudgetAndTimelineValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                ✅ Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Etapa 7: Resumo final completo
  const renderStep7 = () => {
    const IconComponent = getCategoryIcon()
    const features = getCategoryFeatures()
    const selectedFeatureNames = selectedFeatures.map(id => 
      features.find(f => f.id === id)?.name
    ).filter(Boolean)
    const budgetOptions = getBudgetOptions()
    const timelineOptions = getTimelineOptions()
    const urgencyOptions = getUrgencyOptions()
    
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
                📋 Resumo Final da Solicitação
              </h1>
              <p className="text-lg text-gray-600">
                Confirme todos os detalhes antes de enviar
              </p>
            </div>

            {/* Resumo Completo */}
            <div className="space-y-6 mb-8">
              {/* Informações do Projeto */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  📂 Informações do Projeto
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-800">📂 Categoria:</span>
                    <span className="text-blue-900 font-semibold">{category.title}</span>
                  </div>
                  
                  {category.title.toLowerCase() === 'bots' && selectedPlatform && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">🌐 Plataforma:</span>
                      <span className="text-blue-900 font-semibold">
                        {platforms.find(p => p.id === selectedPlatform)?.name}
                      </span>
                    </div>
                  )}
                  
                  {selectedFeatureNames.length > 0 && (
                    <div>
                      <span className="font-medium text-blue-800">⚙️ Recursos selecionados:</span>
                      <div className="mt-2 space-y-1">
                        {selectedFeatureNames.map((name, index) => (
                          <div key={index} className="flex items-center gap-2 text-blue-900">
                            <Check className="w-4 h-4 text-green-600" />
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Descrição do Projeto */}
              {(projectDescription.howItShouldBe || projectDescription.howItShouldBeDone) && (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    📝 Descrição do Projeto
                  </h3>
                  <div className="space-y-3">
                    {projectDescription.howItShouldBe && (
                      <div>
                        <span className="font-medium text-green-800">Como deve ser:</span>
                        <p className="text-green-900 mt-1 text-sm">{projectDescription.howItShouldBe}</p>
                      </div>
                    )}
                    {projectDescription.howItShouldBeDone && (
                      <div>
                        <span className="font-medium text-green-800">Como deve ser feito:</span>
                        <p className="text-green-900 mt-1 text-sm">{projectDescription.howItShouldBeDone}</p>
                      </div>
                    )}
                    
                    {/* Atalhos de Descrição Selecionados */}
                    {selectedShortcuts.length > 0 && (
                      <div>
                        <span className="font-medium text-green-800">🚀 Atalhos selecionados:</span>
                        <div className="mt-2 space-y-1">
                          {selectedShortcuts.map((shortcutId, index) => {
                            const shortcut = getDescriptionShortcuts().find(s => s.id === shortcutId)
                            return shortcut ? (
                              <div key={index} className="flex items-center gap-2 text-green-900">
                                <Check className="w-4 h-4 text-green-600" />
                                {shortcut.label}
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dados do Cliente */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  👤 Dados do Cliente
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">👤 Nome:</span>
                    <span className="text-purple-900 font-semibold">{clientData.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">📧 E-mail:</span>
                    <span className="text-purple-900 font-semibold">{clientData.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">📱 Telefone:</span>
                    <span className="text-purple-900 font-semibold">{clientData.phone}</span>
                  </div>
                  {clientData.discord && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-purple-800">🎮 Discord:</span>
                      <span className="text-purple-900 font-semibold">{clientData.discord}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Orçamento e Prazo */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  💰 Orçamento e Prazo
                </h3>
                <div className="space-y-3">
                  {budget && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">Orçamento:</span>
                      <span className="text-orange-900 font-semibold">
                        {budgetOptions.find(b => b.value === budget)?.label || budget}
                      </span>
                    </div>
                  )}
                  {timeline && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">Prazo:</span>
                      <span className="text-orange-900 font-semibold">
                        {timelineOptions.find(t => t.value === timeline)?.label || timeline}
                      </span>
                    </div>
                  )}
                  {urgency && (
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-orange-800">Urgência:</span>
                      <span className="text-orange-900 font-semibold">
                        {urgencyOptions.find(u => u.value === urgency)?.label || urgency}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                className="px-6 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ⬅️ Anterior
              </Button>
              <Button
                onClick={handleNext}
                className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105`}
              >
                🚀 Confirmar e Enviar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Renderizar o componente
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {showFinalScreen ? (
          // Tela final simplificada
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
                      className={`w-full py-6 text-xl bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-2xl transition-all duration-300 rounded-2xl font-bold text-lg cursor-pointer hover:scale-105`}
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          📤 Enviando solicitação...
                        </div>
                      ) : downloadState === 'downloading' ? (
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          📥 Baixando Comprovante...
                          <span className="text-sm">({downloadProgress}%)</span>
                        </div>
                      ) : downloadState === 'completed' ? (
                        <div 
                          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-200"
                          onClick={handleCompletedClick}
                          title="Clique para voltar às categorias"
                        >
                          <CheckCircle className="w-6 h-6" />
                          ✅ Concluído!
                          <Sparkles className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Download className="w-6 h-6" />
                          🚀 Enviar Solicitação e Baixar Comprovante
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          // Renderizar etapas normais
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        )}
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
            <Button onClick={handleSuccessDialogClose} className="w-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
              🔙 Voltar às Categorias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
