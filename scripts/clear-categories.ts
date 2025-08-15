import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function clearCategories() {
  console.log('🗑️ Deletando todas as categorias existentes...')

  try {
    // Buscar todas as categorias
    const categories = await firebaseService.getMainCategories()
    console.log(`📋 Encontradas ${categories.length} categorias para deletar:`)
    
    categories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.id})`)
    })

    // Deletar cada categoria
    for (const category of categories) {
      await firebaseService.deleteMainCategory(category.id)
      console.log(`✅ Deletada: ${category.title}`)
    }

    console.log('🎉 Todas as categorias foram deletadas com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao deletar categorias:', error)
  }
}

// Executar o script
clearCategories()

