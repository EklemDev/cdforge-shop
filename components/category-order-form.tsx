"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Send
} from "lucide-react"
import { MainCategory } from "@/lib/firebase-data-service"
import FirebaseDataService from "@/lib/firebase-data-service"

interface CategoryOrderFormProps {
  category: MainCategory
  onBack: () => void
}

const budgetOptions = [
  { value: "500-1000", label: "R$ 500 - R$ 1.000" },
  { value: "1000-3000", label: "R$ 1.000 - R$ 3.000" },
  { value: "3000-5000", label: "R$ 3.000 - R$ 5.000" },
  { value: "5000-10000", label: "R$ 5.000 - R$ 10.000" },
  { value: "10000+", label: "Acima de R$ 10.000" },
  { value: "flexible", label: "Orçamento flexível" },
]

const timelineOptions = [
  { value: "1-2-weeks", label: "1-2 semanas" },
  { value: "2-4-weeks", label: "2-4 semanas" },
  { value: "1-2-months", label: "1-2 meses" },
  { value: "2-3-months", label: "2-3 meses" },
  { value: "3+months", label: "3+ meses" },
  { value: "flexible", label: "Prazo flexível" },
]

const contactMethods = [
  { id: "whatsapp", label: "WhatsApp", icon: Phone },
  { id: "email", label: "E-mail", icon: Mail },
  { id: "phone", label: "Telefone", icon: Phone },
  { id: "discord", label: "Discord", icon: MessageSquare },
]

export default function CategoryOrderForm({ category, onBack }: CategoryOrderFormProps) {
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

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleContactMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(method)
        ? prev.contactMethods.filter(m => m !== method)
        : [...prev.contactMethods, method]
    }))
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
      
      setIsSubmitting(false)
      setIsSuccessDialogOpen(true)
    } catch (error) {
      console.error('Erro ao enviar pedido:', error)
      setIsSubmitting(false)
      alert('Erro ao enviar pedido. Tente novamente.')
    }
  }

  const getCategoryFeatures = () => {
    switch (category.title.toLowerCase()) {
      case "bots":
        return [
          "Automação de vendas",
          "Sistema de pagamentos",
          "Gestão de clientes",
          "Relatórios e analytics",
          "Integração com APIs",
          "Chat personalizado",
          "Sistema de tickets",
          "Backup automático",
          "Painel administrativo",
          "Suporte 24/7"
        ]
      case "sites":
        return [
          "Design responsivo",
          "E-commerce completo",
          "Sistema de pagamentos",
          "Painel administrativo",
          "SEO otimizado",
          "Blog integrado",
          "Formulários de contato",
          "Analytics integrado",
          "Backup automático",
          "Hospedagem incluída"
        ]
      case "design":
        return [
          "Logo personalizado",
          "Identidade visual completa",
          "Manual da marca",
          "Design para redes sociais",
          "Material impresso",
          "UI/UX design",
          "Animações",
          "Templates reutilizáveis",
          "Arquivos editáveis",
          "Suporte pós-entrega"
        ]
      case "assistência":
        return [
          "Análise de Instagram",
          "Consultoria estratégica",
          "Suporte técnico",
          "Treinamento personalizado",
          "Relatórios mensais",
          "Otimização de processos",
          "Automação de tarefas",
          "Monitoramento 24/7",
          "Backup e segurança",
          "Atualizações regulares"
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 flex items-center gap-2 hover:bg-white dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para categorias
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Solicitar {category.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Preencha o formulário abaixo e nossa equipe entrará em contato para discutir seu projeto
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Informações Pessoais */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Como podemos entrar em contato com você?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Empresa/Projeto</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nome da sua empresa ou projeto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes do Projeto */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Detalhes do Projeto
              </CardTitle>
              <CardDescription>
                Conte-nos mais sobre o que você precisa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="description">Descrição do projeto *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva detalhadamente o que você precisa. Quanto mais informações, melhor poderemos atendê-lo."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Orçamento</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu orçamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline">Prazo desejado</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o prazo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelineOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Urgência do projeto</Label>
                <div className="flex gap-4 mt-2">
                  {[
                    { value: "low", label: "Baixa", color: "bg-green-100 text-green-800" },
                    { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-800" },
                    { value: "high", label: "Alta", color: "bg-orange-100 text-orange-800" },
                    { value: "urgent", label: "Urgente", color: "bg-red-100 text-red-800" },
                  ].map((urgency) => (
                    <button
                      key={urgency.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: urgency.value })}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        formData.urgency === urgency.value
                          ? urgency.color + " border-current"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {urgency.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funcionalidades */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Funcionalidades Desejadas
              </CardTitle>
              <CardDescription>
                Selecione as funcionalidades que você gostaria de incluir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getCategoryFeatures().map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Contato */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Preferências de Contato
              </CardTitle>
              <CardDescription>
                Como você prefere que entremos em contato?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contactMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={method.id}
                        checked={formData.contactMethods.includes(method.id)}
                        onCheckedChange={() => handleContactMethodToggle(method.id)}
                      />
                      <Label htmlFor={method.id} className="text-sm cursor-pointer flex items-center gap-1">
                        <Icon className="w-4 h-4" />
                        {method.label}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>
                Alguma informação extra que gostaria de compartilhar?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Links de referência, exemplos, requisitos específicos, etc."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Botão de Envio */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Enviar Solicitação
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Dialog de Sucesso */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Solicitação Enviada!
            </DialogTitle>
            <DialogDescription>
              Sua solicitação foi enviada com sucesso. Nossa equipe entrará em contato em até 24 horas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
