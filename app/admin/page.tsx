"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Settings, 
  Users, 
  FolderOpen, 
  Bot, 
  Globe, 
  Palette,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare
} from "lucide-react"
import CategoryManager from "@/components/category-manager"
import FounderManager from "@/components/founder-manager"
import OrdersManager from "@/components/orders-manager"
import { PlanNotifications } from "@/components/plan-notifications"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Painel de Administração
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Gerencie categorias, fundadores e configurações do site
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="plan-orders" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Pedidos - Plano
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="founders" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Fundadores
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="plan-orders" className="space-y-6">
            <PlanNotifications />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="founders" className="space-y-6">
            <FounderManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configurações Gerais
                  </CardTitle>
                  <CardDescription>
                    Configure as principais configurações do site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="siteName">Nome do Site</Label>
                      <Input id="siteName" placeholder="CodeForge" />
                    </div>
                    <div>
                      <Label htmlFor="siteDescription">Descrição do Site</Label>
                      <Input id="siteDescription" placeholder="Transforme suas ideias em soluções digitais" />
                    </div>
                    <div>
                      <Label htmlFor="discordLink">Link do Discord</Label>
                      <Input id="discordLink" placeholder="https://discord.gg/jp2BzA4H" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="maintenance" className="rounded" />
                      <Label htmlFor="maintenance">Modo Manutenção</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas</CardTitle>
                  <CardDescription>
                    Visão geral do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Categorias</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Fundadores</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projetos</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Suporte</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
