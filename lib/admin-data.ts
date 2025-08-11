// Sistema de gerenciamento de dados para o painel administrativo
export interface SiteConfig {
  discordLink: string
  contactInfo: {
    phone: string
    email: string
    instagram: string
  }
  botCategories: BotCategory[]
  siteCategories: SiteCategory[]
  botTypes: BotType[]
  projectTypes: ProjectType[]
  customizationOptions: CustomizationOption[]
}

export interface BotCategory {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
}

export interface SiteCategory {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
}

export interface BotType {
  id: string
  name: string
  description: string
  features: string[]
  active: boolean
}

export interface ProjectType {
  id: string
  name: string
  description: string
  active: boolean
}

export interface CustomizationOption {
  id: string
  name: string
  description: string
  type: 'text' | 'select' | 'checkbox' | 'textarea'
  options?: string[]
  required: boolean
  active: boolean
}

export interface Order {
  id: string
  timestamp: Date
  customerInfo: {
    name: string
    phone: string
    discord: string
    instagram: string
  }
  projectType: 'bot' | 'site' | 'design' | 'service'
  category: string
  description: string
  budget: string
  deadline: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  assignedTo?: string
  notes?: string
}

// Dados padrão do site
export const defaultSiteConfig: SiteConfig = {
  discordLink: "https://discord.gg/jp2BzA4H",
  contactInfo: {
    phone: "(11) 99999-9999",
    email: "contato@codeforge.dev",
    instagram: "@codeforge.dev"
  },
  botCategories: [
    {
      id: "discord-bots",
      name: "Discord Bots",
      description: "Bots para servidores do Discord",
      icon: "discord",
      active: true
    },
    {
      id: "whatsapp-bots",
      name: "WhatsApp Bots",
      description: "Bots para WhatsApp Business",
      icon: "whatsapp",
      active: true
    },
    {
      id: "telegram-bots",
      name: "Telegram Bots",
      description: "Bots para Telegram",
      icon: "telegram",
      active: true
    }
  ],
  siteCategories: [
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Lojas virtuais e sites de vendas",
      icon: "shopping",
      active: true
    },
    {
      id: "portfolio",
      name: "Portfólio",
      description: "Sites para mostrar trabalhos",
      icon: "briefcase",
      active: true
    },
    {
      id: "institutional",
      name: "Institucional",
      description: "Sites para empresas",
      icon: "building",
      active: true
    }
  ],
  botTypes: [
    {
      id: "moderation",
      name: "Moderação",
      description: "Bots para moderar servidores",
      features: ["Auto-moderação", "Logs", "Anti-spam"],
      active: true
    },
    {
      id: "music",
      name: "Música",
      description: "Bots para tocar música",
      features: ["Reprodução", "Playlists", "Controles"],
      active: true
    },
    {
      id: "games",
      name: "Jogos",
      description: "Bots para jogos e entretenimento",
      features: ["Mini-jogos", "Rankings", "Recompensas"],
      active: true
    }
  ],
  projectTypes: [
    {
      id: "new-project",
      name: "Novo Projeto",
      description: "Criar um projeto do zero",
      active: true
    },
    {
      id: "modify-existing",
      name: "Modificar Existente",
      description: "Modificar projeto existente",
      active: true
    },
    {
      id: "consultation",
      name: "Consultoria",
      description: "Apenas consultoria e orientação",
      active: true
    }
  ],
  customizationOptions: [
    {
      id: "bot-name",
      name: "Nome do Bot",
      description: "Nome personalizado para o bot",
      type: "text",
      required: true,
      active: true
    },
    {
      id: "bot-color",
      name: "Cor do Bot",
      description: "Cor principal do bot",
      type: "select",
      options: ["Azul", "Vermelho", "Verde", "Roxo", "Laranja"],
      required: false,
      active: true
    },
    {
      id: "special-features",
      name: "Funcionalidades Especiais",
      description: "Funcionalidades específicas desejadas",
      type: "textarea",
      required: false,
      active: true
    }
  ]
}

// Simulação de pedidos (em produção, isso viria do banco de dados)
export const mockOrders: Order[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T10:30:00"),
    customerInfo: {
      name: "João Silva",
      phone: "(11) 98765-4321",
      discord: "joao#1234",
      instagram: "@joao.silva"
    },
    projectType: "bot",
    category: "discord-bots",
    description: "Preciso de um bot de moderação para meu servidor de 500 pessoas",
    budget: "R$ 200-300",
    deadline: "1 semana",
    status: "pending"
  },
  {
    id: "2",
    timestamp: new Date("2024-01-14T15:45:00"),
    customerInfo: {
      name: "Maria Santos",
      phone: "(11) 91234-5678",
      discord: "maria#5678",
      instagram: "@maria.santos"
    },
    projectType: "site",
    category: "ecommerce",
    description: "Quero um site de e-commerce para vender roupas",
    budget: "R$ 500-800",
    deadline: "2 semanas",
    status: "in_progress",
    assignedTo: "M E L K E"
  }
]

// Funções para gerenciar dados
export class AdminDataManager {
  private static instance: AdminDataManager
  private siteConfig: SiteConfig
  private orders: Order[]

  private constructor() {
    // Carregar dados do localStorage ou usar padrões
    this.siteConfig = this.loadSiteConfig()
    this.orders = this.loadOrders()
  }

  static getInstance(): AdminDataManager {
    if (!AdminDataManager.instance) {
      AdminDataManager.instance = new AdminDataManager()
    }
    return AdminDataManager.instance
  }

  // Configurações do Site
  getSiteConfig(): SiteConfig {
    return this.siteConfig
  }

  updateSiteConfig(config: Partial<SiteConfig>): void {
    this.siteConfig = { ...this.siteConfig, ...config }
    this.saveSiteConfig()
  }

  updateDiscordLink(link: string): void {
    this.siteConfig.discordLink = link
    this.saveSiteConfig()
  }

  updateContactInfo(info: Partial<SiteConfig['contactInfo']>): void {
    this.siteConfig.contactInfo = { ...this.siteConfig.contactInfo, ...info }
    this.saveSiteConfig()
  }

  // Categorias de Bots
  getBotCategories(): BotCategory[] {
    return this.siteConfig.botCategories
  }

  addBotCategory(category: Omit<BotCategory, 'id'>): void {
    const newCategory: BotCategory = {
      ...category,
      id: `bot-${Date.now()}`
    }
    this.siteConfig.botCategories.push(newCategory)
    this.saveSiteConfig()
  }

  updateBotCategory(id: string, updates: Partial<BotCategory>): void {
    const index = this.siteConfig.botCategories.findIndex(cat => cat.id === id)
    if (index !== -1) {
      this.siteConfig.botCategories[index] = { ...this.siteConfig.botCategories[index], ...updates }
      this.saveSiteConfig()
    }
  }

  deleteBotCategory(id: string): void {
    this.siteConfig.botCategories = this.siteConfig.botCategories.filter(cat => cat.id !== id)
    this.saveSiteConfig()
  }

  // Categorias de Sites
  getSiteCategories(): SiteCategory[] {
    return this.siteConfig.siteCategories
  }

  addSiteCategory(category: Omit<SiteCategory, 'id'>): void {
    const newCategory: SiteCategory = {
      ...category,
      id: `site-${Date.now()}`
    }
    this.siteConfig.siteCategories.push(newCategory)
    this.saveSiteConfig()
  }

  updateSiteCategory(id: string, updates: Partial<SiteCategory>): void {
    const index = this.siteConfig.siteCategories.findIndex(cat => cat.id === id)
    if (index !== -1) {
      this.siteConfig.siteCategories[index] = { ...this.siteConfig.siteCategories[index], ...updates }
      this.saveSiteConfig()
    }
  }

  deleteSiteCategory(id: string): void {
    this.siteConfig.siteCategories = this.siteConfig.siteCategories.filter(cat => cat.id !== id)
    this.saveSiteConfig()
  }

  // Tipos de Bots
  getBotTypes(): BotType[] {
    return this.siteConfig.botTypes
  }

  addBotType(botType: Omit<BotType, 'id'>): void {
    const newBotType: BotType = {
      ...botType,
      id: `type-${Date.now()}`
    }
    this.siteConfig.botTypes.push(newBotType)
    this.saveSiteConfig()
  }

  updateBotType(id: string, updates: Partial<BotType>): void {
    const index = this.siteConfig.botTypes.findIndex(type => type.id === id)
    if (index !== -1) {
      this.siteConfig.botTypes[index] = { ...this.siteConfig.botTypes[index], ...updates }
      this.saveSiteConfig()
    }
  }

  deleteBotType(id: string): void {
    this.siteConfig.botTypes = this.siteConfig.botTypes.filter(type => type.id !== id)
    this.saveSiteConfig()
  }

  // Pedidos
  getOrders(): Order[] {
    return this.orders.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id)
  }

  addOrder(order: Omit<Order, 'id' | 'timestamp'>): void {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`,
      timestamp: new Date()
    }
    this.orders.push(newOrder)
    this.saveOrders()
  }

  updateOrder(id: string, updates: Partial<Order>): void {
    const index = this.orders.findIndex(order => order.id === id)
    if (index !== -1) {
      this.orders[index] = { ...this.orders[index], ...updates }
      this.saveOrders()
    }
  }

  deleteOrder(id: string): void {
    this.orders = this.orders.filter(order => order.id !== id)
    this.saveOrders()
  }

  // Persistência de dados
  private loadSiteConfig(): SiteConfig {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('siteConfig')
      return saved ? JSON.parse(saved) : defaultSiteConfig
    }
    return defaultSiteConfig
  }

  private saveSiteConfig(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteConfig', JSON.stringify(this.siteConfig))
    }
  }

  private loadOrders(): Order[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orders')
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }))
      }
    }
    return mockOrders
  }

  private saveOrders(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    }
  }
}

// Hook para usar o gerenciador de dados
export const useAdminData = () => {
  return AdminDataManager.getInstance()
}
