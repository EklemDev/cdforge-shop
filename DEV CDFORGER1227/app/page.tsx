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
} from "lucide-react"

// FIREBASE IMPORTS - Adicionar quando configurar Firebase
// import { db } from "@/firebase/config"
// import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"

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

  const stats = {
    totalOrders: 0,
    activeServices: 0,
    categories: 0,
    monthlyRevenue: 0,
    growthRate: 0,
    completionRate: 0,
    clientSatisfaction: 0,
    totalProjects: 0,
  }

  // FIREBASE READY - Função preparada para integração com Firebase
  const generateNewKey = async () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let result = "cd_dev_"
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const newKey = {
      id: apiKeys.length + 1,
      name: `Chave API ${apiKeys.length + 1}`,
      key: result,
      permissions: ["read", "write"],
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Nunca",
      isMaster: false,
      status: "active",
    }

    // TODO: Implementar quando Firebase estiver configurado
    // await addDoc(collection(db, "apiKeys"), newKey)
    setApiKeys([...apiKeys, newKey])
  }

  // IMPORTANTE: LÓGICA DA CHAVE MESTRA - FIREBASE READY
  const deleteKey = async (keyId: number) => {
    const keyToDelete = apiKeys.find((k) => k.id === keyId)
    if (!keyToDelete) return

    // Se é a chave mestra e é a única chave, não pode ser excluída
    if (keyToDelete.isMaster && apiKeys.length === 1) {
      alert("Não é possível excluir a única chave mestra do sistema!")
      return
    }

    // Remove a chave
    const updatedKeys = apiKeys.filter((k) => k.id !== keyId)

    // Se removeu a chave mestra e ainda há chaves, a primeira se torna mestra
    if (keyToDelete.isMaster && updatedKeys.length > 0) {
      updatedKeys[0].isMaster = true
      updatedKeys[0].permissions = ["read", "write", "admin"]
      updatedKeys[0].name = updatedKeys[0].name.includes("Mestra") ? updatedKeys[0].name : "Chave Mestra"
    }

    // Se sobrou apenas uma chave, ela se torna mestra automaticamente
    if (updatedKeys.length === 1 && !updatedKeys[0].isMaster) {
      updatedKeys[0].isMaster = true
      updatedKeys[0].permissions = ["read", "write", "admin"]
      updatedKeys[0].name = "Chave Mestra"
    }

    // TODO: Implementar quando Firebase estiver configurado
    // await deleteDoc(doc(db, "apiKeys", keyId.toString()))
    // if (updatedKeys.length > 0) {
    //   await updateDoc(doc(db, "apiKeys", updatedKeys[0].id.toString()), { isMaster: true })
    // }
    setApiKeys(updatedKeys)
  }

  const toggleKeyVisibility = (keyId: number) => {
    setShowApiKey((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
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
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1 glass-effect p-1.5 rounded-xl border border-slate-200/60 shadow-lg">
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
              value="services"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span className="hidden sm:inline">Serviços</span>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Categorias</span>
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Preços</span>
            </TabsTrigger>
            <TabsTrigger
              value="platforms"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Plataformas</span>
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contatos</span>
            </TabsTrigger>
            <TabsTrigger
              value="keys"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">Chaves</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config</span>
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
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-slate-600">Quando você receber pedidos, eles aparecerão aqui.</p>
                  </div>
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
                      <div className="text-4xl font-bold text-slate-900 mb-2">{stats.clientSatisfaction || "N/A"}</div>
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
              <Button
                onClick={generateNewKey}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer"
              >
                <Key className="w-4 h-4 mr-2" />
                Gerar Nova Chave
              </Button>
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleKeyVisibility(key.id)}
                              className="text-slate-600 cursor-pointer"
                            >
                              {showApiKey[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteKey(key.id)}
                              className="text-red-600 hover:bg-red-50 cursor-pointer"
                              disabled={key.isMaster && apiKeys.length === 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
                    <Button
                      onClick={generateNewKey}
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Gerar Primeira Chave
                    </Button>
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
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3 text-blue-600" />
                  Gestão de Pedidos
                </CardTitle>
                <CardDescription>Gerencie todos os pedidos dos clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Sistema de pedidos pronto para implementação
                  </h3>
                  <p className="text-slate-600">Esta seção gerenciará todos os pedidos dos clientes.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <Wrench className="w-6 h-6 mr-3 text-blue-600" />
                  Gestão de Serviços
                </CardTitle>
                <CardDescription>Configure e gerencie seus serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Catálogo de serviços pronto para configuração
                  </h3>
                  <p className="text-slate-600">Aqui você poderá cadastrar e gerenciar todos os seus serviços.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <FolderOpen className="w-6 h-6 mr-3 text-blue-600" />
                  Gestão de Categorias
                </CardTitle>
                <CardDescription>Organize seus serviços por categorias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Sistema de categorias pronto</h3>
                  <p className="text-slate-600">Organize seus serviços em categorias para melhor gestão.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-orange-600" />
                  Gestão de Preços
                </CardTitle>
                <CardDescription>Configure planos e preços dos serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Sistema de preços configurável</h3>
                  <p className="text-slate-600">Defina preços e planos para seus serviços.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  Plataformas Suportadas
                </CardTitle>
                <CardDescription>Gerencie as plataformas disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Gerenciamento de plataformas</h3>
                  <p className="text-slate-600">Configure as plataformas onde seus serviços estarão disponíveis.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl">
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-blue-600" />
                  Configurações de Contato
                </CardTitle>
                <CardDescription>Gerencie informações de contato e empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Phone className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Informações de contato</h3>
                  <p className="text-slate-600">Configure os dados de contato da sua empresa.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-slate-200/60 glass-effect shadow-xl relative">
              <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">Em produção</Badge>
              <CardHeader>
                <CardTitle className="font-bold text-2xl text-slate-900 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-blue-600" />
                  Configurações Gerais
                </CardTitle>
                <CardDescription>Configure as opções do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Configurações do sistema</h3>
                  <p className="text-slate-600">Personalize as configurações gerais do painel administrativo.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
