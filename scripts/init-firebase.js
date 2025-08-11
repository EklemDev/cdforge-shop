const { execSync } = require('child_process')
const path = require('path')

console.log('🚀 Iniciando inicialização do Firebase...')

try {
  // Executar o script TypeScript
  execSync('npx ts-node scripts/init-firebase.ts', {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  })
  
  console.log('✅ Inicialização concluída com sucesso!')
} catch (error) {
  console.error('❌ Erro durante a inicialização:', error.message)
  process.exit(1)
}
