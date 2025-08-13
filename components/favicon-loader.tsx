"use client"

import { useEffect } from 'react'

export default function FaviconLoader() {
  useEffect(() => {
    // Força o Firefox a carregar o favicon
    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = '/logo.png'
    link.type = 'image/png'
    
    // Remove favicons existentes
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
    existingFavicons.forEach(favicon => favicon.remove())
    
    // Adiciona o novo favicon
    document.head.appendChild(link)
    
    // Adiciona também como shortcut icon
    const shortcutLink = document.createElement('link')
    shortcutLink.rel = 'shortcut icon'
    shortcutLink.href = '/logo.png'
    shortcutLink.type = 'image/png'
    document.head.appendChild(shortcutLink)
    
    // Adiciona apple-touch-icon
    const appleLink = document.createElement('link')
    appleLink.rel = 'apple-touch-icon'
    appleLink.href = '/logo.png'
    document.head.appendChild(appleLink)
  }, [])

  return null
}
