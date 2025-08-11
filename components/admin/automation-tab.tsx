"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  MessageSquare, 
  FileText, 
  Code, 
  Zap,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Brain,
  Settings,
  BarChart3
} from "lucide-react"
import { useDeepSeek, AutomationRequest } from "@/lib/deepseek-service"

interface AutomationTabProps {
  orders: any[]
}

export default function AutomationTab({ orders }: AutomationTabProps) {
  const [selectedAutomation, setSelectedAutomation] = useState<string>("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<string>("")
  
  const { executeAutomation, analyzeOrder, generateCustomerResponse, generateContent, reviewCode } = useDeepSeek()

  const automationTypes = [
    {
      id: "order_analysis",
      name: "Análise de Pedidos",
      description: "Analisa pedidos automaticamente e fornece insights",
      icon: Bot,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "customer_support",
      name: "Suporte ao Cliente",
      description: "Gera respostas automáticas para clientes",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "content_generation",
      name: "Geração de Conteúdo",
      description: "Cria conteúdo para o site automaticamente",
      icon: FileText,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: "code_review",
      name: "Revisão de Código",
      description: "Analisa e revisa código automaticamente",
      icon: Code,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: "custom",
      name: "Automação Personalizada",
      description: "Executa automações customizadas",
      icon: Zap,
      color: "bg-red-100 text-red-600"
    }
  ]

  const handleAutomation = async () => {
    if (!selectedAutomation) return

    setIsLoading(true)
    setResult(null)

    try {
      let response

      switch (selectedAutomation) {
        case "order_analysis":
          if (selectedOrder) {
            const order = orders.find(o => o.id === selectedOrder)
            response = await analyzeOrder(order)
          } else {
            response = await executeAutomation({
              type: "order_analysis",
              prompt: "Analise os pedidos recentes e forneça um resumo geral"
            })
          }
          break

        case "customer_support":
          response = await executeAutomation({
            type: "customer_support",
            prompt: customPrompt || "Gere uma resposta padrão para suporte ao cliente"
          })
          break

        case "content_generation":
          response = await executeAutomation({
            type: "content_generation",
            prompt: customPrompt || "Gere conteúdo sobre desenvolvimento de bots"
          })
          break

        case "code_review":
          response = await executeAutomation({
            type: "code_review",
            prompt: customPrompt || "Forneça dicas gerais de boas práticas de código"
          })
          break

        case "custom":
          response = await executeAutomation({
            type: "custom",
            prompt: customPrompt
          })
          break

        default:
          throw new Error("Tipo de automação não reconhecido")
      }

      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    {
      name: "Analisar Pedidos Pendentes",
      action: () => {
        setSelectedAutomation("order_analysis")
        setCustomPrompt("Analise todos os pedidos pendentes e sugira prioridades")
        handleAutomation()
      }
    },
    {
      name: "Gerar Resposta de Boas-vindas",
      action: () => {
        setSelectedAutomation("customer_support")
        setCustomPrompt("Gere uma mensagem de boas-vindas profissional para novos clientes")
        handleAutomation()
      }
    },
    {
      name: "Criar Conteúdo sobre Bots",
      action: () => {
        setSelectedAutomation("content_generation")
        setCustomPrompt("Crie um artigo sobre os benefícios de bots para empresas")
        handleAutomation()
      }
    }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Automações com DeepSeek
          </CardTitle>
          <CardDescription>
            Use IA para automatizar tarefas administrativas e melhorar a produtividade
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>
            Automações pré-configuradas para tarefas comuns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={action.action}
                disabled={isLoading}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automação Personalizada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            Automação Personalizada
          </CardTitle>
          <CardDescription>
            Configure e execute automações específicas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Automação</Label>
              <Select value={selectedAutomation} onValueChange={setSelectedAutomation}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {automationTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedAutomation === "order_analysis" && (
              <div>
                <Label>Pedido Específico (Opcional)</Label>
                <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um pedido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os pedidos</SelectItem>
                    {orders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.customerInfo.name} - {order.projectType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <Label>Prompt Personalizado</Label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Digite sua instrução para a IA..."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleAutomation} 
            disabled={isLoading || !selectedAutomation}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Executar Automação
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              Resultado da Automação
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result.success ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Sucesso!</h4>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-green-700">
                      {result.data}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Erro</h4>
                <p className="text-red-700">{result.error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Estatísticas de Uso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Estatísticas de Automação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Automações Executadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Tempo Economizado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Pedidos Analisados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Respostas Geradas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
