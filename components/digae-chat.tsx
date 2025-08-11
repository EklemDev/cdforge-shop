"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2,
  Maximize2,
  Loader2,
  Sparkles
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function DigaeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou o DIGAE, seu assistente virtual da CodeForge! 🤖\n\nPosso te ajudar com:\n• Informações sobre nossos serviços\n• Contatos e Discord\n• Como funciona nosso sistema\n• Sobre nossa equipe\n\nComo posso te ajudar hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

          try {
        // Tentar primeiro com DeepSeek, depois com Gemini como fallback
        let response = await fetch('/api/deepseek/automate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'customer_support',
            prompt: `Você é o DIGAE, assistente virtual da CodeForge. Responda de forma amigável e profissional sobre:

INFORMAÇÕES DA CODEFORGE:
- Somos especialistas em desenvolvimento de bots e sites
- Equipe: M E L K E, ZANESCO e PEDRO (ótimo negociador, agente oficial)
- Discord: https://discord.gg/jp2BzA4H
- Contato: (11) 99999-9999, contato@codeforge.dev, @codeforge.dev

SERVIÇOS:
- Desenvolvimento de bots para Discord, WhatsApp, Telegram
- Criação de sites (e-commerce, portfólio, institucional)
- Design personalizado
- Consultoria técnica

PERGUNTA DO CLIENTE: "${inputMessage}"

Responda de forma clara, amigável e específica sobre a CodeForge. Se não souber algo específico, sugira entrar em contato conosco.`,
            maxTokens: 500,
            temperature: 0.7
          }),
        })

        // Se DeepSeek falhar, tentar com Gemini
        if (!response.ok) {
          console.log('DeepSeek falhou, tentando Gemini...')
          response = await fetch('/api/gemini/automate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'customer_support',
              prompt: `Você é o DIGAE, assistente virtual da CodeForge. Responda de forma amigável e profissional sobre:

INFORMAÇÕES DA CODEFORGE:
- Somos especialistas em desenvolvimento de bots e sites
- Equipe: M E L K E, ZANESCO e PEDRO (ótimo negociador, agente oficial)
- Discord: https://discord.gg/jp2BzA4H
- Contato: (11) 99999-9999, contato@codeforge.dev, @codeforge.dev

SERVIÇOS:
- Desenvolvimento de bots para Discord, WhatsApp, Telegram
- Criação de sites (e-commerce, portfólio, institucional)
- Design personalizado
- Consultoria técnica

PERGUNTA DO CLIENTE: "${inputMessage}"

Responda de forma clara, amigável e específica sobre a CodeForge. Se não souber algo específico, sugira entrar em contato conosco.`,
              maxTokens: 500,
              temperature: 0.7
            }),
          })
        }

      const result = await response.json()

      if (result.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: result.data,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        // Fallback para respostas pré-definidas
        const fallbackResponse = getFallbackResponse(inputMessage.toLowerCase())
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fallbackResponse,
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }
    } catch (error) {
      // Fallback para respostas pré-definidas em caso de erro
      const fallbackResponse = getFallbackResponse(inputMessage.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Função de fallback para respostas quando a API não está disponível
  const getFallbackResponse = (message: string): string => {
    if (message.includes('contato') || message.includes('contatos') || message.includes('telefone') || message.includes('email')) {
      return `📞 **Contatos da CodeForge:**

• **Telefone:** (11) 99999-9999
• **Email:** contato@codeforge.dev
• **Instagram:** @codeforge.dev
• **Discord:** https://discord.gg/jp2BzA4H

Entre em contato conosco pelo método que preferir! 😊`
    }
    
    if (message.includes('discord') || message.includes('servidor')) {
      return `🎮 **Nosso Discord:** https://discord.gg/jp2BzA4H

Junte-se à nossa comunidade! Lá você pode:
• Falar diretamente com nossa equipe
• Ver projetos em desenvolvimento
• Receber atualizações em tempo real
• Participar de discussões técnicas

Esperamos você lá! 🚀`
    }
    
    if (message.includes('quem') || message.includes('equipe') || message.includes('vocês')) {
      return `👥 **Nossa Equipe:**

• **M E L K E** - Especialista em Web e Mobile
• **ZANESCO** - Arquiteto de Sistemas e Bots
• **PEDRO** - Agente Oficial e Ótimo Negociador

Somos especialistas em desenvolvimento de bots e sites, prontos para transformar suas ideias em realidade! 💪`
    }
    
    if (message.includes('preço') || message.includes('valor') || message.includes('custo') || message.includes('quanto')) {
      return `💰 **Sobre Preços:**

Nossos preços variam conforme a complexidade do projeto. Para um orçamento personalizado:

1. **Acesse:** /categorias
2. **Escolha** seu tipo de projeto
3. **Preencha** o formulário de personalização
4. **Receba** um orçamento detalhado

Ou entre em contato diretamente pelo Discord! 📱`
    }
    
    if (message.includes('sistema') || message.includes('como funciona') || message.includes('processo')) {
      return `⚙️ **Como Funciona Nosso Sistema:**

1. **Escolha** sua solução em /categorias
2. **Personalize** seu projeto no formulário
3. **Receba** um orçamento detalhado
4. **Aprovação** e início do desenvolvimento
5. **Acompanhamento** em tempo real
6. **Entrega** e suporte contínuo

Tudo de forma transparente e profissional! ✨`
    }
    
    if (message.includes('bot') || message.includes('bots')) {
      return `🤖 **Nossos Bots:**

Desenvolvemos bots para:
• **Discord** - Moderação, música, jogos
• **WhatsApp** - Atendimento, automação
• **Telegram** - Notificações, comandos

Cada bot é personalizado para suas necessidades específicas! 🎯`
    }
    
    if (message.includes('site') || message.includes('sites') || message.includes('web')) {
      return `🌐 **Nossos Sites:**

Criamos sites profissionais:
• **E-commerce** - Lojas virtuais completas
• **Portfólio** - Para mostrar seus trabalhos
• **Institucional** - Para empresas
• **Landing Pages** - Para campanhas
• **Blogs** - Para conteúdo

Design moderno e responsivo! 🎨`
    }
    
    return `Olá! Sou o DIGAE, assistente virtual da CodeForge! 🤖

Posso te ajudar com informações sobre:
• 📞 Contatos e Discord
• 👥 Nossa equipe
• 💰 Preços e orçamentos
• ⚙️ Como funciona nosso sistema
• 🤖 Bots personalizados
• 🌐 Sites profissionais

Como posso te ajudar hoje? 😊`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Como funciona o sistema?",
    "Quais são os contatos?",
    "Quem são vocês?",
    "Preços dos serviços",
    "Discord da equipe"
  ]

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="shadow-2xl border-0 bg-white">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">DIGAE</CardTitle>
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">DIGAE está digitando...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Perguntas Rápidas */}
          {messages.length === 1 && (
            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Perguntas rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs h-auto py-1 px-2"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input de Mensagem */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by DeepSeek AI 🤖
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Botão flutuante para abrir o chat
export function DigaeChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
          size="lg"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            <span className="hidden sm:inline">Fale com DIGAE</span>
          </div>
        </Button>
      )}
      
      {isOpen && <DigaeChat />}
    </>
  )
}
