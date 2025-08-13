"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export default function UpdateIndicator() {
  const [updateTime, setUpdateTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Pegar a data e hora atual
    const now = new Date()
    const formattedTime = now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    setUpdateTime(formattedTime)
  }, [])

  // Não renderizar até que o componente esteja montado
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-2 right-2 z-50 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1 animate-pulse">
      <Clock className="w-3 h-3" />
      <span>Atualizado em {updateTime}</span>
    </div>
  )
}
