"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import DynamicFieldComponent, { useDynamicFields, DynamicField } from "@/components/ui/dynamic-field"
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Instagram,
  Linkedin,
  MapPin,
  Plus,
  Trash2,
  GripVertical,
  Save,
  RefreshCw,
  Edit,
  Eye,
  Link as LinkIcon
} from "lucide-react"

interface ContactsTabProps {
  siteConfig: any
  onUpdate: (config: Partial<any>) => void
}

// Campos padrão de contato
const defaultContactFields: DynamicField[] = [
  {
    id: 'email',
    type: 'email',
    label: 'E-mail',
    value: '',
    placeholder: 'contato@codeforge.dev',
    icon: 'Mail',
    required: true,
    order: 1
  },
  {
    id: 'phone',
    type: 'tel',
    label: 'Telefone',
    value: '',
    placeholder: '(11) 99999-9999',
    icon: 'Phone',
    required: true,
    order: 2
  }
]

// Tipos de campos disponíveis
const availableFieldTypes = [
  { type: 'email', label: 'E-mail', icon: 'Mail', placeholder: 'contato@exemplo.com' },
  { type: 'tel', label: 'Telefone', icon: 'Phone', placeholder: '(11) 99999-9999' },
  { type: 'discord', label: 'Discord', icon: 'MessageSquare', placeholder: 'usuario#1234' },
  { type: 'instagram', label: 'Instagram', icon: 'Instagram', placeholder: '@usuario' },
  { type: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', placeholder: 'linkedin.com/in/usuario' },
  { type: 'whatsapp', label: 'WhatsApp', icon: 'MessageSquare', placeholder: 'https://wa.me/5511999999999' },
  { type: 'location', label: 'Localização', icon: 'MapPin', placeholder: 'São Paulo, SP' },
  { type: 'website', label: 'Website', icon: 'LinkIcon', placeholder: 'https://exemplo.com' }
]

export default function ContactsTab({ 
  siteConfig, 
  onUpdate 
}: ContactsTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  
  // Usar o hook de campos dinâmicos
  const {
    fields: contactFields,
    draggedField,
    addField,
    updateField,
    removeField,
    handleDragStart,
    handleDragOver,
    handleDrop,
    resetFields
  } = useDynamicFields([])

  // Inicializar campos de contato
  useEffect(() => {
    if (siteConfig.contactFields) {
      // Resetar campos com os dados do siteConfig
      const fieldsWithValues = siteConfig.contactFields.map((field: DynamicField) => ({
        ...field,
        value: siteConfig[field.id] || field.value
      }))
      resetFields(fieldsWithValues)
    } else {
      // Usar campos padrão se não existirem
      const defaultFields = defaultContactFields.map(field => ({
        ...field,
        value: siteConfig[field.id] || ''
      }))
      resetFields(defaultFields)
    }
  }, [siteConfig, resetFields])

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Mail,
      Phone,
      MessageSquare,
      Instagram,
      Linkedin,
      MapPin,
      LinkIcon
    }
    return iconMap[iconName] || Mail
  }

  const addContactField = () => {
    addField({
      type: 'email',
      label: 'Novo Campo',
      value: '',
      placeholder: 'Digite o valor',
      icon: 'Mail',
      required: false
    })
  }

  const handleSave = () => {
    // Converter campos para formato compatível com siteConfig
    const contactData: any = {}
    contactFields.forEach(field => {
      contactData[field.id] = field.value
    })

    // Salvar campos de contato e configuração
    onUpdate({
      ...contactData,
      contactFields: contactFields
    })
    
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restaurar campos originais
    if (siteConfig.contactFields) {
      const fieldsWithValues = siteConfig.contactFields.map((field: DynamicField) => ({
        ...field,
        value: siteConfig[field.id] || field.value
      }))
      resetFields(fieldsWithValues)
    } else {
      const defaultFields = defaultContactFields.map(field => ({
        ...field,
        value: siteConfig[field.id] || ''
      }))
      resetFields(defaultFields)
    }
    setIsEditing(false)
  }

  const handleResetContacts = () => {
    if (confirm("⚠️ Tem certeza que deseja redefinir os campos de contato para os valores padrão?\n\nEsta ação irá:\n• Restaurar apenas e-mail e telefone\n• Remover todos os campos adicionais\n• Manter outras configurações intactas")) {
      const defaultFields = defaultContactFields.map(field => ({
        ...field,
        value: siteConfig[field.id] || ''
      }))
      resetFields(defaultFields)
      
      // Salvar apenas os campos padrão
      const contactData: any = {}
      defaultFields.forEach(field => {
        contactData[field.id] = field.value
      })
      
      onUpdate({
        ...contactData,
        contactFields: defaultFields
      })
      
      alert("✅ Campos de contato redefinidos com sucesso!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Gerenciamento de Contatos
              </CardTitle>
              <CardDescription>
                Gerencie os campos de contato disponíveis no site
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Campos de Contato */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Campos de Contato</CardTitle>
              <CardDescription>
                Arraste e solte para reorganizar a ordem dos campos
              </CardDescription>
            </div>
            {isEditing && (
              <Button onClick={addContactField} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Campo
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contactFields.map((field) => (
              <DynamicFieldComponent
                key={field.id}
                field={field}
                isEditing={isEditing}
                onUpdate={updateField}
                onRemove={removeField}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                draggedField={draggedField}
                availableTypes={availableFieldTypes}
                showTypeSelector={true}
              />
            ))}

            {contactFields.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum campo de contato configurado</p>
                {isEditing && (
                  <Button onClick={addContactField} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Campo
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Ações
          </CardTitle>
          <CardDescription>
            Ações específicas para campos de contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleResetContacts}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Redefinir Contatos
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar no Site
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview dos Contatos
          </CardTitle>
          <CardDescription>
            Como os contatos aparecem para os visitantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            {contactFields.length > 0 ? (
              contactFields.map(field => {
                const IconComponent = getIconComponent(field.icon || 'MessageSquare')
                return (
                  <div key={field.id} className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium text-sm">{field.label}</div>
                      <div className="text-gray-600">
                        {field.value || (
                          <span className="text-gray-400 italic">Não preenchido</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center text-gray-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>Nenhum contato configurado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
