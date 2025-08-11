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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, Briefcase, Star } from "lucide-react"

const steps = [
  { id: 1, title: "Área de Interesse", description: "Escolha sua especialidade" },
  { id: 2, title: "Seus Dados", description: "Informações pessoais" },
  { id: 3, title: "Experiência", description: "Suas habilidades" },
  { id: 4, title: "Confirmação", description: "Revisar candidatura" },
]

const areas = [
  {
    id: "marketing",
    name: "Marketing Digital",
    description: "Gestão de redes sociais, campanhas e estratégias de marketing",
    icon: "📱",
    skills: ["Redes sociais", "Google Ads", "SEO", "Content Marketing", "Analytics"],
  },
  {
    id: "atendente",
    name: "Atendente/Suporte",
    description: "Atendimento ao cliente via Discord, WhatsApp e outras plataformas",
    icon: "💬",
    skills: ["Comunicação", "Paciência", "Resolução de problemas", "Multitarefas"],
  },
  {
    id: "desenvolvedor",
    name: "Desenvolvedor",
    description: "Desenvolvimento de bots, sites e sistemas automatizados",
    icon: "💻",
    skills: ["JavaScript", "Python", "Node.js", "React", "APIs", "Banco de dados"],
  },
  {
    id: "designer",
    name: "Designer",
    description: "Criação de interfaces, logos e materiais visuais",
    icon: "🎨",
    skills: ["Figma", "Photoshop", "UI/UX", "Branding", "Design responsivo"],
  },
  {
    id: "vendas",
    name: "Vendas",
    description: "Prospecção de clientes e fechamento de negócios",
    icon: "💼",
    skills: ["Negociação", "CRM", "Prospecção", "Relacionamento", "Metas"],
  },
  {
    id: "gerente",
    name: "Gerente de Projetos",
    description: "Coordenação de equipes e gestão de projetos",
    icon: "📊",
    skills: ["Liderança", "Planejamento", "Scrum/Agile", "Comunicação", "Organização"],
  },
]

const experienceLevels = [
  { id: "iniciante", name: "Iniciante", description: "Pouca ou nenhuma experiência" },
  { id: "intermediario", name: "Intermediário", description: "1-3 anos de experiência" },
  { id: "avancado", name: "Avançado", description: "3-5 anos de experiência" },
  { id: "especialista", name: "Especialista", description: "Mais de 5 anos de experiência" },
]

export default function SejaAgentePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    area: "",
    name: "",
    email: "",
    phone: "",
    discord: "",
    instagram: "",
    linkedin: "",
    experience: "",
    skills: [] as string[],
    portfolio: "",
    motivation: "",
    availability: "",
    salary: "",
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

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleSubmit = () => {
    const selectedArea = areas.find((a) => a.id === formData.area)
    const selectedExperience = experienceLevels.find((e) => e.id === formData.experience)

    const message = `🚀 CANDIDATURA PARA AGENTE CODEFORGE

👤 Dados Pessoais:
• Nome: ${formData.name}
• Email: ${formData.email}
• Telefone: ${formData.phone}
${formData.discord ? `• Discord: ${formData.discord}` : ""}
${formData.instagram ? `• Instagram: ${formData.instagram}` : ""}
${formData.linkedin ? `• LinkedIn: ${formData.linkedin}` : ""}

💼 Área de Interesse:
• ${selectedArea?.name} - ${selectedArea?.description}

📈 Experiência:
• Nível: ${selectedExperience?.name}
• Habilidades: ${formData.skills.join(", ")}
${formData.portfolio ? `• Portfolio: ${formData.portfolio}` : ""}

💰 Expectativa Salarial: ${formData.salary}
⏰ Disponibilidade: ${formData.availability}

📝 Motivação:
${formData.motivation}

🎯 Candidatura enviada via site CodeForge!`

    window.open(`https://discord.gg/jp2BzA4H`, "_blank")
  }

  const selectedArea = areas.find((a) => a.id === formData.area)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Seja um dos nossos agentes!</h1>
              <p className="text-xl text-gray-600">Faça parte da equipe CodeForge e transforme o futuro digital</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12 overflow-x-auto">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm ${
                        currentStep >= step.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-500" : "text-gray-500"}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2 sm:mx-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 sm:p-8">
                {/* Step 1: Area Selection */}
                {currentStep === 1 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Em qual área você quer trabalhar?</CardTitle>
                      <CardDescription className="text-center">
                        Escolha a área que mais combina com seu perfil e experiência
                      </CardDescription>
                    </CardHeader>

                    <div className="grid md:grid-cols-2 gap-4">
                      {areas.map((area) => (
                        <Card
                          key={area.id}
                          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            formData.area === area.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                          }`}
                          onClick={() => setFormData({ ...formData, area: area.id })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{area.icon}</span>
                              <h3 className="font-semibold">{area.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {area.skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                              {area.skills.length > 3 && (
                                <span className="text-xs text-gray-500">+{area.skills.length - 3} mais</span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Data */}
                {currentStep === 2 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Seus dados pessoais</CardTitle>
                      <CardDescription className="text-center">
                        Preencha suas informações para que possamos entrar em contato
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

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone/WhatsApp *</Label>
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
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            value={formData.instagram}
                            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                            placeholder="@seu_usuario"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            placeholder="linkedin.com/in/seu-perfil"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Experience */}
                {currentStep === 3 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Sua experiência</CardTitle>
                      <CardDescription className="text-center">
                        Conte-nos sobre suas habilidades e experiência na área
                      </CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-semibold">Nível de experiência</Label>
                        <div className="grid md:grid-cols-2 gap-3 mt-2">
                          {experienceLevels.map((level) => (
                            <Card
                              key={level.id}
                              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                                formData.experience === level.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                              }`}
                              onClick={() => setFormData({ ...formData, experience: level.id })}
                            >
                              <CardContent className="p-3">
                                <h4 className="font-medium">{level.name}</h4>
                                <p className="text-sm text-gray-600">{level.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {selectedArea && (
                        <div>
                          <Label className="text-base font-semibold">Habilidades em {selectedArea.name}</Label>
                          <p className="text-sm text-gray-600 mb-3">Selecione suas principais habilidades</p>
                          <div className="grid md:grid-cols-2 gap-2">
                            {selectedArea.skills.map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox
                                  id={skill}
                                  checked={formData.skills.includes(skill)}
                                  onCheckedChange={() => handleSkillToggle(skill)}
                                />
                                <Label htmlFor={skill} className="text-sm">
                                  {skill}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="portfolio">Portfolio/Trabalhos anteriores</Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="Link para seu portfolio, GitHub, Behance, etc."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="availability">Disponibilidade</Label>
                          <Select
                            value={formData.availability}
                            onValueChange={(value) => setFormData({ ...formData, availability: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Quando pode trabalhar?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="integral">Tempo integral (40h/semana)</SelectItem>
                              <SelectItem value="meio-periodo">Meio período (20h/semana)</SelectItem>
                              <SelectItem value="freelancer">Freelancer (projetos)</SelectItem>
                              <SelectItem value="fins-semana">Fins de semana</SelectItem>
                              <SelectItem value="noturno">Período noturno</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="salary">Expectativa salarial (R$)</Label>
                          <Input
                            id="salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            placeholder="Ex: 2000/mês ou 50/hora"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="motivation">Por que quer trabalhar conosco? *</Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          placeholder="Conte-nos sua motivação, objetivos e o que pode agregar à equipe..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div>
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-center">Confirme sua candidatura</CardTitle>
                      <CardDescription className="text-center">Revise seus dados antes de enviar</CardDescription>
                    </CardHeader>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">Resumo da Candidatura</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Área:</span> {selectedArea?.name}
                          </div>
                          <div>
                            <span className="font-medium">Nome:</span> {formData.name}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {formData.email}
                          </div>
                          <div>
                            <span className="font-medium">Telefone:</span> {formData.phone}
                          </div>
                          <div>
                            <span className="font-medium">Experiência:</span>{" "}
                            {experienceLevels.find((e) => e.id === formData.experience)?.name}
                          </div>
                          <div>
                            <span className="font-medium">Disponibilidade:</span> {formData.availability}
                          </div>
                        </div>

                        {formData.skills.length > 0 && (
                          <div className="mt-4">
                            <span className="font-medium">Habilidades:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {formData.skills.map((skill, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {formData.motivation && (
                          <div className="mt-4">
                            <span className="font-medium">Motivação:</span>
                            <p className="text-gray-600 mt-1">{formData.motivation}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Próximos Passos</h4>
                        </div>
                        <p className="text-green-800 text-sm">
                          Após enviar sua candidatura, nossa equipe de RH analisará seu perfil e entrará em contato em{" "}
                          <strong>até 48 horas</strong> para agendar uma entrevista.
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
                        (currentStep === 1 && !formData.area) ||
                        (currentStep === 2 && (!formData.name || !formData.email || !formData.phone)) ||
                        (currentStep === 3 && (!formData.experience || !formData.motivation))
                      }
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
                    >
                      Próximo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white px-8">
                      🚀 Enviar Candidatura
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
