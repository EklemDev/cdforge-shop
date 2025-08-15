import OpenAI from 'openai'

// Cliente OpenAI só será criado no servidor
let deepseekClient: OpenAI | null = null

const getDeepSeekClient = () => {
  if (typeof window === 'undefined' && !deepseekClient) {
    deepseekClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    })
  }
  return deepseekClient
}

export interface AutomationRequest {
  type: 'customer_support' | 'order_analysis' | 'content_generation' | 'code_review' | 'custom'
  prompt: string
  context?: any
  maxTokens?: number
  temperature?: number
}

export interface AutomationResponse {
  success: boolean
  data?: string
  error?: string
}

export class DeepSeekService {
  private static instance: DeepSeekService

  private constructor() {}

  static getInstance(): DeepSeekService {
    if (!DeepSeekService.instance) {
      DeepSeekService.instance = new DeepSeekService()
    }
    return DeepSeekService.instance
  }

  /**
   * Executa uma automação usando DeepSeek
   */
  async executeAutomation(request: AutomationRequest): Promise<AutomationResponse> {
    try {
      if (!process.env.DEEPSEEK_API_KEY) {
        throw new Error('DEEPSEEK_API_KEY não configurada')
      }

      console.log('Tentando conectar com DeepSeek...')
      console.log('API Key length:', process.env.DEEPSEEK_API_KEY?.length)

      const client = getDeepSeekClient()
      if (!client) {
        throw new Error('Cliente DeepSeek não disponível no browser')
      }

  
      const testResponse = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: 'Olá, teste simples'
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
      })

      console.log('Teste bem-sucedido:', testResponse.choices[0]?.message?.content)

      // Agora a requisição real
      const systemPrompt = this.getSystemPrompt(request.type)
      const userPrompt = this.buildUserPrompt(request)

      const completion = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: request.maxTokens || 1000,
        temperature: request.temperature || 0.7,
      })

      const response = completion.choices[0]?.message?.content

      return {
        success: true,
        data: response || 'Sem resposta'
      }

    } catch (error) {
      console.error('Erro detalhado na automação DeepSeek:', error)
      
      // Log detalhado do erro
      if (error instanceof Error) {
        console.error('Mensagem de erro:', error.message)
        console.error('Stack trace:', error.stack)
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido na API'
      }
    }
  }

  /**
   *Analisa pedidos automaticamente
   */
  async analyzeOrder(orderData: any): Promise<AutomationResponse> {
    const prompt = `
      Analise o seguinte pedido de cliente e forneça:
      1. Prioridade sugerida (Alta/Média/Baixa)
      2. Estimativa de tempo de desenvolvimento
      3. Recursos necessários
      4. Sugestões de melhoria
      5. Possíveis riscos

      Dados do pedido:
      ${JSON.stringify(orderData, null, 2)}
    `

    return this.executeAutomation({
      type: 'order_analysis',
      prompt,
      context: orderData
    })
  }

  /**
   * Gera resposta automática para suporte ao cliente
   */
  async generateCustomerResponse(customerMessage: string, orderContext?: any): Promise<AutomationResponse> {
    const prompt = `
      Gere uma resposta profissional e amigável para o cliente.
      
      Mensagem do cliente: "${customerMessage}"
      
      ${orderContext ? `Contexto do pedido: ${JSON.stringify(orderContext)}` : ''}
      
      A resposta deve ser:
      - Profissional e cordial
      - Em português brasileiro
      - Específica para a solicitação
      - Incluir próximos passos quando apropriado
    `

    return this.executeAutomation({
      type: 'customer_support',
      prompt,
      context: { customerMessage, orderContext }
    })
  }

  /**
   * Gera conteúdo para o site
   */
  async generateContent(contentType: string, topic: string, requirements?: string): Promise<AutomationResponse> {
    const prompt = `
      Gere conteúdo para o site CodeForge sobre ${topic}.
      
      Tipo de conteúdo: ${contentType}
      ${requirements ? `Requisitos específicos: ${requirements}` : ''}
      
      O conteúdo deve ser:
      - Otimizado para SEO
      - Em português brasileiro
      - Focado em desenvolvimento de bots e sites
      - Profissional e atrativo
    `

    return this.executeAutomation({
      type: 'content_generation',
      prompt,
      context: { contentType, topic, requirements }
    })
  }

  /**
   * Revisa código automaticamente
   */
  async reviewCode(code: string, language: string): Promise<AutomationResponse> {
    const prompt = `
      Faça uma revisão do seguinte código em ${language}:
      
      ${code}
      
      Forneça:
      1. Análise de qualidade
      2. Sugestões de melhoria
      3. Possíveis bugs ou problemas
      4. Boas práticas aplicadas
      5. Sugestões de otimização
    `

    return this.executeAutomation({
      type: 'code_review',
      prompt,
      context: { code, language }
    })
  }

  private getSystemPrompt(type: string): string {
    const prompts = {
      customer_support: `Você é um assistente de suporte ao cliente da CodeForge, especializada em desenvolvimento de bots e sites. 
      Sempre seja profissional, cordial e forneça respostas úteis e específicas.`,
      
      order_analysis: `Você é um analista técnico especializado em projetos de desenvolvimento de bots e sites. 
      Analise pedidos de forma objetiva e forneça insights valiosos para o planejamento.`,
      
      content_generation: `Você é um redator especializado em tecnologia e desenvolvimento web. 
      Crie conteúdo atrativo, informativo e otimizado para SEO.`,
      
      code_review: `Você é um desenvolvedor sênior especializado em revisão de código. 
      Forneça análises técnicas detalhadas e sugestões construtivas.`,
      
      custom: `Você é um assistente de IA especializado em automações para a CodeForge. 
      Ajude com as tarefas solicitadas de forma eficiente e profissional.`
    }

    return prompts[type as keyof typeof prompts] || prompts.custom
  }

  private buildUserPrompt(request: AutomationRequest): string {
    let prompt = request.prompt

    if (request.context) {
      prompt += `\n\nContexto adicional: ${JSON.stringify(request.context, null, 2)}`
    }

    return prompt
  }
}

// Hook para usar o serviço no frontend
export function useDeepSeek() {
  const executeAutomation = async (request: AutomationRequest): Promise<AutomationResponse> => {
    try {
      console.log('Enviando requisição para API:', request.type)
      
      const response = await fetch('/api/deepseek/automate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Erro HTTP:', response.status, errorText)
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('Resposta da API:', result.success ? 'Sucesso' : 'Erro')
      
      return result
    } catch (error) {
      console.error('Erro na comunicação com API:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro na comunicação'
      }
    }
  }

  return {
    executeAutomation,
    analyzeOrder: (orderData: any) => executeAutomation({
      type: 'order_analysis',
      prompt: 'Analise este pedido',
      context: orderData
    }),
    generateCustomerResponse: (message: string, context?: any) => executeAutomation({
      type: 'customer_support',
      prompt: 'Gere resposta para o cliente',
      context: { message, context }
    }),
    generateContent: (type: string, topic: string, requirements?: string) => executeAutomation({
      type: 'content_generation',
      prompt: 'Gere conteúdo',
      context: { type, topic, requirements }
    }),
    reviewCode: (code: string, language: string) => executeAutomation({
      type: 'code_review',
      prompt: 'Revise este código',
      context: { code, language }
    })
  }
}