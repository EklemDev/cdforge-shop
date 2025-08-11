"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Globe, ArrowRight, ArrowLeft, Check, Eye } from "lucide-react"
import { useBotRequests, useSiteRequests } from "@/hooks/useFirebase"
import { toast } from "@/hooks/use-toast"
import GeneralDemo from "@/components/general-demo"

const steps = [
  { id: 1, title: "Escolher Tipo", description: "Bot ou Site" },
  { id: 2, title: "Escolher Categoria", description: "Área de atuação" },
  { id: 3, title: "Detalhes do Projeto", description: "Informações específicas" },
  { id: 4, title: "Resumo do Pedido", description: "Confirmar solicitação" },
]

const projectTypes = [
  {
    id: "bot",
    title: "Bot",
    description: "Automação inteligente para Discord, WhatsApp, Instagram ou Web",
    icon: Bot,
  },
  {
    id: "site",
    title: "Site",
    description: "Desenvolvimento web profissional para seu negócio",
    icon: Globe,
  },
]

const botCategories = [
  { id: "vendas", name: "Vendas", description: "Automação de vendas e pagamentos" },
  { id: "entretenimento", name: "Entretenimento", description: "Jogos, música e diversão" },
  { id: "automacao", name: "Automação", description: "Tarefas automáticas e produtividade" },
  { id: "suporte", name: "Suporte", description: "Atendimento ao cliente automatizado" },
  { id: "moderacao", name: "Moderação", description: "Gerenciamento de comunidades" },
]

const siteCategories = [
  { id: "ecommerce", name: "E-commerce", description: "Loja virtual completa" },
  { id: "portfolio", name: "Portfolio", description: "Showcase profissional" },
  { id: "landing", name: "Landing Page", description: "Página de conversão" },
  { id: "blog", name: "Blog", description: "Plataforma de conteúdo" },
  { id: "corporativo", name: "Corporativo", description: "Site institucional" },
]

export default function PersonalizarPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const { createBotRequest, loading: botLoading } = useBotRequests()
  const { createSiteRequest, loading: siteLoading } = useSiteRequests()
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    name: "",
    email: "",
    description: "",
    budget: "",
    deadline: "",
    platform: "",
    features: "",
  })

  const handleNext = () => {
    if (currentStep < 4) {
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

  const handleSubmit = async () => {
    try {
      console.log('🚀 Submitting form data:', formData)
      console.log('🔧 Form type:', formData.type)
      if (formData.type === 'bot') {
        const botRequestData = {
          name: formData.name,
          email: formData.email,
          projectType: 'bot' as const,
          projectDetails: {
            types: [formData.category],
            platform: formData.platform,
            description: formData.description,
            features: Array.isArray(formData.features) ? formData.features : [formData.features],
            budget: formData.budget,
            deadline: formData.deadline
          },
          status: 'pending' as const,
          priority: 'medium' as const
        }
        await createBotRequest(botRequestData)
      } else {
        const siteRequestData = {
          name: formData.name,
          email: formData.email,
          projectType: 'site' as const,
          projectDetails: {
            description: formData.description,
            features: Array.isArray(formData.features) ? formData.features : [formData.features],
            budget: formData.budget,
            deadline: formData.deadline
          },
          status: 'pending' as const,
          priority: 'medium' as const
        }
        await createSiteRequest(siteRequestData)
      }
      
      // Mostrar modal de sucesso
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error)
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      })
    }
  }

  const getCurrentCategories = () => {
    return formData.type === "bot" ? botCategories : siteCategories
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Personalizar Projeto</h1>
              <p className="text-xl text-gray-600">Conte-nos sobre seu projeto e criaremos a solução perfeita</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentStep >= step.id ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${currentStep >= step.id ? "text-cyan-500" : "text-gray-500"}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                {/* Step 1: Choose Type */}
                {currentStep === 1 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Escolha o tipo do seu projeto</CardTitle>
                      <CardDescription className="text-center">
                        Selecione se você precisa de um bot ou um site
                      </CardDescription>
                    </CardHeader>

                    <div className="grid md:grid-cols-2 gap-6">
                      {projectTypes.map((type) => (
                        <Card
                          key={type.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.type === type.id ? "ring-2 ring-cyan-500 bg-cyan-50" : "hover:shadow-md"
                          }`}
                          onClick={() => setFormData({ ...formData, type: type.id, category: "" })}
                        >
                          <CardContent className="p-6 text-center">
                            <type.icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                            <p className="text-gray-600">{type.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Choose Category */}
                {currentStep === 2 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Escolha a categoria do seu {formData.type}</CardTitle>
                      <CardDescription className="text-center">
                        Selecione a área que melhor se adequa ao seu projeto
                      </CardDescription>
                    </CardHeader>

                    <div className="grid md:grid-cols-2 gap-4">
                      {getCurrentCategories().map((category) => (
                        <Card
                          key={category.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.category === category.id ? "ring-2 ring-cyan-500 bg-cyan-50" : "hover:shadow-md"
                          }`}
                          onClick={() => setFormData({ ...formData, category: category.id })}
                        >
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Project Details */}
                {currentStep === 3 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Detalhes do Projeto</CardTitle>
                      <CardDescription className="text-center">
                        Forneça informações específicas sobre seu projeto
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Descrição do projeto *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Descreva detalhadamente o que você precisa..."
                          rows={4}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget">Orçamento estimado</Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) => setFormData({ ...formData, budget: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma faixa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                              <SelectItem value="200-500">R$ 200 - R$ 500</SelectItem>
                              <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                              <SelectItem value="1000+">Acima de R$ 1.000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="deadline">Prazo desejado</Label>
                          <Select
                            value={formData.deadline}
                            onValueChange={(value) => setFormData({ ...formData, deadline: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o prazo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-week">1 semana</SelectItem>
                              <SelectItem value="2-weeks">2 semanas</SelectItem>
                              <SelectItem value="1-month">1 mês</SelectItem>
                              <SelectItem value="2-months">2 meses</SelectItem>
                              <SelectItem value="flexible">Flexível</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.type === "bot" && (
                        <div>
                          <Label htmlFor="platform">Plataforma do bot</Label>
                          <Select
                            value={formData.platform}
                            onValueChange={(value) => setFormData({ ...formData, platform: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a plataforma" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="discord">
                                <div className="flex items-center gap-2">
                                  <img src="/discord.png" alt="Discord" className="w-4 h-4" />
                                  Discord
                                </div>
                              </SelectItem>
                              <SelectItem value="whatsapp">
                                <div className="flex items-center gap-2">
                                  <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4" />
                                  WhatsApp
                                </div>
                              </SelectItem>
                              <SelectItem value="instagram">
                                <div className="flex items-center gap-2">
                                  <img src="/instagram.png" alt="Instagram" className="w-4 h-4" />
                                  Instagram
                                </div>
                              </SelectItem>
                              <SelectItem value="web">
                                <div className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-cyan-500" />
                                  Web Scraping
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="features">Funcionalidades específicas</Label>
                        <Textarea
                          id="features"
                          value={formData.features}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          placeholder="Liste funcionalidades específicas que você gostaria..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Summary */}
                {currentStep === 4 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Resumo do Pedido</CardTitle>
                      <CardDescription className="text-center">
                        Confirme os detalhes do seu projeto antes de enviar
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Detalhes do Projeto</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Tipo:</span> {formData.type === "bot" ? "Bot" : "Site"}
                          </div>
                          <div>
                            <span className="font-medium">Categoria:</span>{" "}
                            {getCurrentCategories().find((cat) => cat.id === formData.category)?.name}
                          </div>
                          <div>
                            <span className="font-medium">Nome:</span> {formData.name}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {formData.email}
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
                          {formData.platform && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Plataforma:</span> {formData.platform}
                            </div>
                          )}
                        </div>

                        {formData.description && (
                          <div className="mt-4">
                            <span className="font-medium">Descrição:</span>
                            <p className="text-gray-600 mt-1">{formData.description}</p>
                          </div>
                        )}

                        {formData.features && (
                          <div className="mt-4">
                            <span className="font-medium">Funcionalidades:</span>
                            <p className="text-gray-600 mt-1">{formData.features}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-cyan-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-cyan-900 mb-2">Próximos Passos</h4>
                        <p className="text-cyan-800 text-sm">
                          Ao enviar sua solicitação, você será redirecionado para nosso Discord onde poderá conversar
                          diretamente com nossa equipe para finalizar os detalhes e iniciar o desenvolvimento.
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
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && !formData.type) ||
                        (currentStep === 2 && !formData.category) ||
                        (currentStep === 3 && (!formData.name || !formData.email || !formData.description))
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
                      <Button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
                        Enviar Solicitação
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

      {/* Demo do Projeto */}
      <GeneralDemo 
        formData={{
          projectType: formData.type as "bot" | "site",
          category: formData.category,
          description: formData.description,
          platform: formData.platform,
          features: formData.features
        }}
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
      />
    </div>
  )
}
