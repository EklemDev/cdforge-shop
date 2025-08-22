"use client"

import { useState, useEffect } from "react"
import FirebaseDataService from "@/lib/firebase-data-service"

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  originalPrice?: number
  features: string[]
  limitations: string[]
  type: 'basic' | 'pro' | 'enterprise'
  category: string
  popular: boolean
  active: boolean
  order: number
  testDays: number
  contacts: {
    melke: string
    zanesco: string
    pedro: string
  }
  promotion: {
    active: boolean
    type: 'percentage' | 'fixed'
    value: number
    description: string
  }
  createdAt: any
  updatedAt: any
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const firebaseService = FirebaseDataService.getInstance()

  // Carregar planos iniciais
  useEffect(() => {
    loadPlans()
  }, [])

  // Configurar listener em tempo real
  useEffect(() => {
    const unsubscribe = firebaseService.onPlansChange((plans) => {
      setPlans(plans)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loadPlans = async () => {
    try {
      setLoading(true)
      const plansData = await firebaseService.getPlans()
      setPlans(plansData)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar planos')
      console.error('Erro ao carregar planos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPlan = async (planData: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Validar limite de 3 planos ativos
      const activePlans = plans.filter(p => p.active)
      if (activePlans.length >= 3) {
        throw new Error('Limite máximo de 3 planos ativos atingido')
      }

      const newPlan = await firebaseService.addPlan(planData)
      return newPlan
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar plano')
      throw err
    }
  }

  const updatePlan = async (planId: string, updates: Partial<Plan>) => {
    try {
      // Se está ativando um plano, verificar limite
      if (updates.active === true) {
        const activePlans = plans.filter(p => p.active && p.id !== planId)
        if (activePlans.length >= 3) {
          throw new Error('Limite máximo de 3 planos ativos atingido')
        }
      }

      await firebaseService.updatePlan(planId, updates)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar plano')
      throw err
    }
  }

  const deletePlan = async (planId: string) => {
    try {
      await firebaseService.deletePlan(planId)
      setError(null)
    } catch (err) {
      setError('Erro ao deletar plano')
      throw err
    }
  }

  const togglePlanActive = async (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (!plan) return

    try {
      await updatePlan(planId, { active: !plan.active })
    } catch (err) {
      // Erro já tratado em updatePlan
      throw err
    }
  }

  const togglePromotion = async (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (!plan) return

    try {
      await updatePlan(planId, {
        promotion: {
          ...plan.promotion,
          active: !plan.promotion.active
        }
      })
    } catch (err) {
      throw err
    }
  }

  return {
    plans,
    loading,
    error,
    addPlan,
    updatePlan,
    deletePlan,
    togglePlanActive,
    togglePromotion,
    refresh: loadPlans
  }
}
