"use client"

import { useEffect } from 'react'

export default function MobileOptimizer() {
  useEffect(() => {
    // Otimizações específicas para mobile
    const optimizeForMobile = () => {
      // Prevenir zoom em inputs
      const inputs = document.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        input.setAttribute('autocomplete', 'off')
        input.setAttribute('autocorrect', 'off')
        input.setAttribute('autocapitalize', 'off')
        input.setAttribute('spellcheck', 'false')
      })

      // Otimizar scroll para mobile
      let isScrolling = false
      let scrollTimeout: NodeJS.Timeout

      const handleScroll = () => {
        if (!isScrolling) {
          document.body.classList.add('is-scrolling')
          isScrolling = true
        }

        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          document.body.classList.remove('is-scrolling')
          isScrolling = false
        }, 150)
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      // Prevenir double-tap zoom
      let lastTouchEnd = 0
      const preventDoubleTapZoom = (e: TouchEvent) => {
        const now = new Date().getTime()
        if (now - lastTouchEnd <= 300) {
          e.preventDefault()
        }
        lastTouchEnd = now
      }

      document.addEventListener('touchend', preventDoubleTapZoom, { passive: false })

      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll)
        document.removeEventListener('touchend', preventDoubleTapZoom)
        clearTimeout(scrollTimeout)
      }
    }

    // Aplicar otimizações apenas em dispositivos móveis
    if (window.innerWidth <= 768) {
      const cleanup = optimizeForMobile()
      return cleanup
    }
  }, [])

  return null
}
