"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { usePlans } from "@/hooks/usePlans"

export default function PlanosSimplesPage() {
  const { plans, loading, error } = usePlans()

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
              Planos - Versão Simplificada
            </h1>
            
            {/* Debug Info */}
            <div className="bg-gray-100 p-4 rounded-lg mb-8 text-left max-w-2xl mx-auto">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <p><strong>Loading:</strong> {loading ? 'Sim' : 'Não'}</p>
              <p><strong>Error:</strong> {error || 'Nenhum'}</p>
              <p><strong>Total de planos:</strong> {plans.length}</p>
              <p><strong>Planos ativos:</strong> {plans.filter(p => p.active).length}</p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando planos...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao Carregar Planos</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Tentar Novamente
                </Button>
              </div>
            )}

            {/* Planos */}
            {!loading && !error && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Planos Disponíveis ({plans.filter(p => p.active).length})
                </h2>
                
                {plans.filter(p => p.active).map((plan) => (
                  <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        R$ {plan.price}/mês
                      </span>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Selecionar
                      </Button>
                    </div>
                  </div>
                ))}
                
                {plans.filter(p => p.active).length === 0 && (
                  <div className="text-center">
                    <p className="text-gray-600">Nenhum plano ativo encontrado.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}




