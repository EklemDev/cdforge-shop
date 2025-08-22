"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  MessageCircle, 
  Mail, 
  Phone, 
  Instagram,
  Bot,
  Eye,
  EyeOff
} from "lucide-react"
import { useContacts } from "@/hooks/useContacts"
import { Contact } from "@/lib/firebase-data-service"
import { toast } from "@/hooks/use-toast"

// Mapa de ícones para cada tipo de contato
const contactIcons = {
  discord: Bot,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
  phone: Phone,
} as const

// Configurações padrão para cada tipo de contato
const contactDefaults = {
  discord: {
    label: "Discord",
    icon: "discord",
    placeholder: "https://discord.gg/seu-servidor"
  },
  whatsapp: {
    label: "WhatsApp",
    icon: "whatsapp",
    placeholder: "https://wa.me/5511999999999"
  },
  email: {
    label: "E-mail",
    icon: "email",
    placeholder: "contato@codeforge.com"
  },
  instagram: {
    label: "Instagram",
    icon: "instagram",
    placeholder: "https://instagram.com/codeforge"
  },
  phone: {
    label: "Telefone",
    icon: "phone",
    placeholder: "+55 (11) 99999-9999"
  }
}

export default function ContactsManager() {
  const { contacts, loading, error, addContact, updateContact, deleteContact, toggleContactStatus } = useContacts()
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState({
    type: 'discord' as Contact['type'],
    label: '',
    value: '',
    active: true,
    order: 0
  })

  const handleAddContact = async () => {
    try {
      const defaultConfig = contactDefaults[newContact.type]
      const contactData = {
        ...newContact,
        label: newContact.label || defaultConfig.label,
        icon: defaultConfig.icon,
        order: contacts.length
      }
      
      await addContact(contactData)
      setIsAddingContact(false)
      setNewContact({ type: 'discord', label: '', value: '', active: true, order: 0 })
      toast({
        title: "Contato adicionado",
        description: "O contato foi adicionado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar contato",
        variant: "destructive",
      })
    }
  }

  const handleUpdateContact = async () => {
    if (!editingContact) return
    
    try {
      await updateContact(editingContact.id, {
        label: editingContact.label,
        value: editingContact.value,
        active: editingContact.active,
        order: editingContact.order
      })
      setEditingContact(null)
      toast({
        title: "Contato atualizado",
        description: "O contato foi atualizado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar contato",
        variant: "destructive",
      })
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Tem certeza que deseja deletar este contato?')) return
    
    try {
      await deleteContact(contactId)
      toast({
        title: "Contato deletado",
        description: "O contato foi deletado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao deletar contato",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (contactId: string) => {
    try {
      await toggleContactStatus(contactId)
      toast({
        title: "Status alterado",
        description: "O status do contato foi alterado!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando contatos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Erro ao carregar contatos: {error}</p>
        <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Contatos</h2>
          <p className="text-gray-600">Configure os contatos que aparecem no site</p>
        </div>
        <Button
          onClick={() => setIsAddingContact(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Contato
        </Button>
      </div>

      {/* Adicionar Novo Contato */}
      {isAddingContact && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Adicionar Novo Contato</CardTitle>
            <CardDescription>Configure um novo contato para aparecer no site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-type">Tipo de Contato</Label>
                <Select
                  value={newContact.type}
                  onValueChange={(value: Contact['type']) => {
                    setNewContact(prev => ({
                      ...prev,
                      type: value,
                      label: contactDefaults[value].label
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discord">Discord</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="phone">Telefone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="contact-label">Rótulo</Label>
                <Input
                  id="contact-label"
                  value={newContact.label}
                  onChange={(e) => setNewContact(prev => ({ ...prev, label: e.target.value }))}
                  placeholder={contactDefaults[newContact.type].label}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="contact-value">Valor/Link</Label>
              <Input
                id="contact-value"
                value={newContact.value}
                onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                placeholder={contactDefaults[newContact.type].placeholder}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="contact-active"
                checked={newContact.active}
                onCheckedChange={(checked) => setNewContact(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="contact-active">Ativo (aparece no site)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddContact} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingContact(false)
                  setNewContact({ type: 'discord', label: '', value: '', active: true, order: 0 })
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Contatos */}
      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 mb-4">Nenhum contato configurado</p>
              <Button onClick={() => setIsAddingContact(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Contato
              </Button>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => {
            const IconComponent = contactIcons[contact.type]
            const isEditing = editingContact?.id === contact.id
            
            return (
              <Card key={contact.id} className={`${!contact.active ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Rótulo</Label>
                          <Input
                            value={editingContact.label}
                            onChange={(e) => setEditingContact(prev => prev ? { ...prev, label: e.target.value } : null)}
                          />
                        </div>
                        <div>
                          <Label>Valor/Link</Label>
                          <Input
                            value={editingContact.value}
                            onChange={(e) => setEditingContact(prev => prev ? { ...prev, value: e.target.value } : null)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingContact.active}
                          onCheckedChange={(checked) => setEditingContact(prev => prev ? { ...prev, active: checked } : null)}
                        />
                        <Label>Ativo</Label>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleUpdateContact} className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          Salvar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingContact(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          contact.type === 'discord' ? 'bg-blue-100' :
                          contact.type === 'whatsapp' ? 'bg-green-100' :
                          contact.type === 'email' ? 'bg-red-100' :
                          contact.type === 'instagram' ? 'bg-pink-100' :
                          'bg-gray-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            contact.type === 'discord' ? 'text-blue-600' :
                            contact.type === 'whatsapp' ? 'text-green-600' :
                            contact.type === 'email' ? 'text-red-600' :
                            contact.type === 'instagram' ? 'text-pink-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.label}</h3>
                          <p className="text-sm text-gray-600">{contact.value}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              contact.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {contact.active ? 'Ativo' : 'Inativo'}
                            </span>
                            <span className="text-xs text-gray-500 capitalize">{contact.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(contact.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {contact.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingContact(contact)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Informações */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>Como funciona:</strong></p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Contatos ativos aparecem automaticamente no site</li>
              <li>Contatos inativos ficam ocultos do público</li>
              <li>As alterações são aplicadas em tempo real</li>
              <li>Use o botão de olho para ativar/desativar rapidamente</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}




