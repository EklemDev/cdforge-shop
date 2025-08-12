"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Bot, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Zap,
  RefreshCw,
  Settings,
  MessageSquare,
  Clock,
  CheckCircle
} from "lucide-react"
import { BotType } from "@/lib/firebase-data-service"

interface BotTypesTabProps {
  botTypes: BotType[]
  onAdd: (botType: Omit<BotType, 'id'>) => void
  onUpdate: (id: string, updates: Partial<BotType>) => void
  onDelete: (id: string) => void
}

// Configurações padrão dos bots
const defaultBotConfig = {
  responseTime: "30 minutos",
  contactMessage: "Entraremos em contato em {time}",
  successMessage: "Solicitação enviada com sucesso! Entraremos em contato em {time}",
  customizationOptions: {
    enableQuickChat: true,
    enableAutoResponses: true,
    enableDetailedMode: false,
    enableNotifications: true,
    enableAnalytics: false,
  }
}

const defaultBotTypes: Omit<BotType, 'id'>[] = [
  {
    name: "Bot de Moderação",
    description: "Bot para moderar servidores Discord com recursos avançados",
    features: ["Auto-moderação", "Logs detalhados", "Sistema de avisos", "Filtros automáticos"],
    categoryId: "",
    active: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bot de Entretenimento",
    description: "Bot com jogos, música e comandos divertidos",
    features: ["Sistema de música", "Jogos interativos", "Comandos de diversão", "Rankings"],
    categoryId: "",
    active: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bot de Utilidades",
    description: "Bot com ferramentas úteis para o servidor",
    features: ["Pesquisas", "Calculadora", "Conversor de moedas", "Informações do servidor"],
    categoryId: "",
    active: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Bot de Anúncios",
    description: "Bot especializado em gerenciar anúncios e notificações",
    features: ["Sistema de anúncios", "Agendamento", "Canais personalizados", "Templates"],
    categoryId: "",
    active: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function BotTypesTab({ 
  botTypes, 
  onAdd, 
  onUpdate, 
  onDelete 
}: BotTypesTabProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingBotType, setEditingBotType] = useState<BotType | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("types")
  const [botConfig, setBotConfig] = useState(defaultBotConfig)

  const handleAdd = (formData: Partial<BotType>) => {
    const completeData: Omit<BotType, 'id'> = {
      name: formData.name || '',
      description: formData.description || '',
      features: formData.features || [],
      categoryId: formData.categoryId || '',
      active: formData.active ?? true,
      order: formData.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    onAdd(completeData)
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

  const handleReset = async () => {
    if (confirm("⚠️ ATENÇÃO: Tem certeza que deseja redefinir todos os tipos de bots?\n\nEsta ação irá:\n• Deletar todos os tipos personalizados\n• Recriar os 4 tipos padrão\n• Restaurar configurações originais\n\nEsta ação NÃO pode ser desfeita!")) {
      try {
        console.log('🔄 BotTypesTab: Redefinindo tipos de bots...')
        
        // Deletar todos os tipos existentes
        for (const botType of botTypes) {
          await onDelete(botType.id)
        }
        
        // Aguardar um pouco para garantir que as deleções foram processadas
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Recriar os tipos padrão
        for (const botType of defaultBotTypes) {
          await onAdd(botType)
        }
        
        // Restaurar configurações padrão
        setBotConfig(defaultBotConfig)
        
        alert("✅ Tipos de bots redefinidos com sucesso!\n\nOs 4 tipos originais foram restaurados:\n• Bot de Moderação\n• Bot de Entretenimento\n• Bot de Utilidades\n• Bot de Anúncios")
      } catch (error) {
        console.error('Erro ao redefinir tipos:', error)
        alert("❌ Erro ao redefinir tipos. Tente novamente.")
      }
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
                <Bot className="w-5 h-5" />
                Configuração dos Bots
              </CardTitle>
              <CardDescription>
                Gerencie tipos de bots e configurações gerais
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Redefinir
              </Button>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Tipo
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="types" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Tipos de Bots
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mensagens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-6">
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
                        <span><strong>Ordem:</strong> {botType.order}</span>
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
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas dos bots
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="responseTime">Tempo de Resposta</Label>
                  <Input
                    id="responseTime"
                    value={botConfig.responseTime}
                    onChange={(e) => setBotConfig({...botConfig, responseTime: e.target.value})}
                    placeholder="Ex: 30 minutos"
                  />
                </div>
                <div>
                  <Label htmlFor="botName">Nome Padrão</Label>
                  <Input
                    id="botName"
                    value="Bot Personalizado"
                    placeholder="Nome padrão dos bots"
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="botDescription">Descrição Padrão</Label>
                <Textarea
                  id="botDescription"
                  value="Bot inteligente com funcionalidades avançadas"
                  placeholder="Descrição padrão dos bots"
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Opções de Personalização
              </CardTitle>
              <CardDescription>
                Ative ou desative funcionalidades específicas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Chat Rápido</Label>
                    <p className="text-sm text-gray-600">Ativar respostas rápidas</p>
                  </div>
                  <Switch
                    checked={botConfig.customizationOptions.enableQuickChat}
                    onCheckedChange={(checked) => setBotConfig({
                      ...botConfig,
                      customizationOptions: {
                        ...botConfig.customizationOptions,
                        enableQuickChat: checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Respostas Automáticas</Label>
                    <p className="text-sm text-gray-600">Sistema de respostas automáticas</p>
                  </div>
                  <Switch
                    checked={botConfig.customizationOptions.enableAutoResponses}
                    onCheckedChange={(checked) => setBotConfig({
                      ...botConfig,
                      customizationOptions: {
                        ...botConfig.customizationOptions,
                        enableAutoResponses: checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Modo Detalhado</Label>
                    <p className="text-sm text-gray-600">Respostas mais elaboradas</p>
                  </div>
                  <Switch
                    checked={botConfig.customizationOptions.enableDetailedMode}
                    onCheckedChange={(checked) => setBotConfig({
                      ...botConfig,
                      customizationOptions: {
                        ...botConfig.customizationOptions,
                        enableDetailedMode: checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações</Label>
                    <p className="text-sm text-gray-600">Sistema de notificações</p>
                  </div>
                  <Switch
                    checked={botConfig.customizationOptions.enableNotifications}
                    onCheckedChange={(checked) => setBotConfig({
                      ...botConfig,
                      customizationOptions: {
                        ...botConfig.customizationOptions,
                        enableNotifications: checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Analytics</Label>
                    <p className="text-sm text-gray-600">Relatórios e análises</p>
                  </div>
                  <Switch
                    checked={botConfig.customizationOptions.enableAnalytics}
                    onCheckedChange={(checked) => setBotConfig({
                      ...botConfig,
                      customizationOptions: {
                        ...botConfig.customizationOptions,
                        enableAnalytics: checked
                      }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Mensagens Personalizáveis
              </CardTitle>
              <CardDescription>
                Configure as mensagens exibidas aos usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactMessage">Mensagem de Contato</Label>
                <Textarea
                  id="contactMessage"
                  value={botConfig.contactMessage}
                  onChange={(e) => setBotConfig({...botConfig, contactMessage: e.target.value})}
                  placeholder="Use {time} para inserir o tempo de resposta"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Use {"{time}"} para inserir automaticamente o tempo de resposta
                </p>
              </div>
              <div>
                <Label htmlFor="successMessage">Mensagem de Sucesso</Label>
                <Textarea
                  id="successMessage"
                  value={botConfig.successMessage}
                  onChange={(e) => setBotConfig({...botConfig, successMessage: e.target.value})}
                  placeholder="Mensagem exibida após envio bem-sucedido"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Use {"{time}"} para inserir automaticamente o tempo de resposta
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Preview das Mensagens
              </CardTitle>
              <CardDescription>
                Como as mensagens aparecem para os usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <strong>Mensagem de Contato:</strong>
                  <p className="text-sm mt-1">
                    {botConfig.contactMessage.replace('{time}', botConfig.responseTime)}
                  </p>
                </div>
                <div>
                  <strong>Mensagem de Sucesso:</strong>
                  <p className="text-sm mt-1">
                    {botConfig.successMessage.replace('{time}', botConfig.responseTime)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
