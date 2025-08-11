"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  DollarSign,
  Star,
  Crown
} from "lucide-react"
import { Plan } from "@/lib/firebase-data-service"

interface PlansTabProps {
  plans: Plan[]
  onAdd: (plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => void
  onUpdate: (id: string, plan: Partial<Plan>) => void
  onDelete: (id: string) => void
}

export default function PlansTab({ plans, onAdd, onUpdate, onDelete }: PlansTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || plan.type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: Plan['type']) => {
    const icons = {
      basic: <DollarSign className="w-4 h-4" />,
      pro: <Star className="w-4 h-4" />,
      enterprise: <Crown className="w-4 h-4" />
    }
    return icons[type] || <DollarSign className="w-4 h-4" />
  }

  const getTypeBadge = (type: Plan['type']) => {
    const config = {
      basic: { label: "Básico", className: "bg-green-100 text-green-800" },
      pro: { label: "Profissional", className: "bg-blue-100 text-blue-800" },
      enterprise: { label: "Empresarial", className: "bg-purple-100 text-purple-800" }
    }
    
    const planConfig = config[type]
    return <Badge className={planConfig.className}>{planConfig.label}</Badge>
  }

  const handleAdd = (formData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
    onAdd({
      ...formData,
      order: plans.length + 1
    })
    setIsAddModalOpen(false)
  }

  const handleEdit = (id: string, updates: Partial<Plan>) => {
    onUpdate(id, updates)
    setIsEditModalOpen(false)
    setSelectedPlan(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      onDelete(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Gerenciar Planos
              </CardTitle>
              <CardDescription>
                Gerencie todos os planos e preços oferecidos
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Plano
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar planos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="pro">Profissional</SelectItem>
                <SelectItem value="enterprise">Empresarial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Planos */}
      <div className="grid gap-4">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(plan.type)}
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                    </div>
                    {getTypeBadge(plan.type)}
                    {plan.popular && (
                      <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                    )}
                    {!plan.active && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{plan.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="text-lg font-bold text-green-600">
                      R$ {plan.price.toFixed(2)}
                    </span>
                    {plan.originalPrice && plan.originalPrice > plan.price && (
                      <span className="text-gray-400 line-through">
                        R$ {plan.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span>Categoria: {plan.category}</span>
                    <span>Ordem: {plan.order}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{plan.features.length} recursos</span>
                    <span>{plan.limitations.length} limitações</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPlan(plan)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPlans.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum plano encontrado
              </h3>
              <p className="text-gray-500">
                {searchTerm || typeFilter !== "all" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Ainda não há planos cadastrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar */}
      <PlanForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        title="Adicionar Plano"
      />

      {/* Modal de Editar */}
      {selectedPlan && (
        <PlanForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedPlan(null)
          }}
          onSubmit={(formData) => handleEdit(selectedPlan.id, formData)}
          title="Editar Plano"
          plan={selectedPlan}
        />
      )}
    </div>
  )
}

// Componente de Formulário
function PlanForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  plan 
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => void
  title: string
  plan?: Plan
}) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    description: plan?.description || "",
    price: plan?.price || 0,
    originalPrice: plan?.originalPrice || 0,
    currency: plan?.currency || "BRL",
    type: plan?.type || "basic" as Plan['type'],
    category: plan?.category || "",
    features: plan?.features || [""],
    limitations: plan?.limitations || [""],
    popular: plan?.popular ?? false,
    active: plan?.active ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      features: formData.features.filter(f => f.trim() !== ""),
      limitations: formData.limitations.filter(l => l.trim() !== "")
    })
  }

  const addArrayItem = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field] as string[], value]
    }))
  }

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (field: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome do Plano *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as Plan['type']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="pro">Profissional</SelectItem>
                  <SelectItem value="enterprise">Empresarial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="category">Categoria *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço Atual (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="originalPrice">Preço Original (R$)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || 0})}
                placeholder="Para mostrar desconto"
              />
            </div>
          </div>

          {/* Recursos */}
          <div>
            <Label>Recursos Inclusos</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateArrayItem('features', index, e.target.value)}
                    placeholder="Recurso do plano"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('features', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('features', '')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Recurso
              </Button>
            </div>
          </div>

          {/* Limitações */}
          <div>
            <Label>Limitações</Label>
            <div className="space-y-2">
              {formData.limitations.map((limitation, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={limitation}
                    onChange={(e) => updateArrayItem('limitations', index, e.target.value)}
                    placeholder="Limitação do plano"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('limitations', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('limitations', '')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Limitação
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="popular"
                checked={formData.popular}
                onChange={(e) => setFormData({...formData, popular: e.target.checked})}
              />
              <Label htmlFor="popular">Plano Popular</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
              />
              <Label htmlFor="active">Plano Ativo</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {plan ? 'Atualizar' : 'Adicionar'} Plano
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
