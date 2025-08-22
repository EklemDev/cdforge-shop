"use client"

import { useState, useEffect } from 'react'
import FirebaseDataService, { 
  SiteConfig, 
  BotCategory, 
  SiteCategory, 
  BotType, 
  ProjectType, 
  CustomizationOption, 
  Order, 
  Pricing,
  MainCategory,
  BotFeature,
  BotConfig,
  DevKey,
  Service,
  Plan,
  Founder
} from '@/lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onSiteConfigChange((newConfig) => {
      setConfig(newConfig)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const updateConfig = async (updates: Partial<SiteConfig>) => {
    try {
      setError(null)
      const success = await firebaseService.updateSiteConfig(updates)
      if (!success) {
        setError('Erro ao atualizar configuração')
      }
      return success
    } catch (err) {
      console.error('Erro ao atualizar configuração:', err)
      setError('Erro ao atualizar configuração')
      return false
    }
  }

  return { config, loading, error, updateConfig }
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onOrdersChange((newOrders) => {
      setOrders(newOrders)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addOrder(order)
      return id
    } catch (err) {
      setError('Erro ao adicionar pedido')
      return null
    }
  }

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      setError(null)
      const success = await firebaseService.updateOrder(id, updates)
      if (!success) {
        setError('Erro ao atualizar pedido')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar pedido')
      return false
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteOrder(id)
      if (!success) {
        setError('Erro ao deletar pedido')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar pedido')
      return false
    }
  }

  return { orders, loading, error, addOrder, updateOrder, deleteOrder }
}

export function useBotCategories() {
  const [categories, setCategories] = useState<BotCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onBotCategoriesChange((newCategories) => {
      setCategories(newCategories)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addCategory = async (category: Omit<BotCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addBotCategory(category)
      return id
    } catch (err) {
      setError('Erro ao adicionar categoria')
      return null
    }
  }

  const updateCategory = async (id: string, updates: Partial<BotCategory>) => {
    try {
      setError(null)
      const success = await firebaseService.updateBotCategory(id, updates)
      if (!success) {
        setError('Erro ao atualizar categoria')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar categoria')
      return false
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteBotCategory(id)
      if (!success) {
        setError('Erro ao deletar categoria')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar categoria')
      return false
    }
  }

  return { categories, loading, error, addCategory, updateCategory, deleteCategory }
}

export function useSiteCategories() {
  const [categories, setCategories] = useState<SiteCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onSiteCategoriesChange((newCategories) => {
      setCategories(newCategories)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addCategory = async (category: Omit<SiteCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addSiteCategory(category)
      return id
    } catch (err) {
      setError('Erro ao adicionar categoria')
      return null
    }
  }

  const updateCategory = async (id: string, updates: Partial<SiteCategory>) => {
    try {
      setError(null)
      const success = await firebaseService.updateSiteCategory(id, updates)
      if (!success) {
        setError('Erro ao atualizar categoria')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar categoria')
      return false
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteSiteCategory(id)
      if (!success) {
        setError('Erro ao deletar categoria')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar categoria')
      return false
    }
  }

  return { categories, loading, error, addCategory, updateCategory, deleteCategory }
}

export function useBotTypes() {
  const [types, setTypes] = useState<BotType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onBotTypesChange((newTypes) => {
      setTypes(newTypes)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addType = async (type: Omit<BotType, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addBotType(type)
      return id
    } catch (err) {
      setError('Erro ao adicionar tipo')
      return null
    }
  }

  const updateType = async (id: string, updates: Partial<BotType>) => {
    try {
      setError(null)
      const success = await firebaseService.updateBotType(id, updates)
      if (!success) {
        setError('Erro ao atualizar tipo')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar tipo')
      return false
    }
  }

  const deleteType = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteBotType(id)
      if (!success) {
        setError('Erro ao deletar tipo')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar tipo')
      return false
    }
  }

  return { types, loading, error, addType, updateType, deleteType }
}

export function useProjectTypes() {
  const [types, setTypes] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onProjectTypesChange((newTypes) => {
      setTypes(newTypes)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addType = async (type: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addProjectType(type)
      return id
    } catch (err) {
      setError('Erro ao adicionar tipo')
      return null
    }
  }

  const updateType = async (id: string, updates: Partial<ProjectType>) => {
    try {
      setError(null)
      const success = await firebaseService.updateProjectType(id, updates)
      if (!success) {
        setError('Erro ao atualizar tipo')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar tipo')
      return false
    }
  }

  const deleteType = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteProjectType(id)
      if (!success) {
        setError('Erro ao deletar tipo')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar tipo')
      return false
    }
  }

  return { types, loading, error, addType, updateType, deleteType }
}

export function useCustomizationOptions() {
  const [options, setOptions] = useState<CustomizationOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onCustomizationOptionsChange((newOptions) => {
      setOptions(newOptions)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addOption = async (option: Omit<CustomizationOption, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addCustomizationOption(option)
      return id
    } catch (err) {
      setError('Erro ao adicionar opção')
      return null
    }
  }

  const updateOption = async (id: string, updates: Partial<CustomizationOption>) => {
    try {
      setError(null)
      const success = await firebaseService.updateCustomizationOption(id, updates)
      if (!success) {
        setError('Erro ao atualizar opção')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar opção')
      return false
    }
  }

  const deleteOption = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteCustomizationOption(id)
      if (!success) {
        setError('Erro ao deletar opção')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar opção')
      return false
    }
  }

  return { options, loading, error, addOption, updateOption, deleteOption }
}

export function usePricing() {
  const [pricing, setPricing] = useState<Pricing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onPricingChange((newPricing) => {
      setPricing(newPricing)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addPricing = async (pricingItem: Omit<Pricing, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addPricing(pricingItem)
      return id
    } catch (err) {
      setError('Erro ao adicionar preço')
      return null
    }
  }

  const updatePricing = async (id: string, updates: Partial<Pricing>) => {
    try {
      setError(null)
      const success = await firebaseService.updatePricing(id, updates)
      if (!success) {
        setError('Erro ao atualizar preço')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar preço')
      return false
    }
  }

  const deletePricing = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deletePricing(id)
      if (!success) {
        setError('Erro ao deletar preço')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar preço')
      return false
    }
  }

  return { pricing, loading, error, addPricing, updatePricing, deletePricing }
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onServicesChange((newServices) => {
      setServices(newServices)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addService = async (serviceItem: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addService(serviceItem)
      return id
    } catch (err) {
      setError('Erro ao adicionar serviço')
      return null
    }
  }

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      setError(null)
      const success = await firebaseService.updateService(id, updates)
      if (!success) {
        setError('Erro ao atualizar serviço')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar serviço')
      return false
    }
  }

  const deleteService = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteService(id)
      if (!success) {
        setError('Erro ao deletar serviço')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar serviço')
      return false
    }
  }

  return { services, loading, error, addService, updateService, deleteService }
}

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onPlansChange((newPlans) => {
      setPlans(newPlans)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addPlan = async (planItem: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addPlan(planItem)
      return id
    } catch (err) {
      setError('Erro ao adicionar plano')
      return null
    }
  }

  const updatePlan = async (id: string, updates: Partial<Plan>) => {
    try {
      setError(null)
      const success = await firebaseService.updatePlan(id, updates)
      if (!success) {
        setError('Erro ao atualizar plano')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar plano')
      return false
    }
  }

  const deletePlan = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deletePlan(id)
      if (!success) {
        setError('Erro ao deletar plano')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar plano')
      return false
    }
  }

  return { plans, loading, error, addPlan, updatePlan, deletePlan }
}

export function useMainCategories() {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Carregar dados iniciais
    const loadInitialData = async () => {
      try {
        const initialData = await firebaseService.getMainCategories()

        setCategories(initialData.filter(cat => cat.active))
        setLoading(false)
        setError(null)
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err)
        setError('Erro ao carregar categorias')
        setLoading(false)
      }
    }

    loadInitialData()

    // Configurar listener em tempo real
    const unsubscribe = firebaseService.onMainCategoriesSnapshot((data) => {

      setCategories(data.filter(cat => cat.active))
      setLoading(false)
      setError(null)
    })

    return unsubscribe
  }, [])

  const addMainCategory = async (category: Omit<MainCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await firebaseService.addMainCategory(category)
    } catch (err) {
      setError('Erro ao adicionar categoria')
      throw err
    }
  }

  const updateMainCategory = async (id: string, category: Partial<MainCategory>) => {
    try {
      await firebaseService.updateMainCategory(id, category)
    } catch (err) {
      setError('Erro ao atualizar categoria')
      throw err
    }
  }

  const deleteMainCategory = async (id: string) => {
    try {
      await firebaseService.deleteMainCategory(id)
    } catch (err) {
      setError('Erro ao deletar categoria')
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    addMainCategory,
    updateMainCategory,
    deleteMainCategory,
  }
}

export function useBotFeatures() {
  const [features, setFeatures] = useState<BotFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onBotFeaturesSnapshot((data) => {
      setFeatures(data.filter(feature => feature.enabled))
      setLoading(false)
      setError(null)
    })

    return unsubscribe
  }, [])

  const addBotFeature = async (feature: Omit<BotFeature, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await firebaseService.addBotFeature(feature)
    } catch (err) {
      setError('Erro ao adicionar funcionalidade')
      throw err
    }
  }

  const updateBotFeature = async (id: string, feature: Partial<BotFeature>) => {
    try {
      await firebaseService.updateBotFeature(id, feature)
    } catch (err) {
      setError('Erro ao atualizar funcionalidade')
      throw err
    }
  }

  const deleteBotFeature = async (id: string) => {
    try {
      await firebaseService.deleteBotFeature(id)
    } catch (err) {
      setError('Erro ao deletar funcionalidade')
      throw err
    }
  }

  return {
    features,
    loading,
    error,
    addBotFeature,
    updateBotFeature,
    deleteBotFeature,
  }
}

export function useBotConfig() {
  const [config, setConfig] = useState<BotConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onBotConfigSnapshot((data) => {
      setConfig(data)
      setLoading(false)
      setError(null)
    })

    return unsubscribe
  }, [])

  const updateBotConfig = async (config: Partial<BotConfig>) => {
    try {
      await firebaseService.updateBotConfig(config)
    } catch (err) {
      setError('Erro ao atualizar configuração do bot')
      throw err
    }
  }

  return {
    config,
    loading,
    error,
    updateBotConfig,
  }
}

export function useDevKeys() {
  const [keys, setKeys] = useState<DevKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = firebaseService.onDevKeysSnapshot((data) => {
      setKeys(data)
      setLoading(false)
      setError(null)
    })

    return unsubscribe
  }, [])

  const addDevKey = async (key: Omit<DevKey, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addDevKey(key)
      return id
    } catch (err) {
      setError('Erro ao adicionar chave de dev')
      return null
    }
  }

  const updateDevKey = async (id: string, key: Partial<DevKey>) => {
    try {
      setError(null)
      const success = await firebaseService.updateDevKey(id, key)
      if (!success) {
        setError('Erro ao atualizar chave de dev')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar chave de dev')
      return false
    }
  }

  const deleteDevKey = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteDevKey(id)
      if (!success) {
        setError('Erro ao deletar chave de dev')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar chave de dev')
      return false
    }
  }

  const logDevKeyUsage = async (keyId: string) => {
    try {
      await firebaseService.logDevKeyUsage(keyId)
    } catch (err) {
      console.error('Erro ao registrar uso da chave:', err)
    }
  }

  return {
    keys,
    loading,
    error,
    addDevKey,
    updateDevKey,
    deleteDevKey,
    logDevKeyUsage,
  }
}

export function useFounders() {
  const [founders, setFounders] = useState<Founder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    
    const unsubscribe = firebaseService.onFoundersChange((newFounders) => {
      if (isMounted) {
        // Otimização: Filtro memoizado para evitar recálculos desnecessários
        const activeFounders = newFounders.filter(founder => founder.active)
        setFounders(activeFounders)
        setLoading(false)
        setError(null)
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  const addFounder = async (founder: Omit<Founder, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null)
      const id = await firebaseService.addFounder(founder)
      return id
    } catch (err) {
      setError('Erro ao adicionar fundador')
      return null
    }
  }

  const updateFounder = async (id: string, updates: Partial<Founder>) => {
    try {
      setError(null)
      const success = await firebaseService.updateFounder(id, updates)
      if (!success) {
        setError('Erro ao atualizar fundador')
      }
      return success
    } catch (err) {
      setError('Erro ao atualizar fundador')
      return false
    }
  }

  const deleteFounder = async (id: string) => {
    try {
      setError(null)
      const success = await firebaseService.deleteFounder(id)
      if (!success) {
        setError('Erro ao deletar fundador')
      }
      return success
    } catch (err) {
      setError('Erro ao deletar fundador')
      return false
    }
  }

  return { founders, loading, error, addFounder, updateFounder, deleteFounder }
}
