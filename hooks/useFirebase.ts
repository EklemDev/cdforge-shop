import { useState, useEffect } from 'react'
import { clientService, botService, siteService, designService, statsService, ClientData, BotRequest, SiteRequest, DesignRequest } from '@/lib/firebase-services'

export const useFirebase = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: any) => {
    console.error('Firebase Error:', err)
    setError(err.message || 'Erro desconhecido')
    setLoading(false)
  }

  const clearError = () => setError(null)

  return {
    loading,
    error,
    clearError,
    setLoading,
    handleError
  }
}

export const useClients = () => {
  const [clients, setClients] = useState<ClientData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await clientService.getAllClients()
      setClients(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    try {
      const id = await clientService.createClient(data)
      await fetchClients() // Recarregar lista
      return id
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateClient = async (id: string, data: Partial<ClientData>) => {
    setLoading(true)
    setError(null)
    try {
      await clientService.updateClient(id, data)
      await fetchClients() // Recarregar lista
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteClient = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await clientService.deleteClient(id)
      await fetchClients() // Recarregar lista
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient
  }
}

export const useBotRequests = () => {
  const [botRequests, setBotRequests] = useState<BotRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBotRequests = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await botService.getAllBotRequests()
      setBotRequests(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createBotRequest = async (data: Omit<BotRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    try {
      const id = await botService.createBotRequest(data)
      await fetchBotRequests() // Recarregar lista
      return id
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBotRequests()
  }, [])

  return {
    botRequests,
    loading,
    error,
    fetchBotRequests,
    createBotRequest
  }
}

export const useSiteRequests = () => {
  const [siteRequests, setSiteRequests] = useState<SiteRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSiteRequests = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await siteService.getAllSiteRequests()
      setSiteRequests(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createSiteRequest = async (data: Omit<SiteRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    try {
      const id = await siteService.createSiteRequest(data)
      await fetchSiteRequests() // Recarregar lista
      return id
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSiteRequests()
  }, [])

  return {
    siteRequests,
    loading,
    error,
    fetchSiteRequests,
    createSiteRequest
  }
}

export const useDesignRequests = () => {
  const [designRequests, setDesignRequests] = useState<DesignRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDesignRequests = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await designService.getAllDesignRequests()
      setDesignRequests(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createDesignRequest = async (data: Omit<DesignRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    try {
      const id = await designService.createDesignRequest(data)
      await fetchDesignRequests() // Recarregar lista
      return id
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDesignRequests()
  }, [])

  return {
    designRequests,
    loading,
    error,
    fetchDesignRequests,
    createDesignRequest
  }
}

export const useServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchServiceRequests = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await clientService.getClientsByProjectType('service')
      setServiceRequests(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createServiceRequest = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const id = await clientService.createClient(data)
      await fetchServiceRequests() // Recarregar lista
      return id
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServiceRequests()
  }, [])

  return {
    serviceRequests,
    loading,
    error,
    fetchServiceRequests,
    createServiceRequest
  }
}

export const useStats = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await statsService.getProjectStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}
