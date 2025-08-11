import { NextRequest, NextResponse } from 'next/server'
import { DeepSeekService, AutomationRequest } from '@/lib/deepseek-service'

export async function POST(request: NextRequest) {
  try {
    const body: AutomationRequest = await request.json()
    
    // Validação básica
    if (!body.type || !body.prompt) {
      return NextResponse.json(
        { success: false, error: 'Tipo e prompt são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se a API key está configurada
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'DEEPSEEK_API_KEY não configurada' },
        { status: 500 }
      )
    }

    const deepseekService = DeepSeekService.getInstance()
    const result = await deepseekService.executeAutomation(body)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 500 })
    }

  } catch (error) {
    console.error('Erro na API de automação:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

// Endpoint específico para análise de pedidos
export async function PUT(request: NextRequest) {
  try {
    const { orderData } = await request.json()
    
    if (!orderData) {
      return NextResponse.json(
        { success: false, error: 'Dados do pedido são obrigatórios' },
        { status: 400 }
      )
    }

    const deepseekService = DeepSeekService.getInstance()
    const result = await deepseekService.analyzeOrder(orderData)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Erro na análise de pedido:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}
