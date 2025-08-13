"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Users, 
  DollarSign, 
  Package, 
  BarChart3, 
  Shield,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Globe,
  Bot,
  Palette,
  Link as LinkIcon,
  CheckCircle,
  Brain,
  Phone
} from "lucide-react"
import { useOrders, useSiteConfig, useBotCategories, useSiteCategories, useProjectTypes, useCustomizationOptions, usePricing, useServices, useMainCategories, useDevKeys } from "@/hooks/useFirebaseData"
import OrdersTab from "@/components/admin/orders-tab"
import SiteConfigTab from "@/components/admin/site-config-tab"
import ContactsTab from "@/components/admin/contacts-tab"

import BotCategoriesTab from "@/components/admin/bot-categories-tab"
import SiteCategoriesTab from "@/components/admin/site-categories-tab"
import ServicesTab from "@/components/admin/services-tab"
import PricingTab from "@/components/admin/pricing-tab"
import MainCategoriesTab from "@/components/admin/main-categories-tab"
import DevKeysTab from "@/components/admin/dev-keys-tab"
import LoadingSpinner from "@/components/loading-spinner"


export default function AdminPage() {
  const router = useRouter()
  const [devKey, setDevKey] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [activeTab, setActiveTab] = useState("orders")
  const [tabKey, setTabKey] = useState(0) // Força re-renderização
  const { orders, loading: ordersLoading, updateOrder, deleteOrder } = useOrders()
  const { config: siteConfig, loading: configLoading, updateConfig } = useSiteConfig()
  const { categories: botCategories, loading: botCategoriesLoading, addCategory: addBotCategory, updateCategory: updateBotCategory, deleteCategory: deleteBotCategory } = useBotCategories()
  const { categories: siteCategories, loading: siteCategoriesLoading, addCategory: addSiteCategory, updateCategory: updateSiteCategory, deleteCategory: deleteSiteCategory } = useSiteCategories()

  const { types: projectTypes, loading: projectTypesLoading, addType: addProjectType, updateType: updateProjectType, deleteType: deleteProjectType } = useProjectTypes()
  const { options: customizationOptions, loading: customizationOptionsLoading, addOption, updateOption, deleteOption } = useCustomizationOptions()
  const { pricing, loading: pricingLoading, addPricing: addPricingItem, updatePricing: updatePricingItem, deletePricing: deletePricingItem } = usePricing()
  const { services, loading: servicesLoading, addService, updateService, deleteService } = useServices()
  const { categories: mainCategories, loading: mainCategoriesLoading, addMainCategory, updateMainCategory, deleteMainCategory } = useMainCategories()
  const { keys: devKeys, loading: devKeysLoading, addDevKey, updateDevKey, deleteDevKey } = useDevKeys()
  


  useEffect(() => {
    // Verificar se o usuário tem acesso de desenvolvedor
    const storedDevKey = localStorage.getItem("devKey")
    const devAccess = localStorage.getItem("devAccess")

    if (!storedDevKey || devAccess !== "true") {
      router.push("/")
      return
    }

    setDevKey(storedDevKey)
    setIsAuthorized(true)
  }, [router])

  // Força re-renderização quando a aba muda
  useEffect(() => {
    const timer = setTimeout(() => {
      setTabKey(prev => prev + 1)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [activeTab])

  const handleLogout = () => {
    try {
      localStorage.removeItem("devKey")
      localStorage.removeItem("devAccess")
      // Forçar redirecionamento
      window.location.href = "/"
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Fallback: redirecionar diretamente
      window.location.href = "/"
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setTabKey(prev => prev + 1) // Força re-renderização
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Acesso Negado
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Você não tem permissão para acessar esta área.
          </p>
        </div>
      </div>
    )
  }

  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const inProgressOrders = orders.filter(order => order.status === 'in_progress').length
  const completedOrders = orders.filter(order => order.status === 'completed').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Painel de Administração
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Acesso de Desenvolvedor - {devKey}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                  <p className="text-2xl font-bold text-blue-600">{inProgressOrders}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Tabs Principais */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6" key={tabKey}>
          <TabsList className="grid w-full grid-cols-4 gap-2">
            {/* Primeira Linha - 4 abas principais */}
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contatos
            </TabsTrigger>


            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Nossos Serviços
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Preços
            </TabsTrigger>
          </TabsList>
          
          {/* Segunda Linha - 4 abas secundárias */}
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger value="main-categories" className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="bot-categories" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Nossos Bots
            </TabsTrigger>
            <TabsTrigger value="site-categories" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Nossos Sites
            </TabsTrigger>

            <TabsTrigger value="dev-keys" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Chaves de Dev
            </TabsTrigger>

          </TabsList>

          <TabsContent value="orders" className="space-y-6" forceMount>
            {activeTab === "orders" && (
              <OrdersTab 
                orders={orders} 
                onOrderUpdate={updateOrder} 
                onOrderDelete={deleteOrder} 
              />
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6" forceMount>
            {activeTab === "contacts" && (
              <ContactsTab 
                siteConfig={siteConfig || {
                  id: '',
                  discordLink: 'https://discord.gg/jp2BzA4H',
                  phone: '',
                  email: '',
                  instagram: '',
                  whatsapp: 'https://wa.me/5511966485110',
                  companyName: 'CodeForge',
                  companyDescription: 'Transformando ideias em soluções digitais inovadoras.',
                  address: '',
                  city: '',
                  state: '',
                  country: 'Brasil',
                  maintenanceMode: false,
                  orderNotifications: true,
                  autoBackup: true,
                  siteTitle: 'CodeForge - Desenvolvimento de Bots e Sites',
                  siteDescription: 'Especialistas em desenvolvimento de bots para Discord e WhatsApp, sites e design.',
                  keywords: 'bots, discord, whatsapp, sites, desenvolvimento, design',
                  facebook: '',
                  twitter: '',
                  linkedin: '',
                  youtube: '',
                  businessHours: 'Segunda a Sexta, 9h às 18h',
                  timezone: 'America/Sao_Paulo',
                  currency: 'BRL',
                  updatedAt: null
                }} 
                onUpdate={updateConfig}
              />
            )}
          </TabsContent>







            <TabsContent value="main-categories" className="space-y-6" forceMount>
              {activeTab === "main-categories" && <MainCategoriesTab />}
            </TabsContent>

            <TabsContent value="services" className="space-y-6" forceMount>
              {activeTab === "services" && (
                <ServicesTab 
                  services={services}
                  onAdd={addService}
                  onUpdate={updateService}
                  onDelete={deleteService}
                />
              )}
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6" forceMount>
              {activeTab === "pricing" && (
                <PricingTab 
                  pricing={pricing}
                  onAdd={addPricingItem}
                  onUpdate={updatePricingItem}
                  onDelete={deletePricingItem}
                />
              )}
            </TabsContent>



          <TabsContent value="bot-categories" className="space-y-6" forceMount>
            {activeTab === "bot-categories" && (
              <BotCategoriesTab 
                categories={botCategories}
                onAdd={(category) => {
                  const newCategory = {
                    ...category,
                    order: botCategories.length + 1
                  }
                  addBotCategory(newCategory)
                }}
                onUpdate={updateBotCategory}
                onDelete={deleteBotCategory}
              />
            )}
          </TabsContent>

          <TabsContent value="site-categories" className="space-y-6" forceMount>
            {activeTab === "site-categories" && (
              <SiteCategoriesTab 
                categories={siteCategories}
                onAdd={(category) => {
                  const newCategory = {
                    ...category,
                    order: siteCategories.length + 1
                  }
                  addSiteCategory(newCategory)
                }}
                onUpdate={updateSiteCategory}
                onDelete={deleteSiteCategory}
              />
            )}
          </TabsContent>



          <TabsContent value="customization" className="space-y-6" forceMount>
            {activeTab === "customization" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-500" />
                    Opções de Personalização
                  </CardTitle>
                  <CardDescription>
                    Gerencie as opções de personalização disponíveis para os clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Funcionalidade em desenvolvimento...
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>



                      <TabsContent value="dev-keys" className="space-y-6" forceMount>
              {activeTab === "dev-keys" && (
                <DevKeysTab keys={devKeys} onAdd={addDevKey} onUpdate={updateDevKey} onDelete={deleteDevKey} />
              )}
            </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
