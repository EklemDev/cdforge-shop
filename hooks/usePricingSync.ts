import { useState, useEffect } from 'react'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface PricingPlan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  active: boolean
  type: 'bot' | 'site' | 'design'
  createdAt: any
  updatedAt: any
}

export interface PricingData {
  bots: PricingPlan[]
  sites: PricingPlan[]
  design: PricingPlan[]
}

export function usePricingSync() {
  const [pricingData, setPricingData] = useState<PricingData>({
    bots: [],
    sites: [],
    design: []
  })
  const [loading, setLoading] = useState(true)

  // Carregar dados do Firebase na inicialização
  useEffect(() => {
    const loadPricingData = async () => {
      if (!db) return

      try {
        const pricingRef = collection(db, 'pricing')
        const q = query(pricingRef, orderBy('createdAt', 'desc'))
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const bots: PricingPlan[] = []
          const sites: PricingPlan[] = []
          const design: PricingPlan[] = []

          snapshot.forEach((doc) => {
            const data = doc.data() as PricingPlan
            const plan = { ...data, id: doc.id }

            switch (data.type) {
              case 'bot':
                bots.push(plan)
                break
              case 'site':
                sites.push(plan)
                break
              case 'design':
                design.push(plan)
                break
            }
          })

          setPricingData({ bots, sites, design })
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error('Erro ao carregar dados de preços:', error)
        setLoading(false)
      }
    }

    loadPricingData()
  }, [])

  // Função para atualizar preços
  const updatePricing = async (service: keyof PricingData, id: string, field: keyof PricingPlan, value: any) => {
    if (!db) return

    try {
      const docRef = doc(db, 'pricing', id)
      await updateDoc(docRef, {
        [field]: value,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Erro ao atualizar preço:', error)
    }
  }

  // Função para adicionar novo plano
  const addPlan = async (service: keyof PricingData, plan: Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!db) return

    try {
      const newPlan = {
        ...plan,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      await addDoc(collection(db, 'pricing'), newPlan)
    } catch (error) {
      console.error('Erro ao adicionar plano:', error)
    }
  }

  // Função para remover plano
  const removePlan = async (service: keyof PricingData, id: string) => {
    if (!db) return

    try {
      await deleteDoc(doc(db, 'pricing', id))
    } catch (error) {
      console.error('Erro ao remover plano:', error)
    }
  }

  // Função para obter apenas planos ativos
  const getActivePlans = (service: keyof PricingData) => {
    return pricingData[service].filter(plan => plan.active)
  }

  return {
    pricingData,
    updatePricing,
    addPlan,
    removePlan,
    getActivePlans,
    loading
  }
}
