"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, Clock, Check, Eye } from "lucide-react"
import { useOrders } from "@/hooks/useFirebaseData"
import { toast } from "@/hooks/use-toast"
import BotDemo from "@/components/bot-demo"

const steps = [
  { id: 1, title: "Tipo do Bot", description: "Escolha a categoria" },
  { id: 2, title: "Plataforma", description: "Onde funcionará" },
  { id: 3, title: "Personalização", description: "Funcionalidades" },
  { id: 4, title: "Seus Dados", description: "Informações de contato" },
  { id: 5, title: "Confirmação", description: "Revisar e enviar" },
]

const botTypes = [
  { id: "vendas", name: "Bot de Vendas", description: "Automação de vendas e pagamentos" },
  { id: "entretenimento", name: "Bot de Entretenimento", description: "Jogos, música e diversão" },
  { id: "automacao", name: "Bot de Automação", description: "Tarefas automáticas" },
  { id: "suporte", name: "Bot de Suporte", description: "Atendimento ao cliente" },
  { id: "moderacao", name: "Bot de Moderação", description: "Gerenciamento de comunidades" },
  { id: "comunidade", name: "Bot de Comunidade", description: "Engajamento de usuários" },
  { id: "educacional", name: "Bot Educacional", description: "Aprendizado e treinamento" },
]

const platforms = [
  { id: "discord", name: "Discord", icon: "/discord.png", color: "#5865F2" },
  { id: "whatsapp", name: "WhatsApp", icon: "/whatsapp.png", color: "#25D366" },
  { id: "instagram", name: "Instagram", icon: "/instagram.png", color: "#E4405F" },
  { id: "web", name: "Web Scraping", icon: null, color: "#00BCD4" },
]

const commonFeatures = [
  "Sistema de comandos personalizados",
  "Banco de dados integrado",
  "Sistema de logs",
  "Sistema de gestão",
  "Backup automático",
  "Suporte técnico",
  "Atualizações gratuitas por 3 meses",
  "Documentação completa",
]

export default function PersonalizarBotPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [showDemo, setShowDemo] = useState(false)
  const { addOrder, loading: firebaseLoading } = useOrders()
  const [formData, setFormData] = useState({
    types: [] as string[], // Mudando para array para permitir múltipla seleção
    platform: "",
    name: "",
    phone: "",
    discord: "",
    instagram: "",
    description: "",
    features: [] as string[],
    budget: "",
    deadline: "",
  })

  const [hasSetInitialValues, setHasSetInitialValues] = useState(false)

  useEffect(() => {
    if (!hasSetInitialValues) {
      const type = searchParams.get("type")
      const platform = searchParams.get("platform")

      if (type || platform) {
        setFormData((prev) => ({
          ...prev,
          ...(type && { types: [type] }), // Convertendo para array
          ...(platform && { platform }),
        }))
      }
      setHasSetInitialValues(true)
    }
  }, [hasSetInitialValues, searchParams])

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleShowDemo = () => {
    setShowDemo(true)
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleTypeToggle = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      types: prev.types.includes(typeId)
        ? prev.types.filter((t) => t !== typeId)
        : [...prev.types, typeId],
    }))
  }

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async () => {
    try {
      // Salvar no Firebase usando o sistema novo
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.instagram || formData.discord || '', // Usando Instagram/Discord como email
        customerPhone: formData.phone || formData.discord || formData.instagram || '',
        projectType: 'bot' as const,
        category: formData.types.join(', ') || 'Bot Personalizado',
        description: `Plataforma: ${formData.platform}\nTipos: ${formData.types.join(', ')}\nFuncionalidades: ${formData.features.join(', ')}\n\n${formData.description}`,
        budget: formData.budget || 'Não informado',
        timeline: formData.deadline || 'Não informado',
        status: 'pending' as const,
        assignedTo: '',
        priority: 'medium' as const,
        notes: `Detalhes do bot:\n- Tipos: ${formData.types.join(', ')}\n- Plataforma: ${formData.platform}\n- Funcionalidades: ${formData.features.join(', ')}`
      }

      const orderId = await addOrder(orderData)
      
      if (orderId) {
        // Mostrar modal de sucesso
        setShowSuccessModal(true)
      } else {
        throw new Error('Falha ao criar pedido')
      }
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error)
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      })
    }
  }

  const isContactValid = formData.phone || formData.discord || formData.instagram

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-start mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Personalizar Bot</h1>
              <p className="text-xl text-gray-600">Configure seu bot do jeito que você precisa</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 max-w-full overflow-x-auto px-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-shrink-0">
                      <div
                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm font-medium ${
                          currentStep >= step.id ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="ml-2 sm:ml-3">
                        <p
                          className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                            currentStep >= step.id ? "text-cyan-500" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-400 hidden sm:block whitespace-nowrap">{step.description}</p>
                      </div>
                      {index < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2 sm:mx-4 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Content */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 sm:p-8">
                {/* Step 1: Bot Type */}
                {currentStep === 1 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Que tipos de bot você precisa?</CardTitle>
                      <CardDescription className="text-center">
                        Selecione uma ou mais categorias que melhor se adequam ao seu projeto
                      </CardDescription>
                    </CardHeader>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {botTypes.map((type) => (
                        <Card
                          key={type.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.types.includes(type.id) ? "ring-2 ring-cyan-500 bg-cyan-50" : "hover:shadow-md"
                          }`}
                          onClick={() => handleTypeToggle(type.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{type.name}</h3>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 ml-2 flex-shrink-0 ${
                                formData.types.includes(type.id) 
                                  ? "bg-cyan-500 border-cyan-500" 
                                  : "border-gray-300"
                              }`}>
                                {formData.types.includes(type.id) && (
                                  <Check className="w-3 h-3 text-white mx-auto mt-0.5" />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {formData.types.length > 0 && (
                      <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                        <p className="text-sm text-cyan-800">
                          <strong>Tipos selecionados:</strong> {formData.types.length} categoria(s)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Platform */}
                {currentStep === 2 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Escolha a plataforma</CardTitle>
                      <CardDescription className="text-center">Onde seu bot irá funcionar?</CardDescription>
                    </CardHeader>

                    <div className="grid md:grid-cols-2 gap-6">
                      {platforms.map((platform) => (
                        <Card
                          key={platform.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.platform === platform.id ? "ring-2 ring-cyan-500 bg-cyan-50" : "hover:shadow-md"
                          }`}
                          onClick={() => setFormData({ ...formData, platform: platform.id })}
                        >
                          <CardContent className="p-6 text-center">
                            <div
                              className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                              style={{ backgroundColor: platform.color + "20" }}
                            >
                              {platform.icon ? (
                                <img
                                  src={platform.icon || "/placeholder.svg"}
                                  alt={`${platform.name} logo`}
                                  className="w-8 h-8 object-contain"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-cyan-500 rounded"></div>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold">{platform.name}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Customization */}
                {currentStep === 3 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Personalize seu bot</CardTitle>
                      <CardDescription className="text-center">
                        Descreva o que você precisa e selecione funcionalidades extras
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="description">Descreva seu bot *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Explique detalhadamente o que seu bot deve fazer, quais comandos ter, como deve funcionar..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label className="text-base font-semibold">Funcionalidades Extras</Label>
                        <p className="text-sm text-gray-600 mb-4">Selecione funcionalidades adicionais para seu bot</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {commonFeatures.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox
                                id={feature}
                                checked={formData.features.includes(feature)}
                                onCheckedChange={() => handleFeatureToggle(feature)}
                              />
                              <Label htmlFor={feature} className="text-sm">
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Orçamento estimado (R$)</Label>
                          <Input
                            id="budget"
                            type="number"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            placeholder="Ex: 200"
                            min="0"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Digite o valor que você tem disponível para investir
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="deadline">Prazo desejado</Label>
                          <Select
                            value={formData.deadline}
                            onValueChange={(value) => setFormData({ ...formData, deadline: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Quando precisa?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgente">Urgente (1-3 dias)</SelectItem>
                              <SelectItem value="1-week">1 semana</SelectItem>
                              <SelectItem value="2-weeks">2 semanas</SelectItem>
                              <SelectItem value="1-month">1 mês</SelectItem>
                              <SelectItem value="flexible">Flexível</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Info */}
                {currentStep === 4 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Seus dados para contato</CardTitle>
                      <CardDescription className="text-center">
                        Preencha pelo menos uma forma de contato para recebermos seu orçamento
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Formas de Contato</h4>
                        <p className="text-sm text-blue-800 mb-4">
                          Preencha pelo menos uma opção. Se colocar o número, Discord e Instagram são opcionais. Se
                          colocar Discord ou Instagram, o número é opcional.
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

                      {!isContactValid && (
                        <div className="bg-red-50 p-4 rounded-lg">
                          <p className="text-sm text-red-800">
                            ⚠️ Preencha pelo menos uma forma de contato para continuar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Confirme sua solicitação</CardTitle>
                      <CardDescription className="text-center">Revise os dados antes de enviar</CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Resumo do Bot</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Tipos:</span>{" "}
                            {formData.types.map(typeId => botTypes.find((t) => t.id === typeId)?.name).join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Plataforma:</span>{" "}
                            {platforms.find((p) => p.id === formData.platform)?.name}
                          </div>
                          <div>
                            <span className="font-medium">Nome:</span> {formData.name}
                          </div>
                          <div>
                            <span className="font-medium">Contato:</span>
                            {formData.phone && ` ${formData.phone}`}
                            {formData.discord && ` ${formData.discord}`}
                            {formData.instagram && ` ${formData.instagram}`}
                          </div>
                          {formData.budget && (
                            <div>
                              <span className="font-medium">Orçamento:</span> R$ {formData.budget}
                            </div>
                          )}
                          {formData.deadline && (
                            <div>
                              <span className="font-medium">Prazo:</span> {formData.deadline}
                            </div>
                          )}
                        </div>

                        {formData.description && (
                          <div className="mt-4">
                            <span className="font-medium">Descrição:</span>
                            <p className="text-gray-600 mt-1">{formData.description}</p>
                          </div>
                        )}

                        {formData.features.length > 0 && (
                          <div className="mt-4">
                            <span className="font-medium">Funcionalidades Extras:</span>
                            <ul className="text-gray-600 mt-1 text-sm">
                              {formData.features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Próximos Passos</h4>
                        </div>
                        <p className="text-green-800 text-sm">
                          Após enviar sua solicitação, entraremos em contato em <strong>até 30 minutos</strong> via
                          WhatsApp ou Discord com o orçamento detalhado do seu bot personalizado.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-transparent cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  {currentStep < 5 ? (
                    <Button
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && formData.types.length === 0) ||
                        (currentStep === 2 && !formData.platform) ||
                        (currentStep === 3 && !formData.description) ||
                        (currentStep === 4 && (!formData.name || !isContactValid))
                      }
                      className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600"
                    >
                      Próximo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleShowDemo}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar Gerais
                      </Button>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={firebaseLoading}
                        className="bg-green-500 hover:bg-green-600 text-white px-8"
                      >
                        {firebaseLoading ? "Salvando..." : "Enviar Solicitação"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Demo do Bot */}
      <BotDemo 
        formData={formData}
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
      />

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
                className="w-full cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
