"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Save, 
  X,
  RefreshCw,
  Globe,
  Smartphone,
  Bot,
  Zap,
  Mail,
  Phone
} from "lucide-react"

interface Platform {
  id: string
  name: string
  icon: string
  description: string
  active: boolean
  order: number
  isDefault?: boolean
  url?: string
  apiKey?: string
}

interface PlatformsTabProps {
  platforms: Platform[]
  onUpdate: (platforms: Platform[]) => void
}

// Plataformas padrão
const defaultPlatforms: Platform[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'Smartphone',
    description: 'Integração com WhatsApp Business API',
    active: true,
    order: 1,
    isDefault: true,
    url: 'https://wa.me/'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'MessageSquare',
    description: 'Bot para servidores Discord',
    active: true,
    order: 2,
    isDefault: true,
    url: 'https://discord.com/'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'MessageSquare',
    description: 'Bot para Telegram',
    active: true,
    order: 3,
    isDefault: true,
    url: 'https://telegram.org/'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'Globe',
    description: 'Integração com Instagram Direct',
    active: false,
    order: 4,
    isDefault: true,
    url: 'https://instagram.com/'
  },
  {
    id: 'email',
    name: 'Email',
    icon: 'Mail',
    description: 'Automação de emails',
    active: false,
    order: 5,
    isDefault: true,
    url: 'mailto:'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: 'Phone',
    description: 'Envio de SMS automático',
    active: false,
    order: 6,
    isDefault: true
  }
]

export default function PlatformsTab({ platforms, onUpdate }: PlatformsTabProps) {
  const [currentPlatforms, setCurrentPlatforms] = useState<Platform[]>(platforms.length > 0 ? platforms : defaultPlatforms)
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPlatform, setNewPlatform] = useState<Partial<Platform>>({
    name: '',
    description: '',
    icon: 'Globe',
    url: ''
  })

  useEffect(() => {
    if (platforms.length > 0) {
      setCurrentPlatforms(platforms)
    }
  }, [platforms])

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      MessageSquare,
      Globe,
      Smartphone,
      Bot,
      Zap,
      Mail,
      Phone
    }
    return iconMap[iconName] || Globe
  }

  const addPlatform = () => {
    if (!newPlatform.name || !newPlatform.description) {
      alert('Preencha nome e descrição da plataforma')
      return
    }

    const platform: Platform = {
      id: `platform_${Date.now()}`,
      name: newPlatform.name,
      description: newPlatform.description,
      icon: newPlatform.icon || 'Globe',
      url: newPlatform.url || '',
      active: true,
      order: currentPlatforms.length + 1
    }

    const updatedPlatforms = [...currentPlatforms, platform]
    setCurrentPlatforms(updatedPlatforms)
    onUpdate(updatedPlatforms)
    
    // Reset form
    setNewPlatform({ name: '', description: '', icon: 'Globe', url: '' })
    setShowAddForm(false)
  }

  const updatePlatform = (platformId: string, updates: Partial<Platform>) => {
    const updatedPlatforms = currentPlatforms.map(platform => 
      platform.id === platformId ? { ...platform, ...updates } : platform
    )
    setCurrentPlatforms(updatedPlatforms)
    onUpdate(updatedPlatforms)
  }

  const togglePlatformActive = (platformId: string) => {
    updatePlatform(platformId, { active: !currentPlatforms.find(p => p.id === platformId)?.active })
  }

  const startEditing = (platformId: string) => {
    setEditingPlatform(platformId)
  }

  const savePlatform = (platformId: string) => {
    setEditingPlatform(null)
  }

  const cancelEditing = () => {
    setEditingPlatform(null)
  }

  const resetPlatform = (platformId: string) => {
    const defaultPlatform = defaultPlatforms.find(p => p.id === platformId)
    if (defaultPlatform) {
      updatePlatform(platformId, {
        name: defaultPlatform.name,
        description: defaultPlatform.description,
        icon: defaultPlatform.icon,
        url: defaultPlatform.url
      })
    }
  }

  const resetAllPlatforms = () => {
    if (confirm("⚠️ Tem certeza que deseja redefinir todas as plataformas para os valores padrão?")) {
      setCurrentPlatforms(defaultPlatforms)
      onUpdate(defaultPlatforms)
    }
  }

  const removePlatform = (platformId: string) => {
    if (confirm("⚠️ Tem certeza que deseja remover esta plataforma?")) {
      const updatedPlatforms = currentPlatforms.filter(platform => platform.id !== platformId)
      setCurrentPlatforms(updatedPlatforms)
      onUpdate(updatedPlatforms)
    }
  }

  const availableIcons = [
    { value: 'MessageSquare', label: 'Mensagem' },
    { value: 'Globe', label: 'Globo' },
    { value: 'Smartphone', label: 'Smartphone' },
    { value: 'Bot', label: 'Bot' },
    { value: 'Zap', label: 'Zap' },
    { value: 'Mail', label: 'Email' },
    { value: 'Phone', label: 'Telefone' }
  ]

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Plataformas Disponíveis
              </CardTitle>
              <CardDescription>
                Gerencie as integrações e plataformas suportadas
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddForm(true)} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Plataforma
              </Button>
              <Button onClick={resetAllPlatforms} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Redefinir Todas
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Formulário de Adicionar Nova Plataforma */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nome da Plataforma</Label>
                <Input
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({...newPlatform, name: e.target.value})}
                  placeholder="Ex: Slack, Teams, etc."
                />
              </div>
              <div>
                <Label>Ícone</Label>
                <select
                  value={newPlatform.icon}
                  onChange={(e) => setNewPlatform({...newPlatform, icon: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {availableIcons.map(icon => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Label>Descrição</Label>
              <Input
                value={newPlatform.description}
                onChange={(e) => setNewPlatform({...newPlatform, description: e.target.value})}
                placeholder="Descrição da integração"
              />
            </div>
            <div>
              <Label>URL (Opcional)</Label>
              <Input
                value={newPlatform.url}
                onChange={(e) => setNewPlatform({...newPlatform, url: e.target.value})}
                placeholder="https://exemplo.com"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addPlatform}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Plataformas */}
      <div className="grid gap-4">
        {currentPlatforms.map((platform) => {
          const IconComponent = getIconComponent(platform.icon)
          
          return (
            <Card key={platform.id} className={`${!platform.active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={platform.active}
                          onCheckedChange={() => togglePlatformActive(platform.id)}
                        />
                        <Badge variant={platform.active ? "default" : "secondary"}>
                          {platform.active ? "Ativa" : "Inativa"}
                        </Badge>
                      </div>
                      <IconComponent className="w-6 h-6 text-blue-500" />
                    </div>
                    
                    <div className="flex-1">
                      {editingPlatform === platform.id ? (
                        <div className="space-y-2">
                          <Input
                            value={platform.name}
                            onChange={(e) => updatePlatform(platform.id, { name: e.target.value })}
                            placeholder="Nome da plataforma"
                          />
                          <Input
                            value={platform.description}
                            onChange={(e) => updatePlatform(platform.id, { description: e.target.value })}
                            placeholder="Descrição"
                          />
                          <Input
                            value={platform.url || ''}
                            onChange={(e) => updatePlatform(platform.id, { url: e.target.value })}
                            placeholder="URL (opcional)"
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-lg">{platform.name}</h3>
                          <p className="text-gray-600">{platform.description}</p>
                          {platform.url && (
                            <a 
                              href={platform.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {platform.url}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {editingPlatform === platform.id ? (
                      <>
                        <Button size="sm" onClick={() => savePlatform(platform.id)}>
                          <Save className="w-4 h-4 mr-1" />
                          Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => startEditing(platform.id)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => resetPlatform(platform.id)}>
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Redefinir
                        </Button>
                        {!platform.isDefault && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removePlatform(platform.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Remover
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas das Plataformas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentPlatforms.length}
              </div>
              <div className="text-sm text-gray-600">Total de Plataformas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentPlatforms.filter(p => p.active).length}
              </div>
              <div className="text-sm text-gray-600">Plataformas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {currentPlatforms.filter(p => !p.isDefault).length}
              </div>
              <div className="text-sm text-gray-600">Plataformas Customizadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview das Integrações */}
      <Card>
        <CardHeader>
          <CardTitle>Preview das Integrações</CardTitle>
          <CardDescription>
            Como as plataformas aparecem para os clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {currentPlatforms.filter(p => p.active).map((platform) => {
              const IconComponent = getIconComponent(platform.icon)
              return (
                <div key={platform.id} className="p-4 border rounded-lg text-center">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold">{platform.name}</h4>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
