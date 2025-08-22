import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function addTestCategories() {
  console.log('➕ Adicionando categorias de teste...')

  try {
    const testCategories = [
      {
        title: "BOTS",
        description: "Automação inteligente para Discord, WhatsApp, Instagram e Web Scraping",
        icon: "Bot",
        href: "/bots",
        color: "#3B82F6",
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        active: true,
        order: 1
      },
      {
        title: "SITES",
        description: "Desenvolvimento web profissional, e-commerce, portfolios e landing pages",
        icon: "Globe",
        href: "/sites",
        color: "#10B981",
        bgColor: "bg-green-500",
        hoverColor: "hover:bg-green-600",
        active: true,
        order: 2
      },
      {
        title: "DESIGN",
        description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
        icon: "Palette",
        href: "/design",
        color: "#8B5CF6",
        bgColor: "bg-purple-500",
        hoverColor: "hover:bg-purple-600",
        active: true,
        order: 3
      }
    ]

    for (const category of testCategories) {
      const categoryId = await firebaseService.addMainCategory(category)
      console.log(`✅ Categoria "${category.title}" criada com sucesso! ID: ${categoryId}`)
    }
    
    // Verificar se foram criadas
    const categories = await firebaseService.getMainCategories()
    console.log(`📋 Total de categorias: ${categories.length}`)
    categories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.id})`)
    })

  } catch (error) {
    console.error('❌ Erro ao criar categorias:', error)
  }
}

// Executar o script
addTestCategories()






