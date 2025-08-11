"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useOrders } from "@/hooks/useFirebaseData"

interface ContactFormProps {
  serviceType: string
  serviceName: string
  serviceColor: string
  onSubmit: (data: any) => Promise<void>
}

export default function ContactForm({ serviceType, serviceName, serviceColor, onSubmit }: ContactFormProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addOrder } = useOrders()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    discord: "",
    instagram: "",
    description: "",
    budget: "",
    deadline: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || (!formData.phone && !formData.discord && !formData.instagram)) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome e pelo menos uma forma de contato.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Salvar pedido no Firebase
      await addOrder({
        customerName: formData.name,
        customerEmail: formData.instagram || '', // Usando Instagram como email temporário
        customerPhone: formData.phone || formData.discord || '',
        projectType: serviceType as 'bot' | 'site' | 'design' | 'service',
        category: serviceName,
        description: formData.description,
        budget: formData.budget || 'Não informado',
        timeline: formData.deadline || 'Não informado',
        status: 'pending',
        assignedTo: '',
        priority: 'medium',
        notes: ''
      })

      // Chamar função original de onSubmit se existir
      if (onSubmit) {
        await onSubmit({
          ...formData,
          serviceType,
          serviceName,
        })
      }
      
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const isContactValid = formData.phone || formData.discord || formData.instagram

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Solicitar {serviceName}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Preencha os dados abaixo e entraremos em contato em até 30 minutos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Formas de Contato</h4>
              <p className="text-sm text-blue-800 mb-4">
                Preencha pelo menos uma opção para entrarmos em contato
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">WhatsApp/Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    placeholder="seu_usuario#1234"
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@seu_usuario"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descreva o que você precisa</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explique detalhadamente o que você precisa..."
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Orçamento estimado (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Ex: 100"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="deadline">Prazo desejado</Label>
                <Input
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder="Ex: 1 semana"
                />
              </div>
            </div>

            {!isContactValid && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800">
                  ⚠️ Preencha pelo menos uma forma de contato para continuar
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !formData.name || !isContactValid}
              className="w-full text-white"
              style={{ backgroundColor: serviceColor }}
            >
              {loading ? "Enviando..." : `Solicitar ${serviceName}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Solicitação Enviada! 🚀
            </h3>
            
            <p className="text-gray-600 mb-4">
              Sua solicitação foi salva com sucesso! Em <strong>até 30 minutos</strong> entraremos em contato com você via WhatsApp ou Discord.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Quer entrar no nosso Discord?</h4>
              <p className="text-sm text-blue-800 mb-3">
                Junte-se à nossa comunidade para acompanhar o desenvolvimento e receber atualizações em tempo real!
              </p>
              <Button
                onClick={() => window.open('https://discord.gg/jp2BzA4H', '_blank')}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                Entrar no Discord
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
              >
                Fechar
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
