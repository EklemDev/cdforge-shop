"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface CompletionButtonProps {
  onComplete?: () => void
  className?: string
}

export default function CompletionButton({ onComplete, className = "" }: CompletionButtonProps) {
  const router = useRouter()

  const handleComplete = () => {
    // Executar callback personalizado se fornecido
    if (onComplete) {
      onComplete()
    }
    
    // Voltar para a tela de categorias
    router.push('/categorias')
  }

  return (
    <Button
      onClick={handleComplete}
      className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
    >
      <CheckCircle className="w-5 h-5 mr-2" />
      Concluído
      <ArrowLeft className="w-5 h-5 ml-2" />
    </Button>
  )
}
