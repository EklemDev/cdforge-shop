"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Bot,
  DollarSign,
  TrendingUp,
  Package,
  Bell,
  Search,
  BarChart3,
  Activity,
  Star,
  ArrowUpRight,
  Filter,
  Download,
  Zap,
  Target,
  Briefcase,
  Settings,
  ShoppingCart,
  Wrench,
  FolderOpen,
  CreditCard,
  Globe,
  Phone,
  Key,
  Shield,
  Code,
  Database,
  Server,
  Plus,
  ShieldCheck,
  Lock,
  AlertTriangle,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Edit,
  Save,
  X,
  Palette,
  Check,
} from "lucide-react"

// FIREBASE IMPORTS - Adicionar quando configurar Firebase
// import { db } from "@/firebase/config"
// import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useOrders } from "@/hooks/useOrders"
import PlansManager from "@/components/plans-manager"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // FIREBASE SYNC READY - Sistema de chaves preparado para sincronização com Firebase
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Chave Mestra",
      key: "cd_master_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      permissions: ["read", "write", "admin"],
      createdAt: "2024-01-15",
      lastUsed: "2024-01-20",
      isMaster: true,
      status: "active",
    },
  ])
  const [showApiKey, setShowApiKey] = useState<{ [key: number]: boolean }>({})
  

  
  // Hook para gerenciar pedidos
  const { orders, loading: ordersLoading, updateOrder, deleteOrder } = useOrders()

  const stats = {
    totalOrders: orders.length,
    activeServices: 0, // Como não há serviços ativos ainda
    categories: 3, // bots, sites, design
    monthlyRevenue: orders.filter(o => o.status === 'completed').reduce((sum, order) => sum + (parseInt(order.budget) || 0), 0),
    growthRate: 0,
    completionRate: orders.length > 0 ? Math.round((orders.filter(o => o.status === 'completed').length / orders.length) * 100) : 0,
    clientSatisfaction: 0, // Como não há avaliações ainda
    totalProjects: orders.filter(o => o.status === 'completed').length,
  }

  const handleLogout = () => {
    // Limpar dados de acesso do localStorage
    localStorage.removeItem("devKey")
    localStorage.removeItem("devAccess")
    
    // Redirecionar para a página inicial
    window.location.href = "/"
  }

    return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200/60 glass-effect sticky top-0 z-50 shadow-lg bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <img src="/codeforge-logo.png" alt="CodeForge Logo" className="w-12 h-12 shadow-xl rounded-xl" />
                </div>
                <div>
                  <h1 className="font-bold text-2xl text-blue-600">CodeForge Admin</h1>
                  <p className="text-xs text-slate-500 font-medium">Painel de Controle Avançado</p>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white font-bold text-sm">SISTEMA SEGURO</span>
                  <Lock className="w-4 h-4 text-blue-200" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-slate-200 hover:bg-white/80 bg-transparent cursor-pointer"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-slate-200 hover:bg-white/80 bg-transparent cursor-pointer"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-slate-200 hover:bg-white/80 bg-transparent cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-effect border-slate-200 hover:bg-white/80 relative bg-transparent cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  </span>
                </Button>
              </div>

              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <Avatar className="w-10 h-10 ring-2 ring-blue-100 shadow-lg">
                  <AvatarImage src="/admin-avatar.png" />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">CD</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">DESENVOLVEDOR</p>
                  <p className="text-xs text-slate-500">Administrador Master</p>
                </div>
            <Button
              variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="glass-effect border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-4xl text-blue-600 mb-2">Bem-vindo de volta! 👋</h2>
              <p className="text-slate-600 text-lg">Aqui está o resumo das suas atividades hoje.</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 gap-1 glass-effect p-1.5 rounded-xl border border-slate-200/60 shadow-lg">
            <TabsTrigger
              value="dashboard"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger
              value="plans"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 bg-blue-600 text-white shadow-xl card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Total de Pedidos</CardTitle>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stats.totalOrders}</div>
                  <div className="flex items-center text-blue-100 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Aguardando dados
                  </div>
                  <Progress value={0} className="mt-3 bg-blue-400/30" />
                </CardContent>
              </Card>

              <Card className="border-0 bg-blue-500 text-white shadow-xl card-hover relative">
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">
                  Em produção
                </Badge>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Serviços Ativos</CardTitle>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stats.activeServices}</div>
                  <div className="flex items-center text-blue-100 text-sm">
                    <Zap className="w-4 h-4 mr-1" />
                    Nenhum serviço ativo
                  </div>
                  <Progress value={0} className="mt-3 bg-blue-300/30" />
                </CardContent>
              </Card>

              <Card className="border-0 bg-purple-600 text-white shadow-xl card-hover relative">
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">
                  Em produção
                </Badge>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-100">Receita Mensal</CardTitle>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">R$ {stats.monthlyRevenue.toLocaleString("pt-BR")}</div>
                  <div className="flex items-center text-purple-100 text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    Aguardando vendas
                  </div>
                  <Progress value={0} className="mt-3 bg-purple-400/30" />
                </CardContent>
              </Card>

              <Card className="border-0 bg-orange-600 text-white shadow-xl card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-100">Taxa de Conclusão</CardTitle>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stats.completionRate}%</div>
                  <div className="flex items-center text-orange-100 text-sm">
                    <Activity className="w-4 h-4 mr-1" />
                    Sem dados disponíveis
                  </div>
                  <Progress value={0} className="mt-3 bg-orange-400/30" />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-slate-200/60 glass-effect shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
                        Pedidos Recentes
                      </CardTitle>
                      <CardDescription className="text-slate-600 mt-1">
                        Acompanhe o progresso dos seus projetos em tempo real
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-slate-600">Carregando pedidos...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum pedido encontrado</h3>
                      <p className="text-slate-600">Quando você receber pedidos, eles aparecerão aqui.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              order.status === 'completed' ? 'bg-green-500' :
                              order.status === 'in_progress' ? 'bg-blue-500' :
                              order.status === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></div>
                            <div>
                              <h4 className="font-medium text-slate-900">{order.customerName}</h4>
                              <p className="text-sm text-slate-600">{order.projectType}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">
                              {order.status === 'completed' ? 'Concluído' :
                               order.status === 'in_progress' ? 'Em Andamento' :
                               order.status === 'pending' ? 'Pendente' :
                               'Cancelado'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.createdAt ? new Date(order.createdAt.toDate ? order.createdAt.toDate() : order.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                            </p>
                          </div>
                        </div>
                      ))}
                      {orders.length > 5 && (
                        <div className="text-center pt-4">
                          <p className="text-sm text-slate-600">
                            +{orders.length - 5} pedidos adicionais
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-slate-200/60 glass-effect shadow-xl relative">
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">
                    Em produção
                  </Badge>
                  <CardHeader>
                    <CardTitle className="font-bold text-lg text-slate-900 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-orange-500" />
                      Satisfação do Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 mb-2">{stats.clientSatisfaction}</div>
                      <div className="flex justify-center space-x-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-gray-300" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600">Sem avaliações ainda</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/60 glass-effect shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-bold text-lg text-slate-900 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                      Total de Projetos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-slate-900 mb-2">{stats.totalProjects}</div>
                      <p className="text-sm text-slate-600 mb-3">Projetos desenvolvidos</p>
                      <div className="flex items-center justify-center text-slate-500 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Aguardando dados
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="keys" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-3xl text-blue-600">Gerenciamento de Chaves API</h3>
                <p className="text-slate-600 mt-2">
                  Gerencie chaves de acesso para desenvolvedores e integrações
                  {/* FIREBASE READY - Aguardando sincronização com Firebase */}
                </p>
              </div>

            </div>

            {/* FIREBASE SYNC READY - Cards de estatísticas preparados para dados em tempo real */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-slate-200/60 glass-effect shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-600" />
                    Chaves Ativas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{apiKeys.length}</div>
                  <p className="text-sm text-slate-600 mt-1">
                    {apiKeys.length === 1 ? "chave ativa" : "chaves ativas"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/60 glass-effect shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                    <Database className="w-4 h-4 mr-2 text-blue-600" />
                    Requisições Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">0</div>
                  <p className="text-sm text-slate-600 mt-1">Aguardando Firebase</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/60 glass-effect shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
                    <Server className="w-4 h-4 mr-2 text-blue-600" />
                    Última Atividade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">N/A</div>
                  <p className="text-sm text-slate-600 mt-1">Aguardando Firebase</p>
                </CardContent>
              </Card>
          </div>

            {/* FIREBASE READY - Lista de chaves preparada para sincronização em tempo real */}
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-xl text-slate-900 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-600" />
                  Chaves de API Registradas
                  <Badge className="ml-2 bg-orange-500 text-white text-xs">Aguardando Firebase</Badge>
                </CardTitle>
                <CardDescription>Gerencie e monitore todas as chaves de acesso para desenvolvedores</CardDescription>
              </CardHeader>
              <CardContent>
                {apiKeys.length > 0 ? (
                  <div className="space-y-4">
                    {apiKeys.map((key) => (
                      <div key={key.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-slate-900">{key.name}</h4>
                              {key.isMaster && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  MESTRA
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">

                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Chave:</span>
                            <code className="text-sm bg-slate-100 px-2 py-1 rounded font-mono">
                              {showApiKey[key.id] ? key.key : key.key.substring(0, 12) + "..."}
                            </code>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span>Criada: {key.createdAt}</span>
                            <span>Último uso: {key.lastUsed}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Permissões:</span>
                            <div className="flex space-x-1">
                              {key.permissions.map((perm) => (
                                <Badge key={perm} variant="secondary" className="text-xs">
                                  {perm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {key.isMaster && apiKeys.length === 1 && (
                          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Esta é a única chave mestra e não pode ser excluída.
                          </div>
                        )}
                    </div>
                  ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Key className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhuma chave API encontrada</h3>
                    <p className="text-slate-600 mb-4">
                      Crie sua primeira chave API para começar a integrar com desenvolvedores.
                    </p>

                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">Como usar as chaves API</h5>
                  <p className="text-sm text-blue-800 mb-3">
                    Inclua sua chave API no cabeçalho Authorization das suas requisições:
                  </p>
                  <code className="block p-3 bg-blue-900 text-blue-100 rounded text-sm font-mono">
                    Authorization: Bearer [SUA_CHAVE_API]
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-3xl text-blue-600">Gestão de Pedidos</h3>
                <p className="text-slate-600 mt-2">
                  Gerencie todos os pedidos dos clientes em tempo real
                </p>
              </div>
            </div>

            {ordersLoading ? (
              <Card className="border-slate-200/60 glass-effect shadow-xl">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Carregando pedidos...</p>
                  </div>
                </CardContent>
              </Card>
            ) : orders.length === 0 ? (
              <Card className="border-slate-200/60 glass-effect shadow-xl">
                <CardContent className="py-12">
                  <div className="text-center">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Nenhum pedido encontrado
                    </h3>
                    <p className="text-slate-600">Quando os clientes enviarem pedidos, eles aparecerão aqui.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-slate-200/60 glass-effect shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold text-slate-900">
                            {order.customerName}
                          </CardTitle>
                          <CardDescription className="text-sm text-slate-600">
                            {order.customerEmail} • {order.customerPhone}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={
                              order.status === 'pending' ? 'secondary' :
                              order.status === 'in_progress' ? 'default' :
                              order.status === 'completed' ? 'default' :
                              'destructive'
                            }
                            className={
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {order.status === 'pending' ? 'Pendente' :
                             order.status === 'in_progress' ? 'Em Progresso' :
                             order.status === 'completed' ? 'Concluído' :
                             'Cancelado'}
                          </Badge>
                          <Badge variant="outline">
                            {order.priority === 'high' ? 'Alta' :
                             order.priority === 'medium' ? 'Média' :
                             'Baixa'} Prioridade
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Detalhes do Projeto</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Tipo:</span> {order.projectType}</p>
                            <p><span className="font-medium">Categoria:</span> {order.category}</p>
                            <p><span className="font-medium">Orçamento:</span> R$ {order.budget}</p>
                            <p><span className="font-medium">Prazo:</span> {order.timeline}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">Descrição</h4>
                          <p className="text-sm text-slate-600">{order.description}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          Criado em: {order.createdAt?.toDate?.()?.toLocaleDateString('pt-BR') || 'N/A'}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrder(order.id, { status: 'in_progress' })}
                            disabled={order.status !== 'pending'}
                          >
                            Iniciar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrder(order.id, { status: 'completed' })}
                            disabled={order.status === 'completed' || order.status === 'cancelled'}
                          >
                            Concluir
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>





          

          <TabsContent value="plans" className="space-y-6">
            <PlansManager />
          </TabsContent>


        </Tabs>
      </div>
    </div>
  )
}
