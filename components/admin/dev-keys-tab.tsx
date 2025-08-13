"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  Key, 
  Plus, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { DevKey } from "@/lib/firebase-data-service"

interface DevKeysTabProps {
  keys: DevKey[]
  onAdd: (key: Omit<DevKey, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string | null>
  onUpdate: (id: string, key: Partial<DevKey>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export default function DevKeysTab({ keys, onAdd, onUpdate, onDelete }: DevKeysTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState<DevKey | null>(null)
  const [loading, setLoading] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  
  const [newKeyData, setNewKeyData] = useState({
    name: "",
    description: "",
    active: true
  })

  // Função para gerar chave aleatória
  const generateKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const segments = [4, 4, 4, 4] // Formato: XXXX-XXXX-XXXX-XXXX
    return segments.map(segment => 
      Array.from({ length: segment }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    ).join('-')
  }

  const handleAddKey = async () => {
    if (!newKeyData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para a chave.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const keyData = {
        key: generateKey(),
        name: newKeyData.name,
        description: newKeyData.description,
        active: newKeyData.active,
        usageCount: 0
      }

      const result = await onAdd(keyData)
      
      if (result) {
        toast({
          title: "Chave criada com sucesso!",
          description: "A nova chave de desenvolvedor foi criada.",
        })
        setIsAddDialogOpen(false)
        setNewKeyData({ name: "", description: "", active: true })
      } else {
        throw new Error("Falha ao criar chave")
      }
    } catch (error) {
      toast({
        title: "Erro ao criar chave",
        description: "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleKey = async (key: DevKey) => {
    try {
      const success = await onUpdate(key.id, { active: !key.active })
      if (success) {
        toast({
          title: key.active ? "Chave desativada" : "Chave ativada",
          description: `A chave "${key.name}" foi ${key.active ? 'desativada' : 'ativada'}.`,
        })
      } else {
        throw new Error("Falha ao atualizar chave")
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar chave",
        description: "Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteKey = async () => {
    if (!selectedKey) return

    // Verificar se é a última chave ativa
    const activeKeys = keys.filter(k => k.active)
    if (activeKeys.length === 1 && selectedKey.active) {
      toast({
        title: "Não é possível excluir",
        description: "Você deve manter pelo menos uma chave ativa. Crie uma nova antes de excluir esta.",
        variant: "destructive",
      })
      setIsDeleteDialogOpen(false)
      return
    }

    setLoading(true)
    try {
      const success = await onDelete(selectedKey.id)
      if (success) {
        toast({
          title: "Chave excluída",
          description: `A chave "${selectedKey.name}" foi excluída.`,
        })
        setIsDeleteDialogOpen(false)
        setSelectedKey(null)
      } else {
        throw new Error("Falha ao excluir chave")
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir chave",
        description: "Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Chave copiada!",
      description: "A chave foi copiada para a área de transferência.",
    })
  }

  const copyAllKeys = () => {
    const allKeys = keys.map(k => `${k.name}: ${k.key}`).join('\n')
    navigator.clipboard.writeText(allKeys)
    toast({
      title: "Todas as chaves copiadas!",
      description: "As chaves foram copiadas para a área de transferência.",
    })
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🔑 Chaves de Desenvolvedor</h2>
          <p className="text-gray-600">Gerencie as chaves de acesso para APIs e funcionalidades avançadas</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={copyAllKeys}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar Todas
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Gerar Nova Chave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Nova Chave de Desenvolvedor</DialogTitle>
                <DialogDescription>
                  Crie uma nova chave para acesso às funcionalidades avançadas do sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="keyName">Nome da Chave *</Label>
                  <Input
                    id="keyName"
                    value={newKeyData.name}
                    onChange={(e) => setNewKeyData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Chave Principal"
                  />
                </div>
                <div>
                  <Label htmlFor="keyDescription">Descrição</Label>
                  <Textarea
                    id="keyDescription"
                    value={newKeyData.description}
                    onChange={(e) => setNewKeyData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição opcional da chave"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="keyActive"
                    checked={newKeyData.active}
                    onCheckedChange={(checked) => setNewKeyData(prev => ({ ...prev, active: checked }))}
                  />
                  <Label htmlFor="keyActive">Chave ativa</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddKey} disabled={loading}>
                  {loading ? "Criando..." : "Criar Chave"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Lista de Chaves */}
      <div className="grid gap-4">
        {keys.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma chave encontrada</h3>
              <p className="text-gray-600 mb-4">Crie sua primeira chave de desenvolvedor para começar.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Chave
              </Button>
            </CardContent>
          </Card>
        ) : (
          keys.map((key) => (
            <Card key={key.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{key.name}</h3>
                      <Badge variant={key.active ? "default" : "secondary"}>
                        {key.active ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ativa
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Inativa
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    {key.description && (
                      <p className="text-gray-600 text-sm mb-3">{key.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Key className="w-4 h-4" />
                        <span className="font-mono">
                          {showKeys[key.id] ? key.key : '••••-••••-••••-••••'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="h-6 w-6 p-0"
                        >
                          {showKeys[key.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                      </div>
                      <span>Usos: {key.usageCount}</span>
                      {key.lastUsed && (
                        <span>Último uso: {new Date(key.lastUsed).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(key.key)}
                      className="flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copiar
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleKey(key)}
                      className={`flex items-center gap-1 ${
                        key.active ? 'text-orange-600' : 'text-green-600'
                      }`}
                    >
                      {key.active ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                      {key.active ? 'Desativar' : 'Ativar'}
                    </Button>

                    {keys.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedKey(key)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a chave "{selectedKey?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteKey} disabled={loading}>
              {loading ? "Excluindo..." : "Excluir Chave"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
