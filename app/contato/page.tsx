import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, MapPin } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
              <p className="text-xl text-gray-600">
                Estamos aqui para ajudar você a transformar suas ideias em realidade
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                  <CardDescription>Preencha o formulário e entraremos em contato em breve</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Sobre o que você gostaria de falar?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Descreva seu projeto ou dúvida..." rows={6} />
                  </div>

                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Enviar Mensagem</Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl">Informações de Contato</CardTitle>
                    <CardDescription>Outras formas de entrar em contato conosco</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Discord</h3>
                        <p className="text-gray-600">Nosso canal principal de atendimento</p>
                        <Button asChild variant="link" className="p-0 h-auto text-cyan-500">
                          <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                            Entrar no Discord
                          </a>
                        </Button>
                      </div>
                    </div>



                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Localização</h3>
                        <p className="text-gray-600">Atendimento 100% online</p>
                        <p className="text-gray-600">Brasil</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Precisa de ajuda urgente?</h3>
                    <p className="mb-4 text-cyan-50">Entre em nosso Discord para atendimento imediato</p>
                    <Button asChild className="bg-white text-cyan-500 hover:bg-gray-100">
                      <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                        Falar Agora
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
