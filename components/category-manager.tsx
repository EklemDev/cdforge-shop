"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown,
  Globe,
  Bot,
  Palette,
  Settings
} from "lucide-react"
import { useMainCategories } from "@/hooks/useFirebaseData"
import { MainCategory } from "@/lib/firebase-data-service"

const iconMap = {
  Bot: Bot,
  Globe: Globe,
  Palette: Palette,
  Settings: Settings
}

export default function CategoryManager() {
  const { categories, loading, error, addMainCategory, updateMainCategory, deleteMainCategory } = useMainCategories()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<MainCategory | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Globe",
    href: "",
    color: "#3B82F6",
    bgColor: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    active: true,
    order: 1
  })

  const handleAdd = async () => {
    if (categories.length >= 3) {
      alert('Limite máximo de 3 categorias atingido!')
      return
    }
    
    const success = await addMainCategory({
      ...formData,
      order: categories.length + 1
    })
    if (success) {
      setIsAddDialogOpen(false)
      setFormData({
        title: "",
        description: "",
        icon: "Globe",
        href: "",
        color: "#3B82F6",
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        active: true,
        order: 1
      })
    }
  }

  const handleEdit = async () => {
    if (!editingCategory) return
    const success = await updateMainCategory(editingCategory.id, formData)
    if (success) {
      setIsEditDialogOpen(false)
      setEditingCategory(null)
      setFormData({
        title: "",
        description: "",
        icon: "Globe",
        href: "",
        color: "#3B82F6",
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        active: true,
        order: 1
      })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteMainCategory(id)
  }

  const openEditDialog = (category: MainCategory) => {
    setEditingCategory(category)
    setFormData({
      title: category.title,
      description: category.description,
      icon: category.icon,
      href: category.href,
      color: category.color,
      bgColor: category.bgColor,
      hoverColor: category.hoverColor,
      active: category.active,
      order: category.order
    })
    setIsEditDialogOpen(true)
  }

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const category = categories.find(c => c.id === id)
    if (!category) return

    const currentIndex = categories.findIndex(c => c.id === id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= categories.length) return

    const targetCategory = categories[newIndex]
    
    await updateMainCategory(id, { order: targetCategory.order })
    await updateMainCategory(targetCategory.id, { order: category.order })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando categorias...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Erro ao carregar categorias: {error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Categorias</h2>
          <p className="text-gray-600 dark:text-gray-400">Organize suas categorias principais</p>
          {categories.length >= 3 && (
            <p className="text-orange-600 text-sm mt-1">⚠️ Limite máximo de 3 categorias atingido</p>
          )}
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={categories.length >= 3}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Categoria
              {categories.length >= 3 && <span className="ml-2 text-xs">(Limite: 3)</span>}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria para organizar seus serviços.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: BOTS"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Ícone</Label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Bot">Bot</option>
                    <option value="Globe">Globe</option>
                    <option value="Palette">Palette</option>
                    <option value="Settings">Settings</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da categoria"
                />
              </div>
              <div>
                <Label htmlFor="href">Link</Label>
                <Input
                  id="href"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  placeholder="Ex: /bots"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="bgColor">Classe BG</Label>
                  <Input
                    id="bgColor"
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    placeholder="bg-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="hoverColor">Classe Hover</Label>
                  <Input
                    id="hoverColor"
                    value={formData.hoverColor}
                    onChange={(e) => setFormData({ ...formData, hoverColor: e.target.value })}
                    placeholder="hover:bg-blue-600"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
                          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="cursor-pointer">
              Cancelar
            </Button>
            <Button onClick={handleAdd} className="cursor-pointer">Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Globe
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveCategory(category.id, 'up')}
                        disabled={index === 0}
                        className="cursor-pointer"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveCategory(category.id, 'down')}
                        disabled={index === categories.length - 1}
                        className="cursor-pointer"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={category.active ? "default" : "secondary"}>
                          {category.active ? "Ativo" : "Inativo"}
                        </Badge>
                        <Badge variant="outline">Ordem: {category.order}</Badge>
                        <Badge variant="outline">{category.href}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(category)}
                      className="cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir a categoria "{category.title}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)} className="cursor-pointer">
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              Edite as informações da categoria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: BOTS"
                />
              </div>
              <div>
                <Label htmlFor="edit-icon">Ícone</Label>
                <select
                  id="edit-icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Bot">Bot</option>
                  <option value="Globe">Globe</option>
                  <option value="Palette">Palette</option>
                  <option value="Settings">Settings</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição da categoria"
              />
            </div>
            <div>
              <Label htmlFor="edit-href">Link</Label>
              <Input
                id="edit-href"
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                placeholder="Ex: /bots"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-color">Cor</Label>
                <Input
                  id="edit-color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-bgColor">Classe BG</Label>
                <Input
                  id="edit-bgColor"
                  value={formData.bgColor}
                  onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                  placeholder="bg-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-hoverColor">Classe Hover</Label>
                <Input
                  id="edit-hoverColor"
                  value={formData.hoverColor}
                  onChange={(e) => setFormData({ ...formData, hoverColor: e.target.value })}
                  placeholder="hover:bg-blue-600"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="cursor-pointer">
              Cancelar
            </Button>
            <Button onClick={handleEdit} className="cursor-pointer">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
