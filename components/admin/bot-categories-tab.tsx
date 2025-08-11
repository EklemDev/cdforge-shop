"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Bot, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Save,
  X
} from "lucide-react"
import { BotCategory } from "@/lib/admin-data"

interface BotCategoriesTabProps {
  categories: BotCategory[]
  onAdd: (category: Omit<BotCategory, 'id'>) => void
  onUpdate: (id: string, updates: Partial<BotCategory>) => void
  onDelete: (id: string) => void
}

export default function BotCategoriesTab({ 
  categories, 
  onAdd, 
  onUpdate, 
  onDelete 
}: BotCategoriesTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BotCategory | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const handleAdd = (formData: Omit<BotCategory, 'id'>) => {
    onAdd(formData)
    setIsAddModalOpen(false)
  }

  const handleEdit = (updates: Partial<BotCategory>) => {
    if (editingCategory) {
      onUpdate(editingCategory.id, updates)
      setIsEditModalOpen(false)
      setEditingCategory(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
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
                Categorias de Bots
              </CardTitle>
              <CardDescription>
                Gerencie as categorias de bots disponíveis para os clientes
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Categoria
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de Categorias */}
      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={category.active}
                        onCheckedChange={(checked) => handleToggleActive(category.id, checked)}
                      />
                      <span className="text-sm text-gray-500">
                        {category.active ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span><strong>ID:</strong> {category.id}</span>
                    <span><strong>Ícone:</strong> {category.icon}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCategory(category)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {categories.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhuma categoria encontrada
              </h3>
              <p className="text-gray-500">
                Adicione sua primeira categoria de bot
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Categoria de Bot</DialogTitle>
          </DialogHeader>
          <CategoryForm 
            onSubmit={handleAdd}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Editar */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria de Bot</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm 
              category={editingCategory}
              onSubmit={handleEdit}
              onCancel={() => {
                setIsEditModalOpen(false)
                setEditingCategory(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente de formulário
function CategoryForm({ 
  category, 
  onSubmit, 
  onCancel 
}: { 
  category?: BotCategory
  onSubmit: (data: Partial<BotCategory>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    icon: category?.icon || "",
    active: category?.active ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome da Categoria</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Ex: Discord Bots"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Descreva esta categoria..."
          rows={3}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="icon">Ícone</Label>
        <Input
          id="icon"
          value={formData.icon}
          onChange={(e) => setFormData({...formData, icon: e.target.value})}
          placeholder="Ex: discord, whatsapp, telegram"
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData({...formData, active: checked})}
        />
        <Label htmlFor="active">Categoria Ativa</Label>
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          {category ? 'Salvar Alterações' : 'Adicionar Categoria'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  )
}
