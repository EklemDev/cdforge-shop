import FirebaseDataService from '../lib/firebase-data-service'

const firebaseService = FirebaseDataService.getInstance()

async function initializeFirebase() {
  console.log('🚀 Inicializando Firebase com dados padrão...')

  try {
    // 1. Configuração do Site
    console.log('📝 Configurando site...')
    await firebaseService.updateSiteConfig({
      discordLink: 'https://discord.gg/jp2BzA4H',
      phone: '(11) 99999-9999',
      email: 'contato@codeforge.dev',
      instagram: '@codeforge.dev',
      maintenanceMode: false,
      orderNotifications: true,
      autoBackup: true
    })

    // 2. Categorias de Bots
    console.log('🤖 Adicionando categorias de bots...')
    const botCategories = [
      {
        name: 'Moderação',
        description: 'Bots para moderar servidores Discord',
        icon: '🛡️',
        active: true,
        order: 1
      },
      {
        name: 'Música',
        description: 'Bots para reproduzir música em canais de voz',
        icon: '🎵',
        active: true,
        order: 2
      },
      {
        name: 'Jogos',
        description: 'Bots para jogos e entretenimento',
        icon: '🎮',
        active: true,
        order: 3
      },
      {
        name: 'Utilitários',
        description: 'Bots com funções úteis para o servidor',
        icon: '⚙️',
        active: true,
        order: 4
      }
    ]

    for (const category of botCategories) {
      await firebaseService.addBotCategory(category)
    }

    // 3. Categorias de Sites
    console.log('🌐 Adicionando categorias de sites...')
    const siteCategories = [
      {
        name: 'E-commerce',
        description: 'Lojas virtuais completas',
        icon: '🛒',
        active: true,
        order: 1
      },
      {
        name: 'Portfólio',
        description: 'Sites para mostrar trabalhos',
        icon: '📁',
        active: true,
        order: 2
      },
      {
        name: 'Institucional',
        description: 'Sites para empresas',
        icon: '🏢',
        active: true,
        order: 3
      },
      {
        name: 'Landing Page',
        description: 'Páginas de conversão',
        icon: '📄',
        active: true,
        order: 4
      }
    ]

    for (const category of siteCategories) {
      await firebaseService.addSiteCategory(category)
    }

    // 4. Tipos de Bots
    console.log('🔧 Adicionando tipos de bots...')
    const botTypes = [
      {
        name: 'Bot de Moderação',
        description: 'Bot completo para moderar servidores Discord',
        features: ['Banimento automático', 'Filtro de palavras', 'Logs de atividade', 'Sistema de avisos'],
        categoryId: 'moderation',
        active: true,
        order: 1
      },
      {
        name: 'Bot de Música',
        description: 'Bot para reproduzir música em canais de voz',
        features: ['Reprodução de música', 'Playlists', 'Controles de volume', 'Fila de músicas'],
        categoryId: 'music',
        active: true,
        order: 2
      },
      {
        name: 'Bot de Jogos',
        description: 'Bot com jogos para entretenimento',
        features: ['Jogos multiplayer', 'Sistema de pontos', 'Rankings', 'Minigames'],
        categoryId: 'games',
        active: true,
        order: 3
      }
    ]

    for (const type of botTypes) {
      await firebaseService.addBotType(type)
    }

    // 5. Tipos de Projetos
    console.log('📋 Adicionando tipos de projetos...')
    const projectTypes = [
      {
        name: 'Site E-commerce',
        description: 'Loja virtual completa',
        features: ['Catálogo de produtos', 'Carrinho de compras', 'Pagamentos online', 'Painel administrativo'],
        categoryId: 'ecommerce',
        active: true,
        order: 1
      },
      {
        name: 'Site Portfólio',
        description: 'Site para mostrar trabalhos',
        features: ['Galeria de projetos', 'Sobre mim', 'Contato', 'Blog'],
        categoryId: 'portfolio',
        active: true,
        order: 2
      },
      {
        name: 'Site Institucional',
        description: 'Site para empresas',
        features: ['Páginas institucionais', 'Blog', 'Formulário de contato', 'SEO otimizado'],
        categoryId: 'institutional',
        active: true,
        order: 3
      }
    ]

    for (const type of projectTypes) {
      await firebaseService.addProjectType(type)
    }

    // 6. Opções de Personalização
    console.log('🎨 Adicionando opções de personalização...')
    const customizationOptions = [
      {
        name: 'Tema do Bot',
        description: 'Escolha o tema visual do seu bot',
        type: 'bot' as const,
        options: ['Claro', 'Escuro', 'Personalizado'],
        required: true,
        active: true,
        order: 1
      },
      {
        name: 'Funcionalidades Especiais',
        description: 'Funcionalidades adicionais para o bot',
        type: 'bot' as const,
        options: ['Sistema de níveis', 'Economia virtual', 'Logs avançados', 'Integração com APIs'],
        required: false,
        active: true,
        order: 2
      },
      {
        name: 'Design do Site',
        description: 'Estilo visual do site',
        type: 'site' as const,
        options: ['Minimalista', 'Moderno', 'Clássico', 'Criativo'],
        required: true,
        active: true,
        order: 1
      },
      {
        name: 'Funcionalidades do Site',
        description: 'Funcionalidades adicionais para o site',
        type: 'site' as const,
        options: ['Blog', 'Sistema de comentários', 'Newsletter', 'Chat online'],
        required: false,
        active: true,
        order: 2
      }
    ]

    for (const option of customizationOptions) {
      await firebaseService.addCustomizationOption(option)
    }

    // 7. Preços
    console.log('💰 Adicionando preços...')
    const pricing = [
      {
        name: 'Bot Básico',
        price: 150,
        currency: 'BRL',
        originalPrice: 200,
        features: ['Funcionalidades básicas', 'Suporte por 30 dias', 'Deploy incluído'],
        type: 'bot' as const,
        category: 'Discord',
        description: 'Bot básico para Discord com funcionalidades essenciais',
        popular: false,
        active: true,
        order: 1
      },
      {
        name: 'Bot Premium',
        price: 300,
        currency: 'BRL',
        originalPrice: 400,
        features: ['Todas as funcionalidades', 'Suporte por 90 dias', 'Deploy incluído', 'Personalização avançada'],
        type: 'bot' as const,
        category: 'Discord',
        description: 'Bot avançado com funcionalidades completas',
        popular: true,
        active: true,
        order: 2
      },
      {
        name: 'Site Básico',
        price: 500,
        currency: 'BRL',
        originalPrice: 700,
        features: ['Design responsivo', 'SEO básico', 'Hospedagem por 1 ano', 'Suporte por 30 dias'],
        type: 'site' as const,
        category: 'Institucional',
        description: 'Site profissional para sua empresa',
        popular: false,
        active: true,
        order: 3
      },
      {
        name: 'Site Premium',
        price: 1000,
        currency: 'BRL',
        originalPrice: 1500,
        features: ['Design personalizado', 'SEO avançado', 'Hospedagem por 1 ano', 'Suporte por 90 dias', 'Funcionalidades avançadas'],
        type: 'site' as const,
        category: 'E-commerce',
        description: 'Site completo com todas as funcionalidades',
        popular: true,
        active: true,
        order: 4
      }
    ]

    for (const price of pricing) {
      await firebaseService.addPricing(price)
    }

    // 8. Serviços
    console.log('🔧 Adicionando serviços...')
    const services = [
      {
        name: 'Desenvolvimento de Bots Discord',
        description: 'Criamos bots personalizados para Discord com as funcionalidades que você precisa.',
        shortDescription: 'Bots inteligentes para Discord',
        icon: 'bot',
        type: 'bot' as const,
        category: 'Discord',
        features: ['Comandos personalizados', 'Moderação automática', 'Sistema de níveis', 'Integração com APIs'],
        benefits: ['Automatização completa', 'Melhoria na experiência', 'Redução de trabalho manual'],
        process: ['Análise de requisitos', 'Desenvolvimento', 'Testes', 'Deploy e treinamento'],
        examples: ['Bot de moderação', 'Bot de música', 'Bot de jogos', 'Bot de utilidades'],
        active: true,
        order: 1
      },
      {
        name: 'Desenvolvimento de Sites',
        description: 'Sites profissionais e responsivos para sua empresa ou projeto.',
        shortDescription: 'Sites modernos e responsivos',
        icon: 'globe',
        type: 'site' as const,
        category: 'Web',
        features: ['Design responsivo', 'SEO otimizado', 'Painel administrativo', 'Integração com redes sociais'],
        benefits: ['Presença online profissional', 'Maior visibilidade', 'Facilidade de gestão'],
        process: ['Briefing', 'Design', 'Desenvolvimento', 'Testes e lançamento'],
        examples: ['Site institucional', 'E-commerce', 'Blog', 'Portfolio'],
        active: true,
        order: 2
      },
      {
        name: 'Design Gráfico',
        description: 'Criação de identidade visual e materiais gráficos para sua marca.',
        shortDescription: 'Design profissional para sua marca',
        icon: 'palette',
        type: 'design' as const,
        category: 'Design',
        features: ['Logo personalizado', 'Identidade visual', 'Materiais impressos', 'Arte para redes sociais'],
        benefits: ['Marca profissional', 'Consistência visual', 'Diferenciação no mercado'],
        process: ['Briefing', 'Conceituação', 'Desenvolvimento', 'Aprovação e finalização'],
        examples: ['Logo e identidade', 'Banners', 'Cards para Instagram', 'Material impresso'],
        active: true,
        order: 3
      }
    ]

    for (const service of services) {
      await firebaseService.addService(service)
    }

    // 9. Planos
    console.log('📋 Adicionando planos...')
    const plans = [
      {
        name: 'Plano Básico',
        description: 'Ideal para pequenos projetos e testes.',
        price: 99,
        currency: 'BRL',
        originalPrice: 149,
        features: ['Suporte por email', 'Atualizações básicas', 'Documentação'],
        limitations: ['Sem suporte prioritário', 'Sem personalizações avançadas'],
        type: 'basic' as const,
        category: 'Geral',
        popular: false,
        active: true,
        order: 1
      },
      {
        name: 'Plano Profissional',
        description: 'Perfeito para empresas e projetos em crescimento.',
        price: 299,
        currency: 'BRL',
        originalPrice: 399,
        features: ['Suporte prioritário', 'Atualizações ilimitadas', 'Personalizações', 'Treinamento'],
        limitations: ['Sem suporte 24/7'],
        type: 'pro' as const,
        category: 'Geral',
        popular: true,
        active: true,
        order: 2
      },
      {
        name: 'Plano Empresarial',
        description: 'Solução completa para grandes empresas.',
        price: 599,
        currency: 'BRL',
        originalPrice: 799,
        features: ['Suporte 24/7', 'Atualizações ilimitadas', 'Personalizações avançadas', 'Consultoria'],
        limitations: [],
        type: 'enterprise' as const,
        category: 'Geral',
        popular: false,
        active: true,
        order: 3
      }
    ]

    for (const plan of plans) {
      await firebaseService.addPlan(plan)
    }

    // Main Categories
    const defaultMainCategories = [
      {
        title: "BOTS",
        description: "Automação inteligente para Discord, WhatsApp, Instagram e Web Scraping",
        icon: "Bot",
        href: "/bots",
        color: "#3B82F6",
        bgColor: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
        active: true,
        order: 1,
      },
      {
        title: "SITES",
        description: "Desenvolvimento web profissional, e-commerce, portfolios e landing pages",
        icon: "Globe",
        href: "/sites",
        color: "#10B981",
        bgColor: "bg-green-500",
        hoverColor: "hover:bg-green-600",
        active: true,
        order: 2,
      },
      {
        title: "DESIGN",
        description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
        icon: "Palette",
        href: "/design",
        color: "#8B5CF6",
        bgColor: "bg-purple-500",
        hoverColor: "hover:bg-purple-600",
        active: true,
        order: 3,
      },
      {
        title: "SERVIÇOS",
        description: "Análise de Instagram, consultoria especializada e suporte técnico",
        icon: "Settings",
        href: "/servicos",
        color: "#06B6D4",
        bgColor: "bg-cyan-500",
        hoverColor: "hover:bg-cyan-600",
        active: true,
        order: 4,
      },
    ] as const

    console.log("🌐 Inicializando categorias principais...")
    for (const category of defaultMainCategories) {
      await firebaseService.addMainCategory(category)
    }

    // Bot Config
    const defaultBotConfig = {
      name: "Bot Personalizado",
      description: "Bot inteligente com funcionalidades avançadas",
      responseTime: "30 minutos",
      contactMessage: "Entraremos em contato em {time}",
      successMessage: "Solicitação enviada com sucesso! Entraremos em contato em {time}",
      customizationOptions: {
        enableQuickChat: true,
        enableAutoResponses: true,
        enableDetailedMode: false,
        enableNotifications: true,
        enableAnalytics: false,
      },
      active: true,
    }

    console.log("🤖 Inicializando configurações dos bots...")
    await firebaseService.updateBotConfig(defaultBotConfig)

    // Bot Features
    const defaultBotFeatures = [
      {
        name: "Chat Rápido",
        description: "Respostas automáticas para perguntas frequentes",
        enabled: true,
        order: 1,
        category: "basic" as const,
        icon: "MessageSquare",
      },
      {
        name: "Atendimento Express",
        description: "Modo de atendimento prioritário",
        enabled: true,
        order: 2,
        category: "basic" as const,
        icon: "Zap",
      },
      {
        name: "Respostas Automáticas",
        description: "Sistema de respostas pré-definidas",
        enabled: true,
        order: 3,
        category: "advanced" as const,
        icon: "Bot",
      },
      {
        name: "Modo Detalhado",
        description: "Respostas mais elaboradas e informativas",
        enabled: false,
        order: 4,
        category: "advanced" as const,
        icon: "FileText",
      },
      {
        name: "Notificações",
        description: "Sistema de notificações em tempo real",
        enabled: true,
        order: 5,
        category: "premium" as const,
        icon: "Bell",
      },
      {
        name: "Analytics",
        description: "Relatórios e análises de uso",
        enabled: false,
        order: 6,
        category: "premium" as const,
        icon: "BarChart3",
      },
    ]

    console.log("⚙️ Inicializando funcionalidades dos bots...")
    for (const feature of defaultBotFeatures) {
      await firebaseService.addBotFeature(feature)
    }

    console.log('✅ Firebase inicializado com sucesso!')
    console.log('📊 Dados criados:')
    console.log('   - Configuração do site')
    console.log('   - 4 categorias de bots')
    console.log('   - 4 categorias de sites')
    console.log('   - 3 tipos de bots')
    console.log('   - 3 tipos de projetos')
    console.log('   - 4 opções de personalização')
    console.log('   - 4 planos de preços')
    console.log('   - 3 serviços')
    console.log('   - 3 planos')

  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  initializeFirebase()
}

export default initializeFirebase
