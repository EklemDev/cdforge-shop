#!/bin/bash

echo "🚀 Iniciando deploy do CodeForge..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Build do projeto
echo "🔨 Fazendo build..."
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em .next/"
    echo ""
    echo "🌐 Próximos passos:"
    echo "1. Faça upload da pasta .next/ para seu servidor"
    echo "2. Configure o servidor web (Apache/Nginx)"
    echo "3. Configure seu domínio"
    echo "4. Configure SSL/HTTPS"
else
    echo "❌ Erro no build!"
    exit 1
fi
