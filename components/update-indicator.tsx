"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, onSnapshot } from "firebase/firestore"

export default function UpdateIndicator() {
  const [updateTime, setUpdateTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Aguardar um pouco para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      setMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted || !db) return

    // Escutar mudanças no documento de configuração do site
    const unsubscribe = onSnapshot(doc(db, "siteConfig", "config"), (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        const lastUpdated = data.lastUpdated?.toDate?.() || new Date()
        
        const formattedTime = lastUpdated.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        
        setUpdateTime(formattedTime)
      } else {
        // Se não existir, usar data atual
        const now = new Date()
        const formattedTime = now.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        setUpdateTime(formattedTime)
      }
    }, (error) => {
      console.warn('Erro ao buscar última atualização:', error)
      // Em caso de erro, usar data atual
      const now = new Date()
      const formattedTime = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      setUpdateTime(formattedTime)
    })

    return () => unsubscribe()
  }, [mounted])

  // Não renderizar até que o componente esteja montado
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-40 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg flex items-center gap-2 animate-pulse">
      <Clock className="w-3 h-3" />
      <span>Atualizado em {updateTime}</span>
    </div>
  )
}
