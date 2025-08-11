import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

// Check if Firebase is properly initialized
const checkFirebase = () => {
  if (!db) {
    throw new Error('Firebase não está configurado. Verifique as variáveis de ambiente.')
  }
}

// Tipos de dados
export interface ClientData {
  id?: string
  name: string
  email?: string
  phone?: string
  discord?: string
  instagram?: string
  projectType: 'bot' | 'site' | 'design' | 'service' | 'custom'
  projectDetails: {
    types?: string[]
    platform?: string
    description: string
    features?: string[]
    budget: string
    deadline: string
  }
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  createdAt: any
  updatedAt: any
  assignedTo?: 'MELKE' | 'ZANESCO'
  notes?: string
  totalValue?: number
}

export interface BotRequest extends ClientData {
  projectType: 'bot'
  projectDetails: {
    types: string[]
    platform: string
    description: string
    features: string[]
    budget: string
    deadline: string
  }
}

export interface SiteRequest extends ClientData {
  projectType: 'site'
  projectDetails: {
    description: string
    features: string[]
    budget: string
    deadline: string
    siteType?: 'ecommerce' | 'corporate' | 'personal' | 'custom'
  }
}

export interface DesignRequest extends ClientData {
  projectType: 'design'
  projectDetails: {
    description: string
    features: string[]
    budget: string
    deadline: string
    designType?: 'identity' | 'uiux' | 'app' | 'motion'
  }
}

// Serviços para Clientes
export const clientService = {
  // Criar novo cliente
  async createClient(data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      checkFirebase()
      const docRef = await addDoc(collection(db!, 'clients'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'pending',
        priority: 'medium'
      })
      return docRef.id
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      throw error
    }
  },

  // Buscar todos os clientes
  async getAllClients(): Promise<ClientData[]> {
    try {
      checkFirebase()
      const querySnapshot = await getDocs(collection(db!, 'clients'))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientData[]
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      throw error
    }
  },

  // Buscar cliente por ID
  async getClientById(id: string): Promise<ClientData | null> {
    try {
      checkFirebase()
      const docRef = doc(db!, 'clients', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ClientData
      }
      return null
    } catch (error) {
      console.error('Erro ao buscar cliente:', error)
      throw error
    }
  },

  // Atualizar cliente
  async updateClient(id: string, data: Partial<ClientData>): Promise<void> {
    try {
      checkFirebase()
      const docRef = doc(db!, 'clients', id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      throw error
    }
  },

  // Deletar cliente
  async deleteClient(id: string): Promise<void> {
    try {
      checkFirebase()
      const docRef = doc(db!, 'clients', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      throw error
    }
  },

  // Buscar clientes por status
  async getClientsByStatus(status: ClientData['status']): Promise<ClientData[]> {
    try {
      checkFirebase()
      const q = query(
        collection(db!, 'clients'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientData[]
    } catch (error) {
      console.error('Erro ao buscar clientes por status:', error)
      throw error
    }
  },

  // Buscar clientes por desenvolvedor
  async getClientsByDeveloper(developer: 'MELKE' | 'ZANESCO'): Promise<ClientData[]> {
    try {
      checkFirebase()
      const q = query(
        collection(db!, 'clients'),
        where('assignedTo', '==', developer),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientData[]
    } catch (error) {
      console.error('Erro ao buscar clientes por desenvolvedor:', error)
      throw error
    }
  },

  // Buscar clientes por tipo de projeto
  async getClientsByProjectType(projectType: ClientData['projectType']): Promise<ClientData[]> {
    try {
      checkFirebase()
      const q = query(
        collection(db!, 'clients'),
        where('projectType', '==', projectType),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientData[]
    } catch (error) {
      console.error('Erro ao buscar clientes por tipo de projeto:', error)
      throw error
    }
  }
}

// Serviços específicos para Bots
export const botService = {
  async createBotRequest(data: Omit<BotRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return clientService.createClient({
      ...data,
      projectType: 'bot'
    })
  },

  async getAllBotRequests(): Promise<BotRequest[]> {
    const clients = await clientService.getClientsByProjectType('bot')
    return clients as BotRequest[]
  }
}

// Serviços específicos para Sites
export const siteService = {
  async createSiteRequest(data: Omit<SiteRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return clientService.createClient({
      ...data,
      projectType: 'site'
    })
  },

  async getAllSiteRequests(): Promise<SiteRequest[]> {
    const clients = await clientService.getClientsByProjectType('site')
    return clients as SiteRequest[]
  }
}

// Serviços específicos para Design
export const designService = {
  async createDesignRequest(data: Omit<DesignRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return clientService.createClient({
      ...data,
      projectType: 'design'
    })
  },

  async getAllDesignRequests(): Promise<DesignRequest[]> {
    const clients = await clientService.getClientsByProjectType('design')
    return clients as DesignRequest[]
  }
}

// Estatísticas
export const statsService = {
  async getProjectStats() {
    try {
      const allClients = await clientService.getAllClients()
      
      const stats = {
        total: allClients.length,
        pending: allClients.filter(c => c.status === 'pending').length,
        inProgress: allClients.filter(c => c.status === 'in_progress').length,
        completed: allClients.filter(c => c.status === 'completed').length,
        cancelled: allClients.filter(c => c.status === 'cancelled').length,
        bots: allClients.filter(c => c.projectType === 'bot').length,
        sites: allClients.filter(c => c.projectType === 'site').length,
        design: allClients.filter(c => c.projectType === 'design').length,
        services: allClients.filter(c => c.projectType === 'service').length,
        custom: allClients.filter(c => c.projectType === 'custom').length,
        melke: allClients.filter(c => c.assignedTo === 'MELKE').length,
        zanesco: allClients.filter(c => c.assignedTo === 'ZANESCO').length,
        totalValue: allClients.reduce((sum, c) => sum + (c.totalValue || 0), 0)
      }
      
      return stats
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      throw error
    }
  }
}
