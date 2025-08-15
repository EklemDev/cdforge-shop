"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
  Code,
  Terminal,
  Handshake,
  MapPin,
  Clock,
  MessageCircle
} from "lucide-react"
import { useFounders } from "@/hooks/useFirebaseData"
import { Founder } from "@/lib/firebase-data-service"

const iconMap = {
  Code: Code,
  Terminal: Terminal,
  Handshake: Handshake
}

export default function FounderManager() {
  const { founders, loading, error, addFounder, updateFounder, deleteFounder } = useFounders()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    availability: {
      start: "09:00",
      end: "18:00",
      timezone: "GMT-3"
    },
    specialties: [] as string[],
    icon: "Code",
    color: "blue",
    bgGradient: "from-blue-500 to-purple-600",
    isOnline: true,
    discordId: "",
    email: "",
    phone: "",
    active: true,
    order: 1
  })
  const [specialtyInput, setSpecialtyInput] = useState("")

  const handleAdd = async () => {
    const success = await addFounder({
      ...formData,
      order: founders.length + 1
    })
    if (success) {
      setIsAddDialogOpen(false)
      setFormData({
        name: "",
        role: "",
        location: "",
        availability: {
          start: "09:00",
          end: "18:00",
          timezone: "GMT-3"
        },
        specialties: [],
        icon: "Code",
        color: "blue",
        bgGradient: "from-blue-500 to-purple-600",
        isOnline: true,
        discordId: "",
        email: "",
        phone: "",
        active: true,
        order: 1
      })
    }
  }

  const handleEdit = async () => {
    if (!editingFounder) return
    const success = await updateFounder(editingFounder.id, formData)
    if (success) {
      setIsEditDialogOpen(false)
      setEditingFounder(null)
      setFormData({
        name: "",
        role: "",
        location: "",
        availability: {
          start: "09:00",
          end: "18:00",
          timezone: "GMT-3"
        },
        specialties: [],
        icon: "Code",
        color: "blue",
        bgGradient: "from-blue-500 to-purple-600",
        isOnline: true,
        discordId: "",
        email: "",
        phone: "",
        active: true,
        order: 1
      })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteFounder(id)
  }

  const openEditDialog = (founder: Founder) => {
    setEditingFounder(founder)
    setFormData({
      name: founder.name,
      role: founder.role,
      location: founder.location,
      availability: founder.availability,
      specialties: founder.specialties,
      icon: founder.icon,
      color: founder.color,
      bgGradient: founder.bgGradient,
      isOnline: founder.isOnline,
      discordId: founder.discordId || "",
      email: founder.email || "",
      phone: founder.phone || "",
      active: founder.active,
      order: founder.order
    })
    setIsEditDialogOpen(true)
  }

  const moveFounder = async (id: string, direction: 'up' | 'down') => {
    const founder = founders.find(f => f.id === id)
    if (!founder) return

    const currentIndex = founders.findIndex(f => f.id === id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= founders.length) return

    const targetFounder = founders[newIndex]
    
    await updateFounder(id, { order: targetFounder.order })
    await updateFounder(targetFounder.id, { order: founder.order })
  }

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()]
      })
      setSpecialtyInput("")
    }
  }

  const removeSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando fundadores...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Erro ao carregar fundadores: {error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Fundadores</h2>
          <p className="text-gray-600 dark:text-gray-400">Gerencie sua equipe de fundadores</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Fundador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Fundador</DialogTitle>
              <DialogDescription>
                Adicione um novo membro à sua equipe de fundadores.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: MELKE"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Função</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Desenvolvedor Full-Stack"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: São Paulo, SP"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start">Horário Início</Label>
                  <Input
                    id="start"
                    type="time"
                    value={formData.availability.start}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: { ...formData.availability, start: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="end">Horário Fim</Label>
                  <Input
                    id="end"
                    type="time"
                    value={formData.availability.end}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: { ...formData.availability, end: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Input
                    id="timezone"
                    value={formData.availability.timezone}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: { ...formData.availability, timezone: e.target.value }
                    })}
                    placeholder="GMT-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Ícone</Label>
                  <select
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Code">Code</option>
                    <option value="Terminal">Terminal</option>
                    <option value="Handshake">Handshake</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <select
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="blue">Azul</option>
                    <option value="purple">Roxo</option>
                    <option value="green">Verde</option>
                    <option value="red">Vermelho</option>
                    <option value="yellow">Amarelo</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="specialties">Especialidades</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    placeholder="Adicionar especialidade"
                    onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                  />
                  <Button type="button" onClick={addSpecialty} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSpecialty(index)}>
                      {specialty} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discordId">Discord ID</Label>
                  <Input
                    id="discordId"
                    value={formData.discordId}
                    onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                    placeholder="Ex: melke_official"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@codeforge.dev"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isOnline"
                  checked={formData.isOnline}
                  onCheckedChange={(checked) => setFormData({ ...formData, isOnline: checked })}
                />
                <Label htmlFor="isOnline">Online</Label>
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
        {founders.map((founder, index) => {
          const IconComponent = iconMap[founder.icon as keyof typeof iconMap] || Code
          return (
            <Card key={founder.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFounder(founder.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFounder(founder.id, 'down')}
                        disabled={index === founders.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className={`w-12 h-12 bg-gradient-to-br ${founder.bgGradient} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{founder.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{founder.role}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {founder.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {founder.availability.start}-{founder.availability.end}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={founder.isOnline ? "default" : "secondary"}>
                          {founder.isOnline ? "Online" : "Offline"}
                        </Badge>
                        <Badge variant={founder.active ? "default" : "secondary"}>
                          {founder.active ? "Ativo" : "Inativo"}
                        </Badge>
                        <Badge variant="outline">Ordem: {founder.order}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {founder.specialties.slice(0, 3).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {founder.specialties.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{founder.specialties.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(founder)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o fundador "{founder.name}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(founder.id)}>
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Fundador</DialogTitle>
            <DialogDescription>
              Edite as informações do fundador.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nome</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: MELKE"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Função</Label>
                <Input
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Ex: Desenvolvedor Full-Stack"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-location">Localização</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: São Paulo, SP"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-start">Horário Início</Label>
                <Input
                  id="edit-start"
                  type="time"
                  value={formData.availability.start}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: { ...formData.availability, start: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="edit-end">Horário Fim</Label>
                <Input
                  id="edit-end"
                  type="time"
                  value={formData.availability.end}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: { ...formData.availability, end: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="edit-timezone">Fuso Horário</Label>
                <Input
                  id="edit-timezone"
                  value={formData.availability.timezone}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: { ...formData.availability, timezone: e.target.value }
                  })}
                  placeholder="GMT-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-icon">Ícone</Label>
                <select
                  id="edit-icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Code">Code</option>
                  <option value="Terminal">Terminal</option>
                  <option value="Handshake">Handshake</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-color">Cor</Label>
                <select
                  id="edit-color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="blue">Azul</option>
                  <option value="purple">Roxo</option>
                  <option value="green">Verde</option>
                  <option value="red">Vermelho</option>
                  <option value="yellow">Amarelo</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-specialties">Especialidades</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  placeholder="Adicionar especialidade"
                  onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button type="button" onClick={addSpecialty} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSpecialty(index)}>
                    {specialty} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-discordId">Discord ID</Label>
                <Input
                  id="edit-discordId"
                  value={formData.discordId}
                  onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                  placeholder="Ex: melke_official"
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="exemplo@codeforge.dev"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-phone">Telefone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-isOnline"
                checked={formData.isOnline}
                onCheckedChange={(checked) => setFormData({ ...formData, isOnline: checked })}
              />
              <Label htmlFor="edit-isOnline">Online</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <Label htmlFor="edit-active">Ativo</Label>
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
