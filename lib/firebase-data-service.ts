import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp,
  where
} from 'firebase/firestore'
import { db } from './firebase'

// Interfaces
export interface SiteConfig {
  id: string
  // Informações de Contato
  discordLink: string
  phone: string
  email: string
  instagram: string
  whatsapp: string
  
  // Informações da Empresa
  companyName: string
  companyDescription: string
  address: string
  city: string
  state: string
  country: string
  
  // Configurações do Site
  maintenanceMode: boolean
  orderNotifications: boolean
  autoBackup: boolean
  
  // SEO e Meta
  siteTitle: string
  siteDescription: string
  keywords: string
  
  // Social Media
  facebook: string
  twitter: string
  linkedin: string
  youtube: string
  
  // Configurações de Negócio
  businessHours: string
  timezone: string
  currency: string
  
  updatedAt: any
}

export interface BotCategory {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

export interface SiteCategory {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

export interface BotType {
  id: string
  name: string
  description: string
  features: string[]
  categoryId: string
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

export interface ProjectType {
  id: string
  name: string
  description: string
  features: string[]
  categoryId: string
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

export interface CustomizationOption {
  id: string
  name: string
  description: string
  type: 'bot' | 'site' | 'general'
  options: string[]
  required: boolean
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

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

export interface Pricing {
  id: string
  name: string
  price: number
  currency: string
  originalPrice?: number
  features: string[]
  type: 'bot' | 'site' | 'service' | 'design'
  category: string
  description: string
  popular: boolean
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

export interface Service {
  id: string
  name: string
  description: string
  shortDescription: string
  icon: string
  type: 'bot' | 'site' | 'design' | 'service'
  category: string
  features: string[]
  benefits: string[]
  process: string[]
  examples: string[]
  active: boolean
  order: number
  createdAt: any
  updatedAt: any
}

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
  createdAt: any
  updatedAt: any
}

class FirebaseDataService {
  private static instance: FirebaseDataService

  private constructor() {}

  static getInstance(): FirebaseDataService {
    if (!FirebaseDataService.instance) {
      FirebaseDataService.instance = new FirebaseDataService()
    }
    return FirebaseDataService.instance
  }

  // ===== SITE CONFIG =====
  async getSiteConfig(): Promise<SiteConfig | null> {
    try {
      const docRef = doc(db!, 'siteConfig', 'main')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as SiteConfig
      }
      
      // Criar configuração padrão se não existir
      const defaultConfig: SiteConfig = {
        id: 'main',
        // Informações de Contato
        discordLink: 'https://discord.gg/jp2BzA4H',
        phone: '(11) 99999-9999',
        email: 'contato@codeforge.dev',
        instagram: '@codeforge.dev',
        whatsapp: 'https://wa.me/5511966485110',
        
        // Informações da Empresa
        companyName: 'CodeForge',
        companyDescription: 'Transformando ideias em soluções digitais inovadoras.',
        address: '',
        city: '',
        state: '',
        country: 'Brasil',
        
        // Configurações do Site
        maintenanceMode: false,
        orderNotifications: true,
        autoBackup: true,
        
        // SEO e Meta
        siteTitle: 'CodeForge - Desenvolvimento de Bots e Sites',
        siteDescription: 'Especialistas em desenvolvimento de bots para Discord e WhatsApp, sites e design.',
        keywords: 'bots, discord, whatsapp, sites, desenvolvimento, design',
        
        // Social Media
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        
        // Configurações de Negócio
        businessHours: 'Segunda a Sexta, 9h às 18h',
        timezone: 'America/Sao_Paulo',
        currency: 'BRL',
        
        updatedAt: serverTimestamp()
      }
      
      await this.updateSiteConfig(defaultConfig)
      return defaultConfig
    } catch (error) {
      console.error('Erro ao buscar configuração do site:', error)
      return null
    }
  }

  async updateSiteConfig(config: Partial<SiteConfig>): Promise<boolean> {
    try {
      console.log('🔄 Atualizando SiteConfig:', config)
      const docRef = doc(db!, 'siteConfig', 'main')
      await setDoc(docRef, {
        ...config,
        updatedAt: serverTimestamp()
      }, { merge: true })
      console.log('✅ SiteConfig atualizado com sucesso')
      return true
    } catch (error) {
      console.error('❌ Erro ao atualizar configuração do site:', error)
      return false
    }
  }

  // ===== BOT CATEGORIES =====
  async getBotCategories(): Promise<BotCategory[]> {
    try {
      const q = query(
        collection(db!, 'botCategories'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BotCategory[]
    } catch (error) {
      console.error('Erro ao buscar categorias de bots:', error)
      return []
    }
  }

  async addBotCategory(category: Omit<BotCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'botCategories'), {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar categoria de bot:', error)
      return null
    }
  }

  async updateBotCategory(id: string, category: Partial<BotCategory>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'botCategories', id)
      await updateDoc(docRef, {
        ...category,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar categoria de bot:', error)
      return false
    }
  }

  async deleteBotCategory(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'botCategories', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar categoria de bot:', error)
      return false
    }
  }

  // ===== SITE CATEGORIES =====
  async getSiteCategories(): Promise<SiteCategory[]> {
    try {
      const q = query(
        collection(db!, 'siteCategories'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SiteCategory[]
    } catch (error) {
      console.error('Erro ao buscar categorias de sites:', error)
      return []
    }
  }

  async addSiteCategory(category: Omit<SiteCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'siteCategories'), {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar categoria de site:', error)
      return null
    }
  }

  async updateSiteCategory(id: string, category: Partial<SiteCategory>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'siteCategories', id)
      await updateDoc(docRef, {
        ...category,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar categoria de site:', error)
      return false
    }
  }

  async deleteSiteCategory(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'siteCategories', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar categoria de site:', error)
      return false
    }
  }

  // ===== BOT TYPES =====
  async getBotTypes(): Promise<BotType[]> {
    try {
      const q = query(
        collection(db!, 'botTypes'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BotType[]
    } catch (error) {
      console.error('Erro ao buscar tipos de bots:', error)
      return []
    }
  }

  async addBotType(botType: Omit<BotType, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'botTypes'), {
        ...botType,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar tipo de bot:', error)
      return null
    }
  }

  async updateBotType(id: string, botType: Partial<BotType>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'botTypes', id)
      await updateDoc(docRef, {
        ...botType,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar tipo de bot:', error)
      return false
    }
  }

  async deleteBotType(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'botTypes', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar tipo de bot:', error)
      return false
    }
  }

  // ===== PROJECT TYPES =====
  async getProjectTypes(): Promise<ProjectType[]> {
    try {
      const q = query(
        collection(db!, 'projectTypes'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProjectType[]
    } catch (error) {
      console.error('Erro ao buscar tipos de projetos:', error)
      return []
    }
  }

  async addProjectType(projectType: Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'projectTypes'), {
        ...projectType,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar tipo de projeto:', error)
      return null
    }
  }

  async updateProjectType(id: string, projectType: Partial<ProjectType>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'projectTypes', id)
      await updateDoc(docRef, {
        ...projectType,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar tipo de projeto:', error)
      return false
    }
  }

  async deleteProjectType(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'projectTypes', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar tipo de projeto:', error)
      return false
    }
  }

  // ===== CUSTOMIZATION OPTIONS =====
  async getCustomizationOptions(): Promise<CustomizationOption[]> {
    try {
      const q = query(
        collection(db!, 'customizationOptions'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CustomizationOption[]
    } catch (error) {
      console.error('Erro ao buscar opções de personalização:', error)
      return []
    }
  }

  async addCustomizationOption(option: Omit<CustomizationOption, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'customizationOptions'), {
        ...option,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar opção de personalização:', error)
      return null
    }
  }

  async updateCustomizationOption(id: string, option: Partial<CustomizationOption>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'customizationOptions', id)
      await updateDoc(docRef, {
        ...option,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar opção de personalização:', error)
      return false
    }
  }

  async deleteCustomizationOption(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'customizationOptions', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar opção de personalização:', error)
      return false
    }
  }

  // ===== ORDERS =====
  async getOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db!, 'orders'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[]
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      return []
    }
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'orders'), {
        ...order,
        status: 'pending',
        priority: 'medium',
        assignedTo: '',
        notes: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error)
      return null
    }
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'orders', id)
      await updateDoc(docRef, {
        ...order,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      return false
    }
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'orders', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar pedido:', error)
      return false
    }
  }

  // ===== PRICING =====
  async getPricing(): Promise<Pricing[]> {
    try {
      const q = query(
        collection(db!, 'pricing'),
        orderBy('order', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Pricing[]
    } catch (error) {
      console.error('Erro ao buscar preços:', error)
      return []
    }
  }

  async addPricing(pricing: Omit<Pricing, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db!, 'pricing'), {
        ...pricing,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar preço:', error)
      return null
    }
  }

  async updatePricing(id: string, pricing: Partial<Pricing>): Promise<boolean> {
    try {
      const docRef = doc(db!, 'pricing', id)
      await updateDoc(docRef, {
        ...pricing,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar preço:', error)
      return false
    }
  }

  async deletePricing(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db!, 'pricing', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar preço:', error)
      return false
    }
  }

  // ===== REAL-TIME LISTENERS =====
  onSiteConfigChange(callback: (config: SiteConfig | null) => void) {
    console.log('👂 Iniciando listener do SiteConfig...')
    return onSnapshot(doc(db!, 'siteConfig', 'main'), (doc) => {
      console.log('📡 Listener do SiteConfig disparado:', doc.exists() ? 'documento existe' : 'documento não existe')
      if (doc.exists()) {
        const configData = { id: doc.id, ...doc.data() } as SiteConfig
        console.log('📄 Dados do SiteConfig:', configData)
        callback(configData)
      } else {
        console.log('❌ Documento SiteConfig não encontrado')
        callback(null)
      }
    }, (error) => {
      console.error('❌ Erro no listener do SiteConfig:', error)
    })
  }

  onOrdersChange(callback: (orders: Order[]) => void) {
    const q = query(collection(db!, 'orders'), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[]
      callback(orders)
    })
  }

  onBotCategoriesChange(callback: (categories: BotCategory[]) => void) {
    const q = query(collection(db!, 'botCategories'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BotCategory[]
      callback(categories)
    })
  }

  onSiteCategoriesChange(callback: (categories: SiteCategory[]) => void) {
    const q = query(collection(db!, 'siteCategories'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SiteCategory[]
      callback(categories)
    })
  }

  onBotTypesChange(callback: (types: BotType[]) => void) {
    const q = query(collection(db!, 'botTypes'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const types = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BotType[]
      callback(types)
    })
  }

  onProjectTypesChange(callback: (types: ProjectType[]) => void) {
    const q = query(collection(db!, 'projectTypes'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const types = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProjectType[]
      callback(types)
    })
  }

  onCustomizationOptionsChange(callback: (options: CustomizationOption[]) => void) {
    const q = query(collection(db!, 'customizationOptions'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const options = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CustomizationOption[]
      callback(options)
    })
  }

  onPricingChange(callback: (pricing: Pricing[]) => void) {
    const q = query(collection(db!, 'pricing'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const pricing = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Pricing[]
      callback(pricing)
    })
  }

  // ===== SERVIÇOS =====
  async getServices(): Promise<Service[]> {
    if (!db) return []
    
    try {
      const querySnapshot = await getDocs(collection(db, 'services'))
      const services: Service[] = []
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() } as Service)
      })
      return services.sort((a, b) => a.order - b.order)
    } catch (error) {
      console.error('Erro ao buscar serviços:', error)
      return []
    }
  }

  async addService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    if (!db) return null
    
    try {
      const docRef = await addDoc(collection(db, 'services'), {
        ...service,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error)
      return null
    }
  }

  async updateService(id: string, service: Partial<Service>): Promise<boolean> {
    if (!db) return false
    
    try {
      await updateDoc(doc(db, 'services', id), {
        ...service,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error)
      return false
    }
  }

  async deleteService(id: string): Promise<boolean> {
    if (!db) return false
    
    try {
      await deleteDoc(doc(db, 'services', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar serviço:', error)
      return false
    }
  }

  onServicesChange(callback: (services: Service[]) => void) {
    if (!db) return () => {}
    
    const q = query(collection(db, 'services'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const services = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[]
      callback(services)
    })
  }

  // ===== PLANOS =====
  async getPlans(): Promise<Plan[]> {
    if (!db) return []
    
    try {
      const querySnapshot = await getDocs(collection(db, 'plans'))
      const plans: Plan[] = []
      querySnapshot.forEach((doc) => {
        plans.push({ id: doc.id, ...doc.data() } as Plan)
      })
      return plans.sort((a, b) => a.order - b.order)
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      return []
    }
  }

  async addPlan(plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    if (!db) return null
    
    try {
      const docRef = await addDoc(collection(db, 'plans'), {
        ...plan,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar plano:', error)
      return null
    }
  }

  async updatePlan(id: string, plan: Partial<Plan>): Promise<boolean> {
    if (!db) return false
    
    try {
      await updateDoc(doc(db, 'plans', id), {
        ...plan,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar plano:', error)
      return false
    }
  }

  async deletePlan(id: string): Promise<boolean> {
    if (!db) return false
    
    try {
      await deleteDoc(doc(db, 'plans', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar plano:', error)
      return false
    }
  }

  onPlansChange(callback: (plans: Plan[]) => void) {
    if (!db) return () => {}
    
    const q = query(collection(db, 'plans'), orderBy('order', 'asc'))
    return onSnapshot(q, (querySnapshot) => {
      const plans = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Plan[]
      callback(plans)
    })
  }
}

export default FirebaseDataService
