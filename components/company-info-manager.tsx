"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, 
  Clock, 
  Building2,
  Save, 
  X, 
  Edit,
  Globe,
  Phone,
  Mail
} from "lucide-react"
import { useSiteConfig } from "@/hooks/useFirebaseData"
import { toast } from "@/hooks/use-toast"

export default function CompanyInfoManager() {
  const { config, loading, error, updateConfig } = useSiteConfig()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    address: '',
    city: '',
    state: '',
    country: '',
    businessHours: '',
    phone: '',
    email: '',
    website: ''
  })

  // Carregar dados quando config mudar
  useEffect(() => {
    if (config) {
      setFormData({
        companyName: config.companyName || '',
        companyDescription: config.companyDescription || '',
        address: config.address || '',
        city: config.city || '',
        state: config.state || '',
        country: config.country || '',
        businessHours: config.businessHours || '',
        phone: config.phone || '',
        email: config.email || '',
        website: config.siteTitle || ''
      })
    }
  }, [config])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await updateConfig({
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        businessHours: formData.businessHours,
        phone: formData.phone,
        email: formData.email,
        siteTitle: formData.website
      })
      
      if (success) {
        setIsEditing(false)
        toast({
          title: "Informações atualizadas",
          description: "As informações da empresa foram atualizadas com sucesso!",
        })
      } else {
        toast({
          title: "Erro",
          description: "Erro ao atualizar informações da empresa",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações da empresa",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Restaurar dados originais
    if (config) {
      setFormData({
        companyName: config.companyName || '',
        companyDescription: config.companyDescription || '',
        address: config.address || '',
        city: config.city || '',
        state: config.state || '',
        country: config.country || '',
        businessHours: config.businessHours || '',
        phone: config.phone || '',
        email: config.email || '',
        website: config.siteTitle || ''
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando informações...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Erro ao carregar informações: {error}</p>
        <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Informações da Empresa</h2>
          <p className="text-gray-600">Gerencie as informações que aparecem no site</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Informações
          </Button>
        )}
      </div>

      {/* Formulário de Edição */}
      {isEditing ? (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Editar Informações da Empresa</CardTitle>
            <CardDescription>Configure as informações que aparecem no site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input
                  id="company-name"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="CodeForge"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://codeforge.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company-description">Descrição da Empresa</Label>
              <Textarea
                id="company-description"
                value={formData.companyDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, companyDescription: e.target.value }))}
                placeholder="Transformando ideias em soluções digitais inovadoras."
                rows={3}
              />
            </div>

            {/* Localização */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Localização
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Rua das Flores, 123"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="São Paulo"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="SP"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="Brasil"
                />
              </div>
            </div>

            {/* Horário de Atendimento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Horário de Atendimento
              </h3>
              <div>
                <Label htmlFor="business-hours">Horários (uma linha por período)</Label>
                <Textarea
                  id="business-hours"
                  value={formData.businessHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessHours: e.target.value }))}
                  placeholder="Segunda a Sexta: 9h às 18h&#10;Sábado: 9h às 14h"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use quebras de linha para separar diferentes horários
                </p>
              </div>
            </div>

            {/* Contatos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Contatos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@codeforge.com"
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSave} 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Visualização das Informações */
        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Nome da Empresa</h4>
                <p className="text-gray-600">{config?.companyName || 'Não configurado'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Descrição</h4>
                <p className="text-gray-600">{config?.companyDescription || 'Não configurado'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Website</h4>
                <p className="text-gray-600">{config?.siteTitle || 'Não configurado'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Endereço</h4>
                <p className="text-gray-600">
                  {config?.address ? (
                    <>
                      {config.address}
                      {config.city && `, ${config.city}`}
                      {config.state && `, ${config.state}`}
                      {config.country && `, ${config.country}`}
                    </>
                  ) : (
                    'Não configurado'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Horário de Atendimento */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Horário de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="font-semibold text-gray-900">Horários</h4>
                {config?.businessHours ? (
                  <div className="text-gray-600 whitespace-pre-line">
                    {config.businessHours}
                  </div>
                ) : (
                  <p className="text-gray-600">Não configurado</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contatos */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Contatos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Telefone</h4>
                <p className="text-gray-600">{config?.phone || 'Não configurado'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">E-mail</h4>
                <p className="text-gray-600">{config?.email || 'Não configurado'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Informações */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>Como funciona:</strong></p>
            <ul className="space-y-1 list-disc list-inside">
              <li>As informações são exibidas na página de contato do site</li>
              <li>Alterações são aplicadas em tempo real</li>
              <li>Use quebras de linha no horário para separar períodos</li>
              <li>Campos vazios não aparecem no site</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
