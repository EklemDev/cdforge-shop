import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function addAssistenciaCategory() {
  console.log('➕ Adicionando categoria "Assistência"...')

  try {
    const assistenciaCategory = {
      title: "ASSISTÊNCIA",
      description: "Análise de Instagram, consultoria especializada e suporte técnico",
      icon: "Settings",
      href: "/assistencia",
      color: "#06B6D4",
      bgColor: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
      active: true,
      order: 1
    }

    const categoryId = await firebaseService.addMainCategory(assistenciaCategory)
    console.log(`✅ Categoria "ASSISTÊNCIA" criada com sucesso! ID: ${categoryId}`)
    
    // Verificar se foi criada
    const categories = await firebaseService.getMainCategories()
    console.log(`📋 Total de categorias: ${categories.length}`)
    categories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.id})`)
    })

  } catch (error) {
    console.error('❌ Erro ao criar categoria:', error)
  }
}

// Executar o script
addAssistenciaCategory()

