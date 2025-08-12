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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBotFeatures, useBotConfig } from "@/hooks/useFirebaseData"
import { BotFeature, BotConfig } from "@/lib/firebase-data-service"
import { Plus, Edit, Trash2, RefreshCw, Bot, Settings, MessageSquare, Clock, CheckCircle } from "lucide-react"

interface BotFeatureFormProps {
  feature?: BotFeature
  onSubmit: (data: Partial<BotFeature>) => void
  onCancel: () => void
}

function BotFeatureForm({ feature, onSubmit, onCancel }: BotFeatureFormProps) {
  const [formData, setFormData] = useState({
    name: feature?.name || "",
    description: feature?.description || "",
    enabled: feature?.enabled ?? true,
    order: feature?.order ?? 0,
    category: feature?.category || "basic" as const,
    icon: feature?.icon || "Bot",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome da Funcionalidade</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Chat Rápido"
            required
          />
        </div>
        <div>
          <Label htmlFor="icon">Ícone (Lucide)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Ex: MessageSquare"
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
          placeholder="Descrição da funcionalidade"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Básico</SelectItem>
              <SelectItem value="advanced">Avançado</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
          />
          <Label htmlFor="enabled">Ativo</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {feature ? "Atualizar" : "Adicionar"}
        </Button>
      </div>
    </form>
  )
}

export default function BotConfigTab() {
  const { features, loading: featuresLoading, error: featuresError, addBotFeature, updateBotFeature, deleteBotFeature } = useBotFeatures()
  const { config, loading: configLoading, error: configError, updateBotConfig } = useBotConfig()
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<BotFeature | null>(null)
  const [activeTab, setActiveTab] = useState("config")

  // Configurações padrão
  const defaultBotConfig: Partial<BotConfig> = {
    name: "Bot Personalizado",
    description: "Bot inteligente com funcionalidades avançadas",
    responseTime: "30 minutos",
    contactMessage: "Entraremos em contato em {time}",
    successMessage: "Solicitação enviada com sucesso! Entraremos em contato em {time}",
    customizationOptions: {
      enableQuickChat: true,
      enableAutoResponses: true,
      enableDetailedMode: false,
      enableNotifications: true,
      enableAnalytics: false,
    },
    active: true,
  }

  const defaultBotFeatures: Omit<BotFeature, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: "Chat Rápido",
      description: "Respostas automáticas para perguntas frequentes",
      enabled: true,
      order: 1,
      category: "basic",
      icon: "MessageSquare",
    },
    {
      name: "Atendimento Express",
      description: "Modo de atendimento prioritário",
      enabled: true,
      order: 2,
      category: "basic",
      icon: "Zap",
    },
    {
      name: "Respostas Automáticas",
      description: "Sistema de respostas pré-definidas",
      enabled: true,
      order: 3,
      category: "advanced",
      icon: "Bot",
    },
    {
      name: "Modo Detalhado",
      description: "Respostas mais elaboradas e informativas",
      enabled: false,
      order: 4,
      category: "advanced",
      icon: "FileText",
    },
    {
      name: "Notificações",
      description: "Sistema de notificações em tempo real",
      enabled: true,
      order: 5,
      category: "premium",
      icon: "Bell",
    },
    {
      name: "Analytics",
      description: "Relatórios e análises de uso",
      enabled: false,
      order: 6,
      category: "premium",
      icon: "BarChart3",
    },
  ]

  const handleAddFeature = async (formData: Partial<BotFeature>) => {
    try {
      await addBotFeature(formData as Omit<BotFeature, 'id' | 'createdAt' | 'updatedAt'>)
      setIsAddFeatureModalOpen(false)
    } catch (error) {
      console.error('Erro ao adicionar funcionalidade:', error)
    }
  }

  const handleEditFeature = async (formData: Partial<BotFeature>) => {
    if (!editingFeature) return
    try {
      await updateBotFeature(editingFeature.id, formData)
      setEditingFeature(null)
    } catch (error) {
      console.error('Erro ao atualizar funcionalidade:', error)
    }
  }

  const handleDeleteFeature = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta funcionalidade?')) {
      try {
        await deleteBotFeature(id)
      } catch (error) {
        console.error('Erro ao deletar funcionalidade:', error)
      }
    }
  }

  const handleReset = async () => {
    if (confirm("⚠️ ATENÇÃO: Tem certeza que deseja redefinir todas as configurações dos bots?\n\nEsta ação irá:\n• Restaurar configurações padrão\n• Deletar funcionalidades personalizadas\n• Recriar funcionalidades originais\n\nEsta ação NÃO pode ser desfeita!")) {
      try {
        console.log('🔄 BotConfigTab: Redefinindo configurações dos bots...')
        
        // Deletar todas as funcionalidades existentes
        for (const feature of features) {
          await deleteBotFeature(feature.id)
        }
        
        // Aguardar um pouco para garantir que as deleções foram processadas
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Recriar as funcionalidades padrão
        for (const feature of defaultBotFeatures) {
          await addBotFeature(feature)
        }
        
        // Restaurar configurações padrão
        await updateBotConfig(defaultBotConfig)
        
        alert("✅ Configurações dos bots redefinidas com sucesso!\n\nTodas as configurações foram restauradas para os valores padrão originais.")
      } catch (error) {
        console.error('Erro ao redefinir configurações:', error)
        alert("❌ Erro ao redefinir configurações. Tente novamente.")
      }
    }
  }

  if (featuresLoading || configLoading) return <div className="text-center py-8">Carregando configurações dos bots...</div>
  if (featuresError || configError) return <div className="text-center py-8 text-red-500">Erro: {featuresError || configError}</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Configurações dos Bots</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie funcionalidades e configurações dos bots
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Redefinir
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Funcionalidades
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Mensagens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações básicas do bot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="botName">Nome do Bot</Label>
                  <Input
                    id="botName"
                    value={config?.name || ""}
                    onChange={(e) => updateBotConfig({ name: e.target.value })}
                    placeholder="Nome do bot"
                  />
                </div>
                <div>
                  <Label htmlFor="responseTime">Tempo de Resposta</Label>
                  <Input
                    id="responseTime"
                    value={config?.responseTime || ""}
                    onChange={(e) => updateBotConfig({ responseTime: e.target.value })}
                    placeholder="Ex: 30 minutos"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="botDescription">Descrição</Label>
                <Textarea
                  id="botDescription"
                  value={config?.description || ""}
                  onChange={(e) => updateBotConfig({ description: e.target.value })}
                  placeholder="Descrição do bot"
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
                    checked={config?.customizationOptions?.enableQuickChat || false}
                    onCheckedChange={(checked) => updateBotConfig({
                      customizationOptions: {
                        ...config?.customizationOptions,
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
                    checked={config?.customizationOptions?.enableAutoResponses || false}
                    onCheckedChange={(checked) => updateBotConfig({
                      customizationOptions: {
                        ...config?.customizationOptions,
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
                    checked={config?.customizationOptions?.enableDetailedMode || false}
                    onCheckedChange={(checked) => updateBotConfig({
                      customizationOptions: {
                        ...config?.customizationOptions,
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
                    checked={config?.customizationOptions?.enableNotifications || false}
                    onCheckedChange={(checked) => updateBotConfig({
                      customizationOptions: {
                        ...config?.customizationOptions,
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
                    checked={config?.customizationOptions?.enableAnalytics || false}
                    onCheckedChange={(checked) => updateBotConfig({
                      customizationOptions: {
                        ...config?.customizationOptions,
                        enableAnalytics: checked
                      }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">Funcionalidades do Bot</h4>
              <p className="text-sm text-gray-600">Gerencie as funcionalidades disponíveis</p>
            </div>
            <Dialog open={isAddFeatureModalOpen} onOpenChange={setIsAddFeatureModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Funcionalidade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Funcionalidade</DialogTitle>
                  <DialogDescription>
                    Crie uma nova funcionalidade para o bot
                  </DialogDescription>
                </DialogHeader>
                <BotFeatureForm
                  onSubmit={handleAddFeature}
                  onCancel={() => setIsAddFeatureModalOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <Card key={feature.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{feature.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={feature.enabled ? "default" : "secondary"}>
                          {feature.enabled ? "Ativo" : "Inativo"}
                        </Badge>
                        <Badge variant="outline">{feature.category}</Badge>
                        <Badge variant="outline">Ordem: {feature.order}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingFeature(feature)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Funcionalidade</DialogTitle>
                          <DialogDescription>
                            Modifique os dados da funcionalidade
                          </DialogDescription>
                        </DialogHeader>
                        <BotFeatureForm
                          feature={feature}
                          onSubmit={handleEditFeature}
                          onCancel={() => setEditingFeature(null)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteFeature(feature.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {features.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma funcionalidade encontrada. Adicione a primeira funcionalidade!
            </div>
          )}
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
                  value={config?.contactMessage || ""}
                  onChange={(e) => updateBotConfig({ contactMessage: e.target.value })}
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
                  value={config?.successMessage || ""}
                  onChange={(e) => updateBotConfig({ successMessage: e.target.value })}
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
                    {config?.contactMessage?.replace('{time}', config?.responseTime || '30 minutos')}
                  </p>
                </div>
                <div>
                  <strong>Mensagem de Sucesso:</strong>
                  <p className="text-sm mt-1">
                    {config?.successMessage?.replace('{time}', config?.responseTime || '30 minutos')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
