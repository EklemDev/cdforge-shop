"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
  Palette
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
    order: 0
  })
  const [newFeature, setNewFeature] = useState('')

  const handleAdd = () => {
    onAdd({
      ...formData,
      order: pricing.length + 1
    })
    setIsAdding(false)
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
      order: 0
    })
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
      order: item.order
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
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
      order: 0
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Preços</h2>
          <p className="text-gray-600">Gerencie todos os preços e planos do site</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Preço
        </Button>
      </div>

      {/* Formulário de Adição/Edição */}
      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {editingId ? 'Editar Preço' : 'Adicionar Novo Preço'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome do Preço/Plano</Label>
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
                placeholder="Descrição detalhada do preço/plano"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Preço Atual</Label>
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
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Ex: Discord, WhatsApp, E-commerce, etc."
              />
            </div>

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

            <div className="flex gap-2">
              <Button onClick={editingId ? () => handleUpdate(editingId) : handleAdd}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? 'Atualizar' : 'Adicionar'}
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
                    {item.originalPrice > item.price && (
                      <span className="text-gray-500 line-through">
                        {item.currency === 'BRL' ? 'R$' : item.currency === 'USD' ? '$' : '€'}
                        {item.originalPrice.toFixed(2)}
                      </span>
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
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum preço cadastrado</h3>
            <p className="text-gray-600 mb-4">
              Comece adicionando os primeiros preços e planos do seu site.
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Preço
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
