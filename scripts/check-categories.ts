import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function checkCategories() {
  console.log('🔍 Verificando categorias no Firebase...')

  try {
    const categories = await firebaseService.getMainCategories()
    console.log(`📋 Total de categorias encontradas: ${categories.length}`)
    
    if (categories.length === 0) {
      console.log('❌ Nenhuma categoria encontrada!')
      return
    }

    categories.forEach((cat, index) => {
      console.log(`\n${index + 1}. ${cat.title}`)
      console.log(`   ID: ${cat.id}`)
      console.log(`   Descrição: ${cat.description}`)
      console.log(`   Ícone: ${cat.icon}`)
      console.log(`   Link: ${cat.href}`)
      console.log(`   Ativo: ${cat.active}`)
      console.log(`   Ordem: ${cat.order}`)
      console.log(`   Cor: ${cat.color}`)
      console.log(`   BG Color: ${cat.bgColor}`)
    })

  } catch (error) {
    console.error('❌ Erro ao verificar categorias:', error)
  }
}

// Executar o script
checkCategories()
