"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Globe, 
  MessageSquare, 
  Phone, 
  Mail, 
  Instagram,
  Link as LinkIcon,
  Save,
  RefreshCw,
  Edit,
  Settings,
  Download,
  Eye
} from "lucide-react"
import { SiteConfig } from "@/lib/firebase-data-service"

interface SiteConfigTabProps {
  siteConfig: SiteConfig
  onUpdate: (config: Partial<SiteConfig>) => void
}

export default function SiteConfigTab({ 
  siteConfig, 
  onUpdate
}: SiteConfigTabProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    discordLink: siteConfig.discordLink,
    phone: siteConfig.phone,
    email: siteConfig.email,
    instagram: siteConfig.instagram,
    whatsapp: siteConfig.whatsapp
  })

  const handleSave = () => {
    console.log('💾 SiteConfigTab: Salvando mudanças...', {
      discordLink: formData.discordLink,
      phone: formData.phone,
      email: formData.email,
      instagram: formData.instagram,
      whatsapp: formData.whatsapp
    })
    onUpdate({
      discordLink: formData.discordLink,
      phone: formData.phone,
      email: formData.email,
      instagram: formData.instagram,
      whatsapp: formData.whatsapp
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      discordLink: siteConfig.discordLink,
      phone: siteConfig.phone,
      email: siteConfig.email,
      instagram: siteConfig.instagram,
      whatsapp: siteConfig.whatsapp
    })
    setIsEditing(false)
  }

  const handleReset = () => {
    if (confirm("Tem certeza que deseja redefinir todas as configurações para os valores padrão?")) {
      // Aqui você pode implementar a lógica para resetar para valores padrão
      alert("Funcionalidade de reset será implementada em breve")
    }
  }

  return (
    <div className="space-y-6">
      {/* Configurações Gerais */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Configurações do Site
              </CardTitle>
              <CardDescription>
                Gerencie as configurações gerais do site
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
        <CardContent className="space-y-6">
          {/* Link do Discord */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Link do Discord
            </Label>
            {isEditing ? (
              <Input
                value={formData.discordLink}
                onChange={(e) => setFormData({...formData, discordLink: e.target.value})}
                placeholder="https://discord.gg/..."
              />
            ) : (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <LinkIcon className="w-4 h-4 text-gray-500" />
                <a 
                  href={siteConfig.discordLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {siteConfig.discordLink}
                </a>
              </div>
            )}
          </div>

          {/* Informações de Contato */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Informações de Contato</Label>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({
                      ...formData, 
                      phone: e.target.value
                    })}
                    placeholder="(11) 99999-9999"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    {siteConfig.phone}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({
                      ...formData, 
                      email: e.target.value
                    })}
                    placeholder="contato@codeforge.dev"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    {siteConfig.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.instagram}
                    onChange={(e) => setFormData({
                      ...formData, 
                      instagram: e.target.value
                    })}
                    placeholder="@codeforge.dev"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    {siteConfig.instagram}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({
                      ...formData, 
                      whatsapp: e.target.value
                    })}
                    placeholder="https://wa.me/5511966485110"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-md">
                    {siteConfig.whatsapp}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações Avançadas
          </CardTitle>
          <CardDescription>
            Configurações avançadas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Modo de Manutenção</Label>
              <p className="text-sm text-gray-600">
                Ativa o modo de manutenção do site
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Notificações de Pedidos</Label>
              <p className="text-sm text-gray-600">
                Receber notificações de novos pedidos
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Backup Automático</Label>
              <p className="text-sm text-gray-600">
                Fazer backup automático das configurações
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Ações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Ações do Sistema
          </CardTitle>
          <CardDescription>
            Ações administrativas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Redefinir Configurações
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview das Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview das Configurações
          </CardTitle>
          <CardDescription>
            Como as configurações aparecem para os clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span className="text-sm">
                <strong>Discord:</strong> {siteConfig.discordLink}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span className="text-sm">
                <strong>Telefone:</strong> {siteConfig.phone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500" />
              <span className="text-sm">
                <strong>Email:</strong> {siteConfig.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="text-sm">
                <strong>Instagram:</strong> {siteConfig.instagram}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
