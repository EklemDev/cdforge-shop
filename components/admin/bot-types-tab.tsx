"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Zap
} from "lucide-react"
import { BotType } from "@/lib/firebase-data-service"

interface BotTypesTabProps {
  botTypes: BotType[]
  onAdd: (botType: Omit<BotType, 'id'>) => void
  onUpdate: (id: string, updates: Partial<BotType>) => void
  onDelete: (id: string) => void
}

export default function BotTypesTab({ 
  botTypes, 
  onAdd, 
  onUpdate, 
  onDelete 
}: BotTypesTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingBotType, setEditingBotType] = useState<BotType | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAdd = (formData: Omit<BotType, 'id'>) => {
    onAdd(formData)
    setIsAddModalOpen(false)
  }

  const handleEdit = (updates: Partial<BotType>) => {
    if (editingBotType) {
      onUpdate(editingBotType.id, updates)
      setIsEditModalOpen(false)
      setEditingBotType(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este tipo de bot?")) {
      onDelete(id)
    }
  }

  const handleToggleActive = (id: string, active: boolean) => {
    onUpdate(id, { active })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Tipos de Bots
              </CardTitle>
              <CardDescription>
                Gerencie os tipos de bots disponíveis para os clientes
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Tipo
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de Tipos de Bots */}
      <div className="grid gap-4">
        {botTypes.map((botType) => (
          <Card key={botType.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{botType.name}</h3>
                      <p className="text-sm text-gray-600">{botType.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={botType.active}
                        onCheckedChange={(checked) => handleToggleActive(botType.id, checked)}
                      />
                      <span className="text-sm text-gray-500">
                        {botType.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Label className="text-sm font-medium text-gray-700">Funcionalidades:</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {botType.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span><strong>ID:</strong> {botType.id}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingBotType(botType)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(botType.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {botTypes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum tipo de bot encontrado
              </h3>
              <p className="text-gray-500">
                Adicione seu primeiro tipo de bot
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Tipo de Bot</DialogTitle>
          </DialogHeader>
          <BotTypeForm 
            onSubmit={handleAdd}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Editar */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Tipo de Bot</DialogTitle>
          </DialogHeader>
          {editingBotType && (
            <BotTypeForm 
              botType={editingBotType}
              onSubmit={handleEdit}
              onCancel={() => {
                setIsEditModalOpen(false)
                setEditingBotType(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente de formulário
function BotTypeForm({ 
  botType, 
  onSubmit, 
  onCancel 
}: { 
  botType?: BotType
  onSubmit: (data: Partial<BotType>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: botType?.name || "",
    description: botType?.description || "",
    features: botType?.features || [""],
    active: botType?.active ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtrar features vazias
    const cleanFeatures = formData.features.filter(feature => feature.trim() !== "")
    onSubmit({ ...formData, features: cleanFeatures })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Tipo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Ex: Moderação"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Descreva este tipo de bot..."
          rows={3}
          required
        />
      </div>
      
      <div>
        <Label className="text-base font-medium">Funcionalidades</Label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Funcionalidade ${index + 1}`}
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Funcionalidade
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData({...formData, active: checked})}
        />
        <Label htmlFor="active">Tipo Ativo</Label>
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          {botType ? 'Salvar Alterações' : 'Adicionar Tipo'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  )
}
