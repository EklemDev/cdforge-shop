import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function addSamplePlans() {
  console.log('➕ Adicionando planos de exemplo...')
  
  try {
    const samplePlans = [
      {
        name: "Plano Básico",
        contacts: {
          melke: "Melke Silva",
          zanesco: "Zanesco Costa",
          pedro: "Pedro Santos"
        },
        testDays: 30,
        price: 45,
        promotion: {
          active: false,
          type: 'percentage' as 'percentage' | 'fixed',
          value: 0,
          description: ""
        },
        active: true,
        order: 1
      },
      {
        name: "Plano Profissional",
        contacts: {
          melke: "Melke Silva",
          zanesco: "Zanesco Costa",
          pedro: "Pedro Santos"
        },
        testDays: 30,
        price: 89,
        promotion: {
          active: true,
          type: 'percentage' as 'percentage' | 'fixed',
          value: 15,
          description: "Promoção de lançamento"
        },
        active: true,
        order: 2
      },
      {
        name: "Plano Enterprise",
        contacts: {
          melke: "Melke Silva",
          zanesco: "Zanesco Costa",
          pedro: "Pedro Santos"
        },
        testDays: 30,
        price: 150,
        promotion: {
          active: false,
          type: 'percentage' as 'percentage' | 'fixed',
          value: 0,
          description: ""
        },
        active: true,
        order: 3
      }
    ]

    for (const plan of samplePlans) {
      const planId = await firebaseService.addPlan(plan)
      console.log(`✅ Plano "${plan.name}" criado com sucesso! ID: ${planId}`)
    }

    console.log('🎉 Todos os planos de exemplo foram criados com sucesso!')
    
    // Verificar planos criados
    const plans = await firebaseService.getPlans()
    console.log(`Total de planos agora: ${plans.length}`)
    plans.forEach(plan => {
      console.log(`  - ${plan.name} (R$ ${plan.price})`)
    })
    
  } catch (error) {
    console.error('❌ Erro ao adicionar planos de exemplo:', error)
  }
}

addSamplePlans()






