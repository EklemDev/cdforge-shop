"use client"

import { Metadata } from "next"
import FoundersLocation from "@/components/founders-location"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Clock, 
  MessageCircle, 
  Globe,
  Users,
  Star,
  Award,
  Zap,
  ArrowRight
} from "lucide-react"

export default function FundadoresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Nossa Equipe de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                Fundadores
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Conheça os especialistas por trás da CodeForge e descubra quando cada um está disponível para atender você
            </p>
            
            {/* Estatísticas Rápidas */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Fundadores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cobertura</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Compromisso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Principal dos Fundadores */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FoundersLocation />
        </div>
      </section>

      {/* Seção de Informações Adicionais */}
      <section className="py-8 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Como Funciona o Atendimento */}
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-lg">
                  <Clock className="w-5 h-5" />
                  Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Verifique a Disponibilidade</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Cada fundador tem seu horário específico. O indicador verde mostra quando estão online.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Escolha o Especialista</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Cada fundador tem especialidades diferentes. Escolha quem melhor atende sua necessidade.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Entre em Contato</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Use o botão "Contatar" para iniciar uma conversa direta com o fundador escolhido.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especialidades da Equipe */}
            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-lg">
                  <Star className="w-5 h-5" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-2">M E L K E</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Web Development</Badge>
                      <Badge variant="secondary" className="text-xs">Mobile Apps</Badge>
                      <Badge variant="secondary" className="text-xs">UI/UX Design</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 text-sm mb-2">ZANESCO</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Bot Development</Badge>
                      <Badge variant="secondary" className="text-xs">System Automation</Badge>
                      <Badge variant="secondary" className="text-xs">API Integration</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2">PEDRO</h4>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">Business Development</Badge>
                      <Badge variant="secondary" className="text-xs">Client Relations</Badge>
                      <Badge variant="secondary" className="text-xs">Project Management</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção de CTA */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-3">
                  Pronto para Começar seu Projeto?
                </h2>
                <p className="text-base mb-6 opacity-90">
                  Nossa equipe está pronta para transformar suas ideias em realidade. 
                  Entre em contato agora!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-base rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Entrar no Discord
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-blue-600 px-6 py-3 text-base rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <a href="/categorias" className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Ver Soluções
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
