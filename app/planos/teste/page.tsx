"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TestePlanosPage() {
  const [testValue, setTestValue] = useState("")

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>
          
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Página de Teste - Planos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Esta é uma página de teste para verificar se a navegação está funcionando
            </p>
            
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                placeholder="Digite algo para testar"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              
              <Button
                onClick={() => alert('Teste funcionando!')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Testar Funcionalidade
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




