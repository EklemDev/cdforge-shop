import { useState, useEffect } from 'react'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrders } from './useOrders'
import { useContacts } from './useContacts'
import { usePricingSync } from './usePricingSync'

export interface Analytics {
  id: string
  type: 'page_view' | 'order_submitted' | 'contact_submitted' | 'pricing_viewed' | 'bot_viewed'
  page: string
  userAgent: string
  ipAddress: string
  referrer: string
  timestamp: any
  metadata?: any
}

export interface SalesReport {
  id: string
  period: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: any
  endDate: any
  totalOrders: number
  totalRevenue: number
  completedOrders: number
  pendingOrders: number
  averageOrderValue: number
  topServices: Array<{
    service: string
    count: number
    revenue: number
  }>
  createdAt: any
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics[]>([])
  const [salesReports, setSalesReports] = useState<SalesReport[]>([])
  const [loading, setLoading] = useState(true)
  
  const { orders } = useOrders()
  const { contacts } = useContacts()
  const { pricingData } = usePricingSync()

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!db) return

      try {
        const analyticsRef = collection(db, 'analytics')
        const q = query(analyticsRef, orderBy('timestamp', 'desc'))
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const analyticsData: Analytics[] = []
          snapshot.forEach((doc) => {
            const data = doc.data() as Analytics
            analyticsData.push({ ...data, id: doc.id })
          })
          setAnalytics(analyticsData)
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error('Erro ao carregar analytics:', error)
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const trackEvent = async (event: Omit<Analytics, 'id' | 'timestamp'>) => {
    if (!db) return null

    try {
      const newEvent = {
        ...event,
        timestamp: new Date()
      }
      
      const docRef = await addDoc(collection(db, 'analytics'), newEvent)
      return docRef.id
    } catch (error) {
      console.error('Erro ao registrar evento:', error)
      return null
    }
  }

  const generateSalesReport = async (period: SalesReport['period'], startDate: Date, endDate: Date) => {
    if (!db) return null

    try {
      // Filtrar pedidos pelo período
      const periodOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt.toDate())
        return orderDate >= startDate && orderDate <= endDate
      })

      // Calcular estatísticas
      const totalOrders = periodOrders.length
      const completedOrders = periodOrders.filter(order => order.status === 'completed').length
      const pendingOrders = periodOrders.filter(order => order.status === 'pending').length
      
      // Calcular receita total
      const totalRevenue = periodOrders.reduce((sum, order) => {
        const budget = parseFloat(order.budget) || 0
        return sum + budget
      }, 0)

      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Top serviços
      const serviceCounts: { [key: string]: { count: number, revenue: number } } = {}
      periodOrders.forEach(order => {
        const service = order.category
        const budget = parseFloat(order.budget) || 0
        
        if (!serviceCounts[service]) {
          serviceCounts[service] = { count: 0, revenue: 0 }
        }
        serviceCounts[service].count++
        serviceCounts[service].revenue += budget
      })

      const topServices = Object.entries(serviceCounts)
        .map(([service, data]) => ({
          service,
          count: data.count,
          revenue: data.revenue
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)

      const report: Omit<SalesReport, 'id' | 'createdAt'> = {
        period,
        startDate,
        endDate,
        totalOrders,
        totalRevenue,
        completedOrders,
        pendingOrders,
        averageOrderValue,
        topServices
      }

      const docRef = await addDoc(collection(db, 'salesReports'), {
        ...report,
        createdAt: new Date()
      })

      return docRef.id
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      return null
    }
  }

  const getDashboardStats = () => {
    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Pedidos dos últimos 30 dias
    const recentOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt.toDate())
      return orderDate >= last30Days
    })

    // Contatos dos últimos 7 dias
    const recentContacts = contacts.filter(contact => {
      const contactDate = new Date(contact.createdAt.toDate())
      return contactDate >= last7Days
    })

    // Receita dos últimos 30 dias
    const recentRevenue = recentOrders.reduce((sum, order) => {
      const budget = parseFloat(order.budget) || 0
      return sum + budget
    }, 0)

    // Taxa de conclusão
    const completedOrders = orders.filter(order => order.status === 'completed').length
    const completionRate = orders.length > 0 ? (completedOrders / orders.length) * 100 : 0

    return {
      totalOrders: orders.length,
      totalContacts: contacts.length,
      totalRevenue: orders.reduce((sum, order) => sum + (parseFloat(order.budget) || 0), 0),
      recentOrders: recentOrders.length,
      recentContacts: recentContacts.length,
      recentRevenue,
      completionRate: Math.round(completionRate),
      activeServices: pricingData.bots.filter(p => p.active).length + 
                     pricingData.sites.filter(p => p.active).length + 
                     pricingData.design.filter(p => p.active).length
    }
  }

  const getPageViews = (page?: string) => {
    if (page) {
      return analytics.filter(event => event.type === 'page_view' && event.page === page).length
    }
    return analytics.filter(event => event.type === 'page_view').length
  }

  const getConversionRate = () => {
    const pageViews = getPageViews()
    const orders = analytics.filter(event => event.type === 'order_submitted').length
    return pageViews > 0 ? (orders / pageViews) * 100 : 0
  }

  return {
    analytics,
    salesReports,
    loading,
    trackEvent,
    generateSalesReport,
    getDashboardStats,
    getPageViews,
    getConversionRate
  }
}


