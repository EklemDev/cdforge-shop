"use client"

import { useEffect, useState } from 'react'
import { useSiteConfig } from '@/hooks/useFirebaseData'

export default function TestSync() {
  const { config, loading, error, updateConfig } = useSiteConfig()
  const [testValue, setTestValue] = useState('')

  useEffect(() => {
    // Componente montado
  }, [])

  useEffect(() => {
    // Config mudou
  }, [config])

  const handleTestUpdate = async () => {
    const newPhone = `(11) ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`
    
    const success = await updateConfig({
      phone: newPhone,
      whatsapp: `https://wa.me/55${newPhone.replace(/\D/g, '')}`,
      discordLink: `https://discord.gg/teste${Date.now()}`
    })
  }

  if (loading) {
    return <div className="p-4 bg-yellow-100">🔄 Carregando...</div>
  }

  if (error) {
    return <div className="p-4 bg-red-100">❌ Erro: {error}</div>
  }

  return (
    <div className="p-4 bg-blue-100 border rounded-lg">
      <h3 className="font-bold mb-2">🧪 Teste de Sincronização</h3>
      
      <div className="space-y-2 mb-4">
        <div><strong>Telefone:</strong> {config?.phone || 'N/A'}</div>
        <div><strong>WhatsApp:</strong> {config?.whatsapp || 'N/A'}</div>
        <div><strong>Discord:</strong> {config?.discordLink || 'N/A'}</div>
        <div><strong>Email:</strong> {config?.email || 'N/A'}</div>
        <div><strong>Instagram:</strong> {config?.instagram || 'N/A'}</div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
          placeholder="Digite um valor para testar"
          className="w-full p-2 border rounded"
        />
        
        <button
          onClick={handleTestUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Testar Atualização
        </button>
      </div>
    </div>
  )
}
