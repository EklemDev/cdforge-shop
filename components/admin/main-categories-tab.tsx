"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useMainCategories } from "@/hooks/useFirebaseData"
import { MainCategory } from "@/lib/firebase-data-service"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface MainCategoryFormProps {
  category?: MainCategory
  onSubmit: (data: Partial<MainCategory>) => void
  onCancel: () => void
}

function MainCategoryForm({ category, onSubmit, onCancel }: MainCategoryFormProps) {
  const [formData, setFormData] = useState({
    title: category?.title || "",
    description: category?.description || "",
    icon: category?.icon || "Bot",
    href: category?.href || "",
    color: category?.color || "#3B82F6",
    bgColor: category?.bgColor || "bg-blue-500",
    hoverColor: category?.hoverColor || "hover:bg-blue-600",
    active: category?.active ?? true,
    order: category?.order ?? 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: BOTS"
            required
          />
        </div>
        <div>
          <Label htmlFor="icon">Ícone (Lucide)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Ex: Bot"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição da categoria"
          required
        />
      </div>

      <div>
        <Label htmlFor="href">Link</Label>
        <Input
          id="href"
          value={formData.href}
          onChange={(e) => setFormData({ ...formData, href: e.target.value })}
          placeholder="Ex: /bots"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="color">Cor (Hex)</Label>
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="bgColor">Cor de Fundo (Tailwind)</Label>
          <Input
            id="bgColor"
            value={formData.bgColor}
            onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
            placeholder="Ex: bg-blue-500"
            required
          />
        </div>
        <div>
          <Label htmlFor="hoverColor">Cor Hover (Tailwind)</Label>
          <Input
            id="hoverColor"
            value={formData.hoverColor}
            onChange={(e) => setFormData({ ...formData, hoverColor: e.target.value })}
            placeholder="Ex: hover:bg-blue-600"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="order">Ordem</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label htmlFor="active">Ativo</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {category ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  )
}

export default function MainCategoriesTab() {
  const { categories, loading, error, addMainCategory, updateMainCategory, deleteMainCategory } = useMainCategories()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<MainCategory | null>(null)

  const handleAdd = async (formData: Partial<MainCategory>) => {
    try {
      await addMainCategory(formData as Omit<MainCategory, 'id' | 'createdAt' | 'updatedAt'>)
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error)
    }
  }

  const handleEdit = async (formData: Partial<MainCategory>) => {
    if (!editingCategory) return
    try {
      await updateMainCategory(editingCategory.id, formData)
      setEditingCategory(null)
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      try {
        await deleteMainCategory(id)
      } catch (error) {
        console.error('Erro ao deletar categoria:', error)
      }
    }
  }

  if (loading) return <div className="text-center py-8">Carregando categorias...</div>
  if (error) return <div className="text-center py-8 text-red-500">Erro: {error}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Categorias Principais</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie as categorias da página inicial
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria para a página inicial
              </DialogDescription>
            </DialogHeader>
            <MainCategoryForm
              onSubmit={handleAdd}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <span className="text-white font-bold text-lg">
                    {category.icon.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{category.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {category.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={category.active ? "default" : "secondary"}>
                      {category.active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Badge variant="outline">Ordem: {category.order}</Badge>
                    <Badge variant="outline">{category.href}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Categoria</DialogTitle>
                      <DialogDescription>
                        Modifique os dados da categoria
                      </DialogDescription>
                    </DialogHeader>
                    <MainCategoryForm
                      category={category}
                      onSubmit={handleEdit}
                      onCancel={() => setEditingCategory(null)}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma categoria encontrada. Adicione a primeira categoria!
        </div>
      )}
    </div>
  )
}
