"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Calendar,
  DollarSign,
  CheckCircle,
  ArrowLeft,
  Send,
  Sparkles,
  Zap,
  Target,
  Clock,
  Star,
  Heart,
  Rocket,
  Palette,
  Bot,
  Globe,
  Settings,
  ArrowRight,
  Check,
  TrendingUp,
  Shield,
  Gift
} from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"
import FirebaseDataService from "@/lib/firebase-data-service"
import NGCModal from "./ngc-modal"
import { useRouter } from "next/navigation"

interface DynamicOrderFormProps {
  category: MainCategory
  onBack: () => void
}

const budgetOptions = [
  { value: "15-50", label: "R$ 15 - R$ 50", icon: "💡", description: "Projetos básicos" },
  { value: "50-100", label: "R$ 50 - R$ 100", icon: "🚀", description: "Soluções simples" },
  { value: "100-150", label: "R$ 100 - R$ 150", icon: "⭐", description: "Projetos intermediários" },
  { value: "150-200", label: "R$ 150 - R$ 200", icon: "💎", description: "Soluções avançadas" },
  { value: "200-250", label: "R$ 200 - R$ 250", icon: "👑", description: "Projetos premium" },
  { value: "flexible", label: "Orçamento flexível", icon: "🎯", description: "Vamos conversar" },
]

const timelineOptions = [
  { value: "1-2-weeks", label: "1-2 semanas", icon: "⚡", description: "Super rápido" },
  { value: "2-4-weeks", label: "2-4 semanas", icon: "📅", description: "Padrão do mercado" },
  { value: "1-2-months", label: "1-2 meses", icon: "🗓️", description: "Projeto completo" },
  { value: "2-3-months", label: "2-3 meses", icon: "📆", description: "Solução robusta" },
  { value: "3+months", label: "3+ meses", icon: "⏰", description: "Projeto complexo" },
  { value: "flexible", label: "Prazo flexível", icon: "🎯", description: "Sem pressão" },
]

const contactMethods = [
  { id: "whatsapp", label: "WhatsApp", icon: "💬", color: "bg-green-500", description: "Resposta instantânea" },
  { id: "email", label: "E-mail", icon: "📧", color: "bg-blue-500", description: "Documentação completa" },
  { id: "phone", label: "Telefone", icon: "📞", color: "bg-purple-500", description: "Conversa direta" },
  { id: "discord", label: "Discord", icon: "🎮", color: "bg-indigo-500", description: "Comunidade ativa" },
]

const urgencyOptions = [
  { value: "low", label: "Baixa", icon: "🐌", color: "from-green-400 to-green-600", description: "Sem pressa" },
  { value: "normal", label: "Normal", icon: "⚡", color: "from-blue-400 to-blue-600", description: "Prazo padrão" },
  { value: "high", label: "Alta", icon: "🔥", color: "from-orange-400 to-orange-600", description: "Precisa urgente" },
  { value: "urgent", label: "Urgente", icon: "🚨", color: "from-red-400 to-red-600", description: "Prioridade máxima" },
]

export default function DynamicOrderForm({ category, onBack }: DynamicOrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showNGCModal, setShowNGCModal] = useState(false)
  const [selectedContactMethod, setSelectedContactMethod] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  
  // Estados para feedback visual do download
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle')
  const [downloadProgress, setDownloadProgress] = useState(0)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    timeline: "",
    description: "",
    features: [] as string[],
    contactMethods: [] as string[],
    urgency: "normal",
    additionalInfo: "",
  })

  const totalSteps = 5

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
      default: return Sparkles
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Vamos nos conhecer melhor! 👋"
      case 2: return "Conte-nos sobre seu projeto! 💡"
      case 3: return "Orçamento e Prazo 💰"
      case 4: return "Funcionalidades desejadas ⚡"
      case 5: return "Como prefere ser contatado? 📞"
      default: return ""
    }
  }

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Primeiro, precisamos conhecer você para criar a solução perfeita"
      case 2: return "Quanto mais detalhes, melhor poderemos atendê-lo e superar suas expectativas"
      case 3: return "Ajude-nos a entender suas expectativas e criar a proposta ideal"
      case 4: return "Selecione as funcionalidades que farão seu projeto brilhar"
      case 5: return "Escolha suas formas preferidas de comunicação para acompanharmos seu projeto"
      default: return ""
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleContactMethodToggle = (method: string) => {
    // Se o método já está selecionado, remove
    if (formData.contactMethods.includes(method)) {
      setFormData(prev => ({
        ...prev,
        contactMethods: prev.contactMethods.filter(m => m !== method)
      }))
    } else {
      // Se é um novo método, abre o modal NGC apenas se for um método válido
      const validMethods = ['whatsapp', 'email', 'phone', 'discord']
      if (validMethods.includes(method)) {
        setSelectedContactMethod(method)
        setShowNGCModal(true)
      }
    }
  }

  const handleNGCModalComplete = () => {
    // Adiciona o método de contato selecionado
    setFormData(prev => ({
      ...prev,
      contactMethods: [...prev.contactMethods, selectedContactMethod]
    }))
    
    // Fecha o modal
    setShowNGCModal(false)
    setSelectedContactMethod("")
  }

  const handleNGCModalClose = () => {
    setShowNGCModal(false)
    setSelectedContactMethod("")
  }

  // Função para gerar e baixar o PDF
  const generateAndDownloadPDF = async () => {
    try {
      // Iniciar estado de download
      setDownloadState('downloading')
      setDownloadProgress(0)
      
      // Simular progresso de download (0% a 100%)
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Importar jsPDF dinamicamente para evitar problemas de SSR
      const { default: jsPDF } = await import('jspdf')
      
      // Criar novo documento PDF
      const doc = new jsPDF()
      
      // Configurar fonte e tamanho
      doc.setFont("helvetica")
      doc.setFontSize(20)
      
      // Título principal
      doc.setTextColor(59, 130, 246) // Blue-600
      doc.text("COMPROVANTE DE SOLICITAÇÃO", 105, 30, { align: "center" })
      
      // Linha separadora
      doc.setDrawColor(59, 130, 246)
      doc.setLineWidth(0.5)
      doc.line(20, 40, 190, 40)
      
      // Informações do cliente
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
      
      // Dados do comprovante
      const data = [
        { label: "Data e Hora:", value: formattedDate },
        { label: "Nome do Cliente:", value: formData.name },
        { label: "E-mail:", value: formData.email },
        { label: "Telefone:", value: formData.phone },
        { label: "Categoria Solicitada:", value: category.title },
        { label: "Descrição:", value: category.description },
        { label: "Orçamento:", value: formData.budget },
        { label: "Prazo:", value: formData.timeline },
        { label: "Urgência:", value: formData.urgency },
        { label: "Métodos de Contato:", value: formData.contactMethods.join(', ') }
      ]
      
      let yPosition = 60
      data.forEach((item, index) => {
        // Label em negrito
        doc.setFont("helvetica", "bold")
        doc.text(item.label, 20, yPosition)
        
        // Valor
        doc.setFont("helvetica", "normal")
        const valueX = 20 + doc.getTextWidth(item.label) + 5
        doc.text(item.value, valueX, yPosition)
        
        yPosition += 15
      })
      
      // Informações adicionais
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
      doc.setTextColor(107, 114, 128) // Gray-500
      doc.text("CodeForge - Transformando ideias em realidade", 105, yPosition, { align: "center" })
      
      // Gerar nome do arquivo
      const fileName = `comprovante_${category.title.toLowerCase()}_${currentDate.toISOString().split('T')[0]}.pdf`
      
      // Simular finalização do download
      setDownloadProgress(100)
      
      // Aguardar um momento para mostrar 100%
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Salvar PDF
      doc.save(fileName)
      
      // Aguardar um momento para simular processamento
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Marcar como concluído
      setDownloadState('completed')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar o comprovante. Tente novamente.')
      setDownloadState('idle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const firebaseService = FirebaseDataService.getInstance()
      
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        projectType: category.title,
        category: category.title,
        description: formData.description,
        budget: formData.budget,
        timeline: formData.timeline,
        status: 'pending' as const,
        assignedTo: '',
        priority: formData.urgency as 'low' | 'medium' | 'high',
        notes: `Empresa/Projeto: ${formData.company}\nFuncionalidades: ${formData.features.join(', ')}\nMétodos de contato: ${formData.contactMethods.join(', ')}\nInformações adicionais: ${formData.additionalInfo}`,
      }

      await firebaseService.addOrder(orderData)
      
      // Gerar e baixar o PDF após salvar no Firebase
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

  const getCategoryFeatures = () => {
    switch (category.title.toLowerCase()) {
      case "bots":
        return [
          { name: "Automação de vendas", icon: "🤖", benefit: "Aumente vendas 24/7" },
          { name: "Sistema de pagamentos", icon: "💳", benefit: "Receba pagamentos automaticamente" },
          { name: "Gestão de clientes", icon: "👥", benefit: "Organize seus contatos" },
          { name: "Relatórios e analytics", icon: "📊", benefit: "Acompanhe resultados em tempo real" },
          { name: "Integração com APIs", icon: "🔗", benefit: "Conecte com outras ferramentas" },
          { name: "Chat personalizado", icon: "💬", benefit: "Atendimento humanizado" },
          { name: "Sistema de tickets", icon: "🎫", benefit: "Organize suporte técnico" },
          { name: "Backup automático", icon: "💾", benefit: "Segurança total dos dados" },
          { name: "Painel administrativo", icon: "⚙️", benefit: "Controle total do sistema" },
          { name: "Suporte 24/7", icon: "🛟", benefit: "Assistência sempre disponível" }
        ]
      case "sites":
        return [
          { name: "Design responsivo", icon: "📱", benefit: "Perfeito em qualquer dispositivo" },
          { name: "E-commerce completo", icon: "🛒", benefit: "Venda online com segurança" },
          { name: "Sistema de pagamentos", icon: "💳", benefit: "Múltiplas formas de pagamento" },
          { name: "Painel administrativo", icon: "⚙️", benefit: "Gerencie seu site facilmente" },
          { name: "SEO otimizado", icon: "🔍", benefit: "Apareça no Google" },
          { name: "Blog integrado", icon: "📝", benefit: "Conteúdo que engaja" },
          { name: "Formulários de contato", icon: "📋", benefit: "Capture leads automaticamente" },
          { name: "Analytics integrado", icon: "📊", benefit: "Acompanhe visitantes" },
          { name: "Backup automático", icon: "💾", benefit: "Seus dados sempre seguros" },
          { name: "Hospedagem incluída", icon: "☁️", benefit: "Site sempre no ar" }
        ]
      case "design":
        return [
          { name: "Logo personalizado", icon: "🎨", benefit: "Identidade única da sua marca" },
          { name: "Identidade visual completa", icon: "🎭", benefit: "Consistência em todos os lugares" },
          { name: "Manual da marca", icon: "📖", benefit: "Guia completo de uso" },
          { name: "Design para redes sociais", icon: "📱", benefit: "Conteúdo que viraliza" },
          { name: "Material impresso", icon: "🖨️", benefit: "Profissionalismo offline" },
          { name: "UI/UX design", icon: "✨", benefit: "Experiência do usuário perfeita" },
          { name: "Animações", icon: "🎬", benefit: "Interações que encantam" },
          { name: "Templates reutilizáveis", icon: "📄", benefit: "Economia de tempo" },
          { name: "Arquivos editáveis", icon: "📁", benefit: "Flexibilidade total" },
          { name: "Suporte pós-entrega", icon: "🎯", benefit: "Acompanhamento contínuo" }
        ]
      case "assistência":
        return [
          { name: "Análise de Instagram", icon: "📸", benefit: "Estratégias baseadas em dados" },
          { name: "Consultoria estratégica", icon: "🎯", benefit: "Plano personalizado para seu negócio" },
          { name: "Suporte técnico", icon: "🛠️", benefit: "Resolução rápida de problemas" },
          { name: "Treinamento personalizado", icon: "🎓", benefit: "Aprenda a usar ferramentas" },
          { name: "Relatórios mensais", icon: "📊", benefit: "Acompanhe seu crescimento" },
          { name: "Otimização de processos", icon: "⚡", benefit: "Eficiência máxima" },
          { name: "Automação de tarefas", icon: "🤖", benefit: "Economize tempo valioso" },
          { name: "Monitoramento 24/7", icon: "👁️", benefit: "Sempre atento ao seu negócio" },
          { name: "Backup e segurança", icon: "🔒", benefit: "Proteção total dos dados" },
          { name: "Atualizações regulares", icon: "🔄", benefit: "Sempre na vanguarda" }
        ]
      default:
        return []
    }
  }

  const renderStep = () => {
    const CategoryIcon = getCategoryIcon()
    
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`w-24 h-24 bg-gradient-to-r ${getCategoryColor()} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl`}
              >
                <CategoryIcon className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {getStepDescription(currentStep)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Como devemos te chamar?"
                  className="mt-2 text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                  required
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="mt-2 text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="phone" className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  Telefone/WhatsApp
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="mt-2 text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="company" className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Empresa/Projeto
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nome da sua empresa ou projeto"
                  className="mt-2 text-lg p-4 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100"
            >
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Dados 100% seguros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-500" />
                  <span>Sem spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span>Proposta gratuita</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Target className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {getStepDescription(currentStep)}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="description" className="text-lg font-semibold flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                Descrição do projeto *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva detalhadamente o que você precisa. Seja específico sobre suas expectativas, objetivos e como imagina o resultado final. Quanto mais informações, melhor poderemos atendê-lo!"
                rows={8}
                className="text-lg p-6 border-2 border-gray-200 focus:border-purple-500 rounded-xl resize-none transition-all duration-300"
                required
              />
            </motion.div>

            {/* Tips section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100"
            >
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Dicas para uma descrição perfeita:
              </h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Qual é o objetivo principal do projeto?</li>
                <li>• Quem é o público-alvo?</li>
                <li>• Existe algum prazo específico?</li>
                <li>• Tem alguma referência ou exemplo?</li>
                <li>• Quais funcionalidades são essenciais?</li>
              </ul>
            </motion.div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <DollarSign className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {getStepDescription(currentStep)}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label className="text-lg font-semibold mb-6 block flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Orçamento disponível
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  {budgetOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option.value })}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.budget === option.value
                          ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div>
                          <div className="font-semibold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label className="text-lg font-semibold mb-6 block flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Prazo desejado
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  {timelineOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: option.value })}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.timeline === option.value
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{option.icon}</span>
                        <div>
                          <div className="font-semibold text-lg">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label className="text-lg font-semibold mb-6 block flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                Urgência do projeto
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {urgencyOptions.map((urgency) => (
                  <motion.button
                    key={urgency.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: urgency.value })}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                      formData.urgency === urgency.value
                        ? `bg-gradient-to-r ${urgency.color} text-white border-transparent shadow-lg scale-105`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-3">{urgency.icon}</div>
                    <div className="font-semibold mb-1">{urgency.label}</div>
                    <div className="text-xs opacity-80">{urgency.description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Zap className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {getStepDescription(currentStep)}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {getCategoryFeatures().map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start space-x-4 p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleFeatureToggle(feature.name)}
                >
                  <Checkbox
                    checked={formData.features.includes(feature.name)}
                    onCheckedChange={() => handleFeatureToggle(feature.name)}
                    className="w-6 h-6 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{feature.icon}</span>
                      <Label className="text-lg cursor-pointer font-semibold group-hover:text-orange-600 transition-colors">
                        {feature.name}
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">{feature.benefit}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Selected features summary */}
            {formData.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100"
              >
                <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Funcionalidades selecionadas ({formData.features.length}):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-orange-100 text-orange-800">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <MessageSquare className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {getStepDescription(currentStep)}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {contactMethods.map((method, index) => (
                <motion.button
                  key={method.id}
                  type="button"
                  onClick={() => handleContactMethodToggle(method.id)}
                  className={`p-8 rounded-xl border-2 transition-all duration-300 text-center ${
                    formData.contactMethods.includes(method.id)
                      ? `${method.color} text-white border-transparent shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <div className="font-semibold mb-2">{method.label}</div>
                  <div className="text-xs opacity-80">{method.description}</div>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="additionalInfo" className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Informações adicionais
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Links de referência, exemplos, requisitos específicos, ou qualquer outra informação que considere importante para entendermos melhor seu projeto..."
                rows={5}
                className="text-lg p-6 border-2 border-gray-200 focus:border-indigo-500 rounded-xl resize-none transition-all duration-300"
              />
            </motion.div>

            {/* Final CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 text-center"
            >
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                🎉 Pronto para transformar sua ideia em realidade?
              </h3>
              <p className="text-indigo-600 mb-6">
                Envie sua solicitação e receba uma proposta personalizada em até 24 horas!
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-indigo-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Proposta gratuita</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Sem compromisso</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Resposta em 24h</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const router = useRouter()

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false)
    router.push('/categorias') // Redireciona para a tela de categorias
  }

  const handleCompletedClick = () => {
    router.push('/categorias') // Redireciona para a tela de categorias
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
                 {/* Header */}
         <motion.div
           initial={{ y: -50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="mb-8"
         >
           {/* Enhanced Progress Bar */}
           <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
               <span className="text-sm font-medium text-gray-600">
                 Passo {currentStep} de {totalSteps}
               </span>
               <span className="text-sm font-medium text-gray-600">
                 {Math.round((currentStep / totalSteps) * 100)}% completo
               </span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
               <motion.div
                 className={`h-4 rounded-full bg-gradient-to-r ${getCategoryColor()} shadow-lg`}
                 initial={{ width: 0 }}
                 animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
               />
             </div>
           </div>
         </motion.div>

        {/* Form Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

                     

           {/* Navigation Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex justify-between mt-8"
           >
                         <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <Button
                 variant="outline"
                 onClick={currentStep === 1 ? onBack : () => setCurrentStep(Math.max(1, currentStep - 1))}
                 className="px-8 py-4 text-lg rounded-xl border-2"
               >
                 <ArrowLeft className="w-5 h-5 mr-2" />
                 {currentStep === 1 ? "Voltar" : "Anterior"}
               </Button>
             </motion.div>

            {currentStep < totalSteps ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className={`px-8 py-4 text-lg bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-lg transition-all duration-300 rounded-xl`}
                >
                  Próximo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || downloadState === 'downloading'}
                  className={`px-10 py-4 text-xl bg-gradient-to-r ${getCategoryColor()} text-white hover:shadow-xl transition-all duration-300 rounded-xl font-semibold`}
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
                      <Rocket className="w-6 h-6" />
                      Enviar Solicitação
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600 text-xl">
              <CheckCircle className="w-6 h-6" />
              Solicitação Enviada com Sucesso! 🎉
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              Sua solicitação foi enviada com sucesso! Nossa equipe especializada analisará seu projeto e entrará em contato em até 24 horas com uma proposta personalizada.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">O que acontece agora?</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Análise detalhada do seu projeto</li>
              <li>• Proposta personalizada em até 24h</li>
              <li>• Consulta gratuita para esclarecer dúvidas</li>
              <li>• Início do projeto após aprovação</li>
            </ul>
          </div>
                     <DialogFooter>
             <Button onClick={handleSuccessDialogClose} className="w-full">
               Voltar às Categorias
             </Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NGC Modal */}
      <NGCModal
        isOpen={showNGCModal}
        onClose={handleNGCModalClose}
        selectedContactMethod={selectedContactMethod}
        category={category}
        customerName={formData.name || "Cliente"}
        onComplete={handleNGCModalComplete}
      />
    </div>
  )
}
