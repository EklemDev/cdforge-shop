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
  Bot,
  Globe,
  Palette,
  Settings
} from "lucide-react"
import { Service } from "@/lib/firebase-data-service"

interface ServicesTabProps {
  services: Service[]
  onAdd: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void
  onUpdate: (id: string, service: Partial<Service>) => void
  onDelete: (id: string) => void
}

export default function ServicesTab({ services, onAdd, onUpdate, onDelete }: ServicesTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || service.type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: Service['type']) => {
    const icons = {
      bot: <Bot className="w-4 h-4" />,
      site: <Globe className="w-4 h-4" />,
      design: <Palette className="w-4 h-4" />,
      service: <Settings className="w-4 h-4" />
    }
    return icons[type] || <Settings className="w-4 h-4" />
  }

  const getTypeBadge = (type: Service['type']) => {
    const config = {
      bot: { label: "Bot", className: "bg-blue-100 text-blue-800" },
      site: { label: "Site", className: "bg-green-100 text-green-800" },
      design: { label: "Design", className: "bg-purple-100 text-purple-800" },
      service: { label: "Serviço", className: "bg-orange-100 text-orange-800" }
    }
    
    const serviceConfig = config[type]
    return <Badge className={serviceConfig.className}>{serviceConfig.label}</Badge>
  }

  const handleAdd = (formData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    onAdd({
      ...formData,
      order: services.length + 1
    })
    setIsAddModalOpen(false)
  }

  const handleEdit = (id: string, updates: Partial<Service>) => {
    onUpdate(id, updates)
    setIsEditModalOpen(false)
    setSelectedService(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
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
                <Settings className="w-5 h-5" />
                Gerenciar Serviços
              </CardTitle>
              <CardDescription>
                Gerencie todos os serviços oferecidos pela empresa
              </CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Serviço
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar serviços..."
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
                <SelectItem value="bot">Bots</SelectItem>
                <SelectItem value="site">Sites</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="service">Serviços</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Serviços */}
      <div className="grid gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(service.type)}
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                    </div>
                    {getTypeBadge(service.type)}
                    {!service.active && (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">{service.shortDescription}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Categoria: {service.category}</span>
                    <span>Ordem: {service.order}</span>
                    <span>{service.features.length} recursos</span>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedService(service)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredServices.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum serviço encontrado
              </h3>
              <p className="text-gray-500">
                {searchTerm || typeFilter !== "all" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Ainda não há serviços cadastrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar */}
      <ServiceForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        title="Adicionar Serviço"
      />

      {/* Modal de Editar */}
      {selectedService && (
        <ServiceForm
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedService(null)
          }}
          onSubmit={(formData) => handleEdit(selectedService.id, formData)}
          title="Editar Serviço"
          service={selectedService}
        />
      )}
    </div>
  )
}

// Componente de Formulário
function ServiceForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  service 
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void
  title: string
  service?: Service
}) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    shortDescription: service?.shortDescription || "",
    icon: service?.icon || "",
    type: service?.type || "service" as Service['type'],
    category: service?.category || "",
    features: service?.features || [""],
    benefits: service?.benefits || [""],
    process: service?.process || [""],
    examples: service?.examples || [""],
    active: service?.active ?? true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      order: services.length + 1,
      features: formData.features.filter(f => f.trim() !== ""),
      benefits: formData.benefits.filter(b => b.trim() !== ""),
      process: formData.process.filter(p => p.trim() !== ""),
      examples: formData.examples.filter(e => e.trim() !== "")
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
              <Label htmlFor="name">Nome do Serviço *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Tipo *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as Service['type']})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bot">Bot</SelectItem>
                  <SelectItem value="site">Site</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="service">Serviço</SelectItem>
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
            <Label htmlFor="shortDescription">Descrição Curta *</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição Completa *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
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
              placeholder="Nome do ícone (ex: bot, globe, palette)"
            />
          </div>

          {/* Recursos */}
          <div>
            <Label>Recursos</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateArrayItem('features', index, e.target.value)}
                    placeholder="Recurso do serviço"
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

          {/* Benefícios */}
          <div>
            <Label>Benefícios</Label>
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                    placeholder="Benefício do serviço"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('benefits', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem('benefits', '')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Benefício
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
            />
            <Label htmlFor="active">Serviço Ativo</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {service ? 'Atualizar' : 'Adicionar'} Serviço
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
