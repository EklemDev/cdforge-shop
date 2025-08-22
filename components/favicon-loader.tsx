"use client"

import { useEffect } from 'react'

export default function FaviconLoader() {
  useEffect(() => {
    // Aguardar um pouco para garantir que o DOM está pronto
    const timer = setTimeout(() => {
      try {
        // Verificar se já existe um favicon
        const existingFavicon = document.querySelector('link[rel="icon"]')
        if (!existingFavicon) {
          // Adiciona apenas se não existir
          const link = document.createElement('link')
          link.rel = 'icon'
          link.href = '/logo.svg'
                      link.type = 'image/svg+xml'
          document.head.appendChild(link)
        }
      } catch (error) {
        console.warn('Erro ao carregar favicon:', error)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
