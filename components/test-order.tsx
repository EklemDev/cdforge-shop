"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/hooks/useFirebaseData"
import { toast } from "@/hooks/use-toast"

export default function TestOrder() {
  const { addOrder, orders } = useOrders()
  const [loading, setLoading] = useState(false)

  const testAddOrder = async () => {
    setLoading(true)
    try {
      console.log('🧪 Testando adição de pedido...')
      
      const testOrder = {
        customerName: "Cliente Teste",
        customerEmail: "teste@email.com",
        customerPhone: "(11) 99999-9999",
        projectType: "bot" as const,
        category: "Bot Discord",
        description: "Pedido de teste para verificar se está funcionando",
        budget: "R$ 500",
        timeline: "1 semana",
        status: "pending" as const,
        assignedTo: "",
        priority: "medium" as const,
        notes: "Pedido de teste"
      }

      console.log('🧪 Dados do pedido:', testOrder)
      
      const result = await addOrder(testOrder)
      
      console.log('🧪 Resultado:', result)
      
      if (result) {
        toast({
          title: "✅ Pedido de teste criado com sucesso!",
          description: `ID: ${result}`,
        })
      } else {
        toast({
          title: "❌ Erro ao criar pedido de teste",
          description: "Verifique o console para mais detalhes",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('❌ Erro no teste:', error)
      toast({
        title: "❌ Erro no teste",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-4">🧪 Teste de Pedidos</h3>
      
      <div className="space-y-4">
        <Button 
          onClick={testAddOrder} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Testando..." : "Criar Pedido de Teste"}
        </Button>
        
        <div className="text-sm">
          <p><strong>Pedidos existentes:</strong> {orders.length}</p>
          <p><strong>Últimos pedidos:</strong></p>
          <ul className="list-disc list-inside">
            {orders.slice(-3).map((order, index) => (
              <li key={order.id}>
                {order.customerName} - {order.projectType} ({order.status})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
