import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Clock, FileText, HelpCircle, Users, Briefcase } from "lucide-react"
import Link from "next/link"

const helpOptions = [
  {
    id: "discord",
    title: "Suporte no Discord",
    description: "Atendimento rápido e direto através do nosso servidor Discord oficial",
    icon: MessageCircle,
    color: "#5865F2",
    action: "Entrar no Discord",
    href: "https://discord.gg/jp2BzA4H",
  },

  {
    id: "faq",
    title: "Perguntas Frequentes",
    description: "Encontre respostas para as dúvidas mais comuns",
    icon: HelpCircle,
    color: "#10B981",
    action: "Ver FAQ",
    href: "#faq",
  },
  {
    id: "documentation",
    title: "Documentação",
    description: "Guias completos e tutoriais para usar nossos serviços",
    icon: FileText,
    color: "#8B5CF6",
    action: "Acessar Docs",
    href: "#docs",
  },
  {
    id: "community",
    title: "Comunidade",
    description: "Conecte-se com outros usuários e compartilhe experiências",
    icon: Users,
    color: "#F59E0B",
    action: "Participar",
    href: "https://discord.gg/jp2BzA4H",
  },
  {
    id: "schedule",
    title: "Agendar Atendimento",
    description: "Marque um horário para conversar diretamente conosco",
    icon: Clock,
    color: "#EC4899",
    action: "Agendar",
    href: "https://discord.gg/jp2BzA4H",
  },
]

const faqItems = [
  {
    question: "Quanto tempo leva para desenvolver um bot?",
    answer:
      "O tempo varia conforme a complexidade. Bots simples ficam prontos em 3-7 dias, enquanto bots mais complexos podem levar de 1-4 semanas.",
  },
  {
    question: "Vocês oferecem suporte após a entrega?",
    answer: "Sim! Todos os nossos projetos incluem 3 meses de suporte gratuito com atualizações e correções de bugs.",
  },
  {
    question: "Posso solicitar modificações no meu bot depois de pronto?",
    answer: "Claro! Oferecemos serviços de manutenção e novas funcionalidades. Entre em contato para orçamento.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Trabalhamos com 50% de entrada e 50% na entrega. Aceitamos PIX, cartão e transferência bancária.",
  },
  {
    question: "Vocês desenvolvem para outras plataformas além das listadas?",
    answer: "Sim! Se você precisa de automação para outra plataforma, entre em contato que analisamos a viabilidade.",
  },
  {
    question: "O código fonte fica comigo?",
    answer: "Sim, após o pagamento completo, você recebe todo o código fonte e documentação do projeto.",
  },
]

export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Central de Ajuda</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para ajudar você. Escolha a melhor forma de entrar em contato
            </p>
          </div>

          {/* Help Options */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {helpOptions.map((option) => (
                <Card
                  key={option.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
                >
                  <CardHeader className="text-center">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300"
                      style={{ backgroundColor: option.color + "20" }}
                    >
                      <option.icon className="w-8 h-8" style={{ color: option.color }} />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">{option.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      asChild
                      className="w-full text-white transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: option.color }}
                    >
                      <a
                        href={option.href}
                        target={option.href.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                      >
                        {option.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Seja um Agente Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4">Seja um dos nossos agentes!</h3>
                <p className="text-xl mb-6 text-blue-50 max-w-2xl mx-auto">
                  Junte-se à nossa equipe e faça parte do futuro da automação digital. Temos vagas para diferentes
                  áreas!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  >
                    <Link href="/ajuda/seja-agente">🚀 Candidatar-se Agora</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg bg-transparent"
                  >
                    <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                      Saber Mais
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Perguntas Frequentes</h2>
              <p className="text-gray-600">Respostas para as dúvidas mais comuns</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-0 shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
                <p className="mb-6 text-cyan-50">
                  Nossa equipe está sempre pronta para ajudar você. Entre em contato conosco!
                </p>
                <div className="flex justify-center">
                  <Button asChild className="bg-white text-cyan-500 hover:bg-gray-100">
                    <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                      Falar no Discord
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
