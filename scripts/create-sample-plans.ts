import FirebaseDataService from '../lib/firebase-data-service'

async function createSamplePlans() {
  const firebaseService = FirebaseDataService.getInstance()
  
  try {
    console.log('Criando planos de exemplo...')
    
    // Plano Básico
    const basicPlan = {
      name: 'Plano Básico',
      description: 'Ideal para pequenas empresas que estão começando com automação',
      price: 99,
      currency: 'BRL',
      features: [
        'Bot personalizado para WhatsApp',
        'Até 1000 mensagens/mês',
        'Suporte por email',
        'Configuração básica',
        'Relatórios simples'
      ],
      limitations: [
        'Apenas 1 bot ativo',
        'Sem integração com CRM',
        'Suporte limitado'
      ],
      type: 'basic' as const,
      category: 'automation',
      popular: false,
      active: true,
      order: 1,
      testDays: 30,
      contacts: {
        melke: 'melke',
        zanesco: 'zanesco',
        pedro: 'pedro'
      },
      promotion: {
        active: true,
        type: 'percentage' as const,
        value: 20,
        description: '20% OFF - Primeiro Mês'
      }
    }
    
    // Plano Pro
    const proPlan = {
      name: 'Plano Profissional',
      description: 'Perfeito para empresas em crescimento que precisam de mais recursos',
      price: 199,
      currency: 'BRL',
      features: [
        'Tudo do Plano Básico',
        'Até 5000 mensagens/mês',
        'Múltiplos bots',
        'Integração com CRM',
        'Suporte prioritário',
        'Relatórios avançados',
        'API personalizada'
      ],
      limitations: [
        'Máximo 5 bots ativos',
        'Sem atendimento 24/7'
      ],
      type: 'pro' as const,
      category: 'automation',
      popular: true,
      active: true,
      order: 2,
      testDays: 30,
      contacts: {
        melke: 'melke',
        zanesco: 'zanesco',
        pedro: 'pedro'
      },
      promotion: {
        active: false,
        type: 'percentage' as const,
        value: 0,
        description: ''
      }
    }
    
    // Plano Enterprise
    const enterprisePlan = {
      name: 'Plano Enterprise',
      description: 'Solução completa para grandes empresas com necessidades específicas',
      price: 499,
      currency: 'BRL',
      features: [
        'Tudo do Plano Pro',
        'Mensagens ilimitadas',
        'Bots ilimitados',
        'Atendimento 24/7',
        'Integração completa',
        'Relatórios personalizados',
        'API dedicada',
        'Consultoria especializada'
      ],
      limitations: [],
      type: 'enterprise' as const,
      category: 'automation',
      popular: false,
      active: true,
      order: 3,
      testDays: 30,
      contacts: {
        melke: 'melke',
        zanesco: 'zanesco',
        pedro: 'pedro'
      },
      promotion: {
        active: true,
        type: 'fixed' as const,
        value: 100,
        description: 'R$ 100 OFF - Primeiro Mês'
      }
    }
    
    // Adicionar planos
    const basicPlanId = await firebaseService.addPlan(basicPlan)
    console.log('Plano Básico criado com ID:', basicPlanId)
    
    const proPlanId = await firebaseService.addPlan(proPlan)
    console.log('Plano Pro criado com ID:', proPlanId)
    
    const enterprisePlanId = await firebaseService.addPlan(enterprisePlan)
    console.log('Plano Enterprise criado com ID:', enterprisePlanId)
    
    console.log('Todos os planos foram criados com sucesso!')
    
  } catch (error) {
    console.error('Erro ao criar planos:', error)
  }
}

createSamplePlans()




