export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  services: Service[]
}

export const categories: Category[] = [
  {
    id: "bots",
    title: "BOTS",
    description: "Automação inteligente para WhatsApp, Discord, Instagram e Web",
    icon: "🤖",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    services: [
      {
        id: "automation",
        title: "Automação de Mensagens",
        description: "Respostas automáticas inteligentes",
        icon: "⚡"
      },
      {
        id: "support",
        title: "Atendimento 24/7",
        description: "Suporte ininterrupto aos clientes",
        icon: "🛡️"
      },
      {
        id: "analytics",
        title: "Relatórios Detalhados",
        description: "Métricas e insights completos",
        icon: "📊"
      },
      {
        id: "integration",
        title: "Integração com CRM",
        description: "Conecte com outras ferramentas",
        icon: "🔗"
      }
    ]
  },
  {
    id: "sites",
    title: "SITES",
    description: "Sites profissionais, responsivos e otimizados para SEO",
    icon: "🌐",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    services: [
      {
        id: "responsive",
        title: "Design Responsivo",
        description: "Perfeito em todos os dispositivos",
        icon: "📱"
      },
      {
        id: "seo",
        title: "Otimização SEO",
        description: "Apareça no topo do Google",
        icon: "🔍"
      },
      {
        id: "speed",
        title: "Carregamento Rápido",
        description: "Velocidade otimizada",
        icon: "⚡"
      },
      {
        id: "security",
        title: "Certificado SSL",
        description: "Segurança máxima",
        icon: "🔒"
      }
    ]
  },
  {
    id: "design",
    title: "DESIGN",
    description: "Criação de identidade visual, logos, interfaces e materiais gráficos",
    icon: "🎨",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    services: [
      {
        id: "branding",
        title: "Identidade Visual",
        description: "Logo e marca completa",
        icon: "🏷️"
      },
      {
        id: "social",
        title: "Posts para Redes Sociais",
        description: "Conteúdo para redes",
        icon: "📱"
      },
      {
        id: "print",
        title: "Material Impresso",
        description: "Cartões, folders, banners",
        icon: "🖨️"
      },
      {
        id: "web",
        title: "Design Web",
        description: "Interfaces modernas",
        icon: "💻"
      }
    ]
  },
  {
    id: "assistencia",
    title: "ASSISTÊNCIA",
    description: "Suporte técnico especializado e consultoria em marketing digital",
    icon: "🛠️",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    services: [
      {
        id: "strategy",
        title: "Estratégia de Marketing",
        description: "Planejamento estratégico",
        icon: "🎯"
      },
      {
        id: "analytics",
        title: "Análise de Dados",
        description: "Métricas e insights",
        icon: "📊"
      },
      {
        id: "support",
        title: "Suporte Técnico",
        description: "Acompanhamento especializado",
        icon: "🛠️"
      },
      {
        id: "optimization",
        title: "Otimização Contínua",
        description: "Melhorias constantes",
        icon: "⚡"
      }
    ]
  }
]

