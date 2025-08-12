# Script para Push Rápido
# Faz push de todas as mudanças com um comando

Write-Host "🚀 Fazendo push rápido..." -ForegroundColor Green

try {
    # Verificar se há mudanças
    $status = git status --porcelain
    
    if (-not $status) {
        Write-Host "✅ Nenhuma mudança para fazer push" -ForegroundColor Yellow
        exit
    }
    
    # Adicionar todas as mudanças
    Write-Host "📝 Adicionando mudanças..." -ForegroundColor Cyan
    git add -A
    
    # Fazer commit com timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "quick: Push rápido - $timestamp"
    Write-Host "💾 Fazendo commit..." -ForegroundColor Cyan
    git commit -m $commitMessage
    
    # Fazer push
    Write-Host "📤 Fazendo push..." -ForegroundColor Cyan
    git push
    
    Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
    Write-Host "⏰ $timestamp" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Erro no push: $($_.Exception.Message)" -ForegroundColor Red
}
