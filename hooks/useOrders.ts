import { useState, useEffect } from 'react'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  projectType: string
  category: string
  description: string
  budget: string
  timeline: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  assignedTo: string
  priority: 'low' | 'medium' | 'high'
  notes: string
  createdAt: any
  updatedAt: any
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Carregar pedidos do Firebase
  useEffect(() => {
    const loadOrders = async () => {
      if (!db) return

      try {
        const ordersRef = collection(db, 'orders')
        const q = query(ordersRef, orderBy('createdAt', 'desc'))
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersData: Order[] = []
          snapshot.forEach((doc) => {
            const data = doc.data() as Order
            ordersData.push({ ...data, id: doc.id })
          })
          setOrders(ordersData)
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error)
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  // Adicionar novo pedido
  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!db) return null

    try {
      const newOrder = {
        ...order,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const docRef = await addDoc(collection(db, 'orders'), newOrder)
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error)
      return null
    }
  }

  // Atualizar pedido
  const updateOrder = async (id: string, order: Partial<Order>) => {
    if (!db) return false

    try {
      const docRef = doc(db, 'orders', id)
      await updateDoc(docRef, {
        ...order,
        updatedAt: new Date()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      return false
    }
  }

  // Deletar pedido
  const deleteOrder = async (id: string) => {
    if (!db) return false

    try {
      await deleteDoc(doc(db, 'orders', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar pedido:', error)
      return false
    }
  }

  // Obter pedidos por status
  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status)
  }

  // Obter pedidos por categoria
  const getOrdersByCategory = (category: string) => {
    return orders.filter(order => order.category === category)
  }

  return {
    orders,
    loading,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrdersByStatus,
    getOrdersByCategory
  }
}


