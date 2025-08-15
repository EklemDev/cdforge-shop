"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react"
import FirebaseDataService from "@/lib/firebase-data-service"

interface PlanNotification {
  id: string
  type: 'plan_order'
  title: string
  message: string
  details: {
    planName: string
    planPrice: number
    testDays: number
    customerName?: string
    customerEmail?: string
    customerPhone?: string
    orderId: string
  }
  priority: 'high' | 'medium' | 'low'
  read: boolean
  createdAt: Date
  updatedAt: Date
}

export function PlanNotifications() {
  const [notifications, setNotifications] = useState<PlanNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [showRead, setShowRead] = useState(false)

  const firebaseService = FirebaseDataService.getInstance()

  useEffect(() => {
    const unsubscribe = firebaseService.onNotificationsChange((allNotifications) => {
      // Filtrar apenas notificações de planos
      const planNotifications = allNotifications
        .filter((notification: any) => notification.type === 'plan_order')
        .map((notification: any) => ({
          ...notification,
          createdAt: notification.createdAt instanceof Date ? notification.createdAt : new Date(notification.createdAt),
          updatedAt: notification.updatedAt instanceof Date ? notification.updatedAt : new Date(notification.updatedAt)
        }))
        .sort((a: PlanNotification, b: PlanNotification) => b.createdAt.getTime() - a.createdAt.getTime())

      setNotifications(planNotifications)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await firebaseService.updateNotification(notificationId, { read: true })
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error)
    }
  }

  const handleMarkAsUnread = async (notificationId: string) => {
    try {
      await firebaseService.updateNotification(notificationId, { read: false })
    } catch (error) {
      console.error('Erro ao marcar notificação como não lida:', error)
    }
  }

  const filteredNotifications = showRead 
    ? notifications 
    : notifications.filter(n => !n.read)

  const unreadCount = notifications.filter(n => !n.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-6 h-6 text-blue-600" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse"
              >
                {unreadCount}
              </motion.div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Pedidos - Plano</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRead(!showRead)}
            className="flex items-center gap-2"
          >
            {showRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showRead ? "Ocultar Lidas" : "Mostrar Todas"}
          </Button>
        </div>
      </div>

      {/* Notificações */}
      <AnimatePresence>
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {showRead ? "Nenhuma notificação encontrada." : "Nenhuma notificação não lida."}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  !notification.read 
                    ? 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white' 
                    : 'border-l-4 border-l-gray-300'
                }`}>
                  
                  {/* Efeito neon para notificações não lidas */}
                  {!notification.read && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
                  )}
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {notification.title}
                          </CardTitle>
                          {!notification.read && (
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-pulse">
                              Novo
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-gray-600">
                          {notification.message}
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsUnread(notification.id)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Detalhes do Plano */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          Detalhes do Plano
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Plano:</span>
                            <span className="font-medium">{notification.details.planName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Preço:</span>
                            <span className="font-medium">R$ {notification.details.planPrice.toFixed(2)}/mês</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Teste:</span>
                            <span className="font-medium">{notification.details.testDays} dias</span>
                          </div>
                        </div>
                      </div>

                      {/* Informações do Cliente */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600" />
                          Cliente
                        </h4>
                        <div className="space-y-2 text-sm">
                          {notification.details.customerName && (
                            <div className="flex items-center gap-2">
                              <User className="w-3 h-3 text-gray-500" />
                              <span>{notification.details.customerName}</span>
                            </div>
                          )}
                          {notification.details.customerEmail && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-500" />
                              <span>{notification.details.customerEmail}</span>
                            </div>
                          )}
                          {notification.details.customerPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span>{notification.details.customerPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Informações da Ordem */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{notification.createdAt.toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{notification.createdAt.toLocaleTimeString('pt-BR')}</span>
                          </div>
                        </div>
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                          ID: {notification.details.orderId.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
