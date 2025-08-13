"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Star,
  Tag,
  Package,
  Bot,
  Globe,
  Palette,
  Clock,
  Gift,
  Zap,
  Shield,
  Users,
  Settings,
  Calendar,
  Percent
} from "lucide-react"
import { Pricing } from "@/lib/firebase-data-service"

interface PricingTabProps {
  pricing: Pricing[]
  onAdd: (pricing: Omit<Pricing, 'id' | 'createdAt' | 'updatedAt'>) => void
  onUpdate: (id: string, pricing: Partial<Pricing>) => void
  onDelete: (id: string) => void
}

export default function PricingTab({ 
  pricing, 
  onAdd, 
  onUpdate, 
  onDelete 
}: PricingTabProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("pricing")
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    currency: 'BRL',
    type: 'bot' as 'bot' | 'site' | 'service' | 'design',
    category: '',
    features: [] as string[],
    popular: false,
    active: true,
    order: 0,
    // Novos campos para planos
    trialPeriod: 0, // dias de teste
    trialEnabled: false,
    promotion: {
      active: false,
      discount: 0, // porcentagem
      endDate: '',
      description: ''
    },
    planFeatures: {
      maxUsers: 0,
      maxStorage: 0,
      supportLevel: 'basic' as 'basic' | 'priority' | 'premium',
      customDomain: false,
      analytics: false,
      backup: false,
      ssl: false,
      apiAccess: false
    },
    billingCycle: 'monthly' as 'monthly' | 'yearly' | 'lifetime',
    setupFee: 0,
    cancellationPolicy: '',
    terms: ''
  })
  const [newFeature, setNewFeature] = useState('')

  const handleAdd = () => {
    onAdd({
      ...formData,
      order: pricing.length + 1
    })
    setIsAdding(false)
    resetForm()
  }

  const handleUpdate = (id: string) => {
    onUpdate(id, formData)
    setEditingId(null)
  }

  const handleEdit = (item: Pricing) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice || 0,
      currency: item.currency,
      type: item.type,
      category: item.category,
      features: item.features,
      popular: item.popular,
      active: item.active,
      order: item.order,
      // Novos campos com valores padrão
      trialPeriod: (item as any).trialPeriod || 0,
      trialEnabled: (item as any).trialEnabled || false,
      promotion: (item as any).promotion || {
        active: false,
        discount: 0,
        endDate: '',
        description: ''
      },
      planFeatures: (item as any).planFeatures || {
        maxUsers: 0,
        maxStorage: 0,
        supportLevel: 'basic',
        customDomain: false,
        analytics: false,
        backup: false,
        ssl: false,
        apiAccess: false
      },
      billingCycle: (item as any).billingCycle || 'monthly',
      setupFee: (item as any).setupFee || 0,
      cancellationPolicy: (item as any).cancellationPolicy || '',
      terms: (item as any).terms || ''
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      currency: 'BRL',
      type: 'bot',
      category: '',
      features: [],
      popular: false,
      active: true,
      order: 0,
      trialPeriod: 0,
      trialEnabled: false,
      promotion: {
        active: false,
        discount: 0,
        endDate: '',
        description: ''
      },
      planFeatures: {
        maxUsers: 0,
        maxStorage: 0,
        supportLevel: 'basic',
        customDomain: false,
        analytics: false,
        backup: false,
        ssl: false,
        apiAccess: false
      },
      billingCycle: 'monthly',
      setupFee: 0,
      cancellationPolicy: '',
      terms: ''
    })
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bot': return <Bot className="w-4 h-4" />
      case 'site': return <Globe className="w-4 h-4" />
      case 'design': return <Palette className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bot': return 'bg-blue-100 text-blue-800'
      case 'site': return 'bg-green-100 text-green-800'
      case 'design': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateFinalPrice = () => {
    let finalPrice = formData.price
    if (formData.promotion.active && formData.promotion.discount > 0) {
      finalPrice = finalPrice * (1 - formData.promotion.discount / 100)
    }
    return finalPrice
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Preços e Planos</h2>
          <p className="text-gray-600">Gerencie todos os preços, planos e promoções do site</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Plano
        </Button>
      </div>

      {/* Formulário de Adição/Edição */}
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {editingId ? 'Editar Plano' : 'Adicionar Novo Plano'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="pricing">Preços</TabsTrigger>
                <TabsTrigger value="features">Recursos</TabsTrigger>
                <TabsTrigger value="advanced">Avançado</TabsTrigger>
              </TabsList>

              {/* Aba Básico */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Plano</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Plano Básico, Bot Discord, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="bot">Bot</option>
                      <option value="site">Site</option>
                      <option value="design">Design</option>
                      <option value="service">Serviço</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descrição detalhada do plano"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Ex: Discord, WhatsApp, E-commerce, etc."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                    />
                    <span>Destacar como Popular</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    />
                    <span>Ativo</span>
                  </label>
                </div>
              </TabsContent>

              {/* Aba Preços */}
              <TabsContent value="pricing" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Preço Base</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preço Original (opcional)</Label>
                    <Input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Taxa de Configuração</Label>
                    <Input
                      type="number"
                      value={formData.setupFee}
                      onChange={(e) => setFormData({...formData, setupFee: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Moeda</Label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="BRL">BRL (R$)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ciclo de Cobrança</Label>
                    <select
                      value={formData.billingCycle}
                      onChange={(e) => setFormData({...formData, billingCycle: e.target.value as any})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="monthly">Mensal</option>
                      <option value="yearly">Anual</option>
                      <option value="lifetime">Vitalício</option>
                    </select>
                  </div>
                </div>

                {/* Período de Teste */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <Label className="text-sm font-medium">Período de Teste</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.trialEnabled}
                        onCheckedChange={(checked) => setFormData({...formData, trialEnabled: checked})}
                      />
                      <span>Ativar período de teste</span>
                    </label>
                    {formData.trialEnabled && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={formData.trialPeriod}
                          onChange={(e) => setFormData({...formData, trialPeriod: parseInt(e.target.value) || 0})}
                          placeholder="7"
                          className="w-20"
                        />
                        <span>dias</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Promoção */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <Label className="text-sm font-medium">Promoção</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.promotion.active}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          promotion: {...formData.promotion, active: checked}
                        })}
                      />
                      <span>Ativar promoção</span>
                    </label>
                  </div>
                  
                  {formData.promotion.active && (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Desconto (%)</Label>
                        <Input
                          type="number"
                          value={formData.promotion.discount}
                          onChange={(e) => setFormData({
                            ...formData, 
                            promotion: {...formData.promotion, discount: parseFloat(e.target.value) || 0}
                          })}
                          placeholder="10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Data de Término</Label>
                        <Input
                          type="date"
                          value={formData.promotion.endDate}
                          onChange={(e) => setFormData({
                            ...formData, 
                            promotion: {...formData.promotion, endDate: e.target.value}
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição da Promoção</Label>
                        <Input
                          value={formData.promotion.description}
                          onChange={(e) => setFormData({
                            ...formData, 
                            promotion: {...formData.promotion, description: e.target.value}
                          })}
                          placeholder="Ex: Black Friday, 50% OFF"
                        />
                      </div>
                    </div>
                  )}

                  {formData.promotion.active && formData.promotion.discount > 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <Percent className="w-4 h-4" />
                        <span className="font-medium">Preço Final: {formData.currency === 'BRL' ? 'R$' : '$'}{calculateFinalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Aba Recursos */}
              <TabsContent value="features" className="space-y-4">
                <div className="space-y-2">
                  <Label>Recursos/Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Adicionar recurso"
                      onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    />
                    <Button onClick={addFeature} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <button
                          onClick={() => removeFeature(index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recursos Avançados */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="text-sm font-medium">Recursos Avançados</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Máximo de Usuários</Label>
                      <Input
                        type="number"
                        value={formData.planFeatures.maxUsers}
                        onChange={(e) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, maxUsers: parseInt(e.target.value) || 0}
                        })}
                        placeholder="0 = ilimitado"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Armazenamento (GB)</Label>
                      <Input
                        type="number"
                        value={formData.planFeatures.maxStorage}
                        onChange={(e) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, maxStorage: parseInt(e.target.value) || 0}
                        })}
                        placeholder="0 = ilimitado"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nível de Suporte</Label>
                    <select
                      value={formData.planFeatures.supportLevel}
                      onChange={(e) => setFormData({
                        ...formData, 
                        planFeatures: {...formData.planFeatures, supportLevel: e.target.value as any}
                      })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="basic">Básico (Email)</option>
                      <option value="priority">Prioritário (Chat + Email)</option>
                      <option value="premium">Premium (24/7 + Phone)</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.planFeatures.customDomain}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, customDomain: checked}
                        })}
                      />
                      <span>Domínio Personalizado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.planFeatures.analytics}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, analytics: checked}
                        })}
                      />
                      <span>Analytics Avançado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.planFeatures.backup}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, backup: checked}
                        })}
                      />
                      <span>Backup Automático</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.planFeatures.ssl}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, ssl: checked}
                        })}
                      />
                      <span>SSL Gratuito</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch
                        checked={formData.planFeatures.apiAccess}
                        onCheckedChange={(checked) => setFormData({
                          ...formData, 
                          planFeatures: {...formData.planFeatures, apiAccess: checked}
                        })}
                      />
                      <span>Acesso à API</span>
                    </label>
                  </div>
                </div>
              </TabsContent>

              {/* Aba Avançado */}
              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <Label>Política de Cancelamento</Label>
                  <Textarea
                    value={formData.cancellationPolicy}
                    onChange={(e) => setFormData({...formData, cancellationPolicy: e.target.value})}
                    placeholder="Descreva a política de cancelamento..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Termos e Condições</Label>
                  <Textarea
                    value={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.value})}
                    placeholder="Termos específicos deste plano..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button onClick={editingId ? () => handleUpdate(editingId) : handleAdd}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Atualizar Plano' : 'Adicionar Plano'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Preços */}
      <div className="grid gap-4">
        {pricing.map((item) => (
          <Card key={item.id} className={item.popular ? 'ring-2 ring-yellow-400' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(item.type)}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {item.name}
                      {item.popular && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type.toUpperCase()}
                  </Badge>
                  {item.popular && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      POPULAR
                    </Badge>
                  )}
                  {(item as any).trialEnabled && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Clock className="w-3 h-3 mr-1" />
                      TESTE {(item as any).trialPeriod || 0}D
                    </Badge>
                  )}
                  {(item as any).promotion?.active && (
                    <Badge className="bg-red-100 text-red-800">
                      <Gift className="w-3 h-3 mr-1" />
                      {(item as any).promotion.discount}% OFF
                    </Badge>
                  )}
                  {!item.active && (
                    <Badge variant="secondary">INATIVO</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {item.currency === 'BRL' ? 'R$' : item.currency === 'USD' ? '$' : '€'}
                      {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-gray-500 line-through">
                        {item.currency === 'BRL' ? 'R$' : item.currency === 'USD' ? '$' : '€'}
                        {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {(item as any).billingCycle && (
                      <Badge variant="outline" className="text-xs">
                        {(item as any).billingCycle === 'monthly' ? 'Mensal' : 
                         (item as any).billingCycle === 'yearly' ? 'Anual' : 'Vitalício'}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Categoria: {item.category}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {item.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.features.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pricing.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum plano cadastrado</h3>
            <p className="text-gray-600 mb-4">
              Comece adicionando os primeiros planos do seu site.
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Plano
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
