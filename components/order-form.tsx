"use client"

import { useState } from "react"
import { useOrders } from "@/hooks/useOrders"
import { usePricingSync } from "@/hooks/usePricingSync"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, Globe, Palette, Check, Send, AlertCircle } from "lucide-react"

interface OrderFormProps {
  preSelectedCategory?: string
  preSelectedProjectType?: string
}

export default function OrderForm({ preSelectedCategory, preSelectedProjectType }: OrderFormProps) {
  const { addOrder } = useOrders()
  const { getActivePlans } = usePricingSync()
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    projectType: preSelectedProjectType || "",
    category: preSelectedCategory || "",
    description: "",
    budget: "",
    timeline: "",
    priority: "medium" as "low" | "medium" | "high"
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const botPlans = getActivePlans('bots')
  const sitePlans = getActivePlans('sites')
  const designPlans = getActivePlans('design')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const orderId = await addOrder({
        ...formData,
        status: 'pending',
        assignedTo: '',
        notes: ''
      })

      if (orderId) {
        setSuccess(true)
        setFormData({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          projectType: "",
          category: "",
          description: "",
          budget: "",
          timeline: "",
          priority: "medium"
        })
      } else {
        setError("Erro ao enviar pedido. Tente novamente.")
      }
    } catch (err) {
      setError("Erro ao enviar pedido. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getPlansByCategory = (category: string) => {
    switch (category) {
      case 'bots':
        return botPlans
      case 'sites':
        return sitePlans
      case 'design':
        return designPlans
      default:
        return []
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Solicitar Orçamento
        </CardTitle>
        <CardDescription className="text-center">
          Preencha o formulário abaixo e entraremos em contato em até 24 horas
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <Check className="h-4 w-4" />
            <AlertDescription>
              Pedido enviado com sucesso! Entraremos em contato em breve.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Cliente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Nome Completo *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="customerEmail">E-mail *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="customerPhone">Telefone *</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Tipo de Projeto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Tipo de Projeto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.category === 'bots' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('category', 'bots')}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Bots Discord</span>
                </div>
                <p className="text-sm text-gray-600">Bots inteligentes para seu servidor</p>
              </div>
              
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.category === 'sites' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('category', 'sites')}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Sites Web</span>
                </div>
                <p className="text-sm text-gray-600">Sites profissionais e responsivos</p>
              </div>
              
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.category === 'design' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('category', 'design')}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Design Gráfico</span>
                </div>
                <p className="text-sm text-gray-600">Identidade visual e materiais</p>
              </div>
            </div>
          </div>

          {/* Plano Escolhido */}
          {formData.category && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Plano Escolhido</h3>
              
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleInputChange('projectType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  {getPlansByCategory(formData.category).map((plan) => (
                    <SelectItem key={plan.id} value={plan.name}>
                      <div className="flex items-center justify-between w-full">
                        <span>{plan.name}</span>
                        <Badge variant="outline" className="ml-2">
                          R$ {plan.price.toLocaleString('pt-BR')}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Detalhes do Projeto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Detalhes do Projeto</h3>
            
            <div>
              <Label htmlFor="description">Descrição do Projeto *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva detalhadamente o que você precisa..."
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Orçamento Estimado (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="Ex: 1000"
                />
              </div>
              
              <div>
                <Label htmlFor="timeline">Prazo Desejado</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  placeholder="Ex: 2 semanas"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "low" | "medium" | "high") => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Solicitação
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
