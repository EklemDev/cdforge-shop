# Script para Push Automático
# Monitora mudanças e faz push automaticamente

Write-Host "🚀 Iniciando monitoramento automático de push..." -ForegroundColor Green
Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Yellow

while ($true) {
    try {
        # Verificar status do git
        $status = git status --porcelain
        
        if ($status) {
            Write-Host "📝 Mudanças detectadas! Fazendo push..." -ForegroundColor Cyan
            
            # Adicionar todas as mudanças
            git add -A
            
            # Fazer commit com timestamp
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $commitMessage = "auto: Push automático - $timestamp"
            git commit -m $commitMessage
            
            # Fazer push
            git push
            
            Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
            Write-Host "⏰ $timestamp" -ForegroundColor Gray
            Write-Host "---" -ForegroundColor Gray
        }
        
        # Aguardar 30 segundos antes da próxima verificação
        Start-Sleep -Seconds 30
        
    } catch {
        Write-Host "❌ Erro no push automático: $($_.Exception.Message)" -ForegroundColor Red
        Start-Sleep -Seconds 60
    }
}
