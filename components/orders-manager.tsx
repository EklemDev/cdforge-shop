"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2
} from "lucide-react"
import { useOrders } from "@/hooks/useFirebaseData"

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusIcons = {
  pending: Clock,
  in_progress: AlertCircle,
  completed: CheckCircle,
  cancelled: XCircle,
}

/**
 * Componente de gerenciamento de pedidos
 * 
 * Funcionalidades:
 * - Exibe todos os pedidos do sistema
 * - Destaca visualmente pedidos de planos com efeitos neon
 * - Permite editar status, prioridade e atribuições
 * - Integra com sistema de pedidos de planos
 * 
 * Destaque visual para pedidos de planos:
 * - Borda azul à esquerda
 * - Background gradiente azul
 * - Efeito neon pulsante
 * - Badge "Pedido - Plano" animado
 */
export default function OrdersManager() {
  const { orders, loading, updateOrder, deleteOrder } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editData, setEditData] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    notes: "",
  })

  const handleEdit = (order: any) => {
    setSelectedOrder(order)
    setEditData({
      status: order.status,
      priority: order.priority,
      assignedTo: order.assignedTo,
      notes: order.notes,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (order: any) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const saveEdit = async () => {
    if (!selectedOrder) return

    try {
      await updateOrder(selectedOrder.id, editData)
      setIsEditDialogOpen(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      alert('Erro ao atualizar pedido')
    }
  }

  const confirmDelete = async () => {
    if (!selectedOrder) return

    try {
      await deleteOrder(selectedOrder.id)
      setIsDeleteDialogOpen(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error('Erro ao deletar pedido:', error)
      alert('Erro ao deletar pedido')
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "N/A"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando pedidos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Pedidos</h2>
          <p className="text-gray-600 dark:text-gray-400">Gerencie todos os pedidos recebidos</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {orders.length} pedidos
        </Badge>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
          
          // Verificar se é um pedido de plano
          const orderAny = order as any
          const isPlanOrder = orderAny.category === 'planos' || orderAny.title?.includes('Pedido - Plano')
          
          return (
            <Card 
              key={order.id} 
              className={`shadow-lg border-0 relative overflow-hidden ${
                isPlanOrder 
                  ? 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white' 
                  : ''
              }`}
            >
              {/* Efeito neon para pedidos de planos */}
              {isPlanOrder && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
              )}
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="w-5 h-5" />
                    <CardTitle className="text-lg">
                      {order.customerName} - {order.projectType || orderAny.title}
                    </CardTitle>
                    {/* Badge especial para pedidos de planos */}
                    {isPlanOrder && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-pulse font-bold">
                        Pedido - Plano
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[order.priority as keyof typeof priorityColors]}>
                      {order.priority}
                    </Badge>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Criado em {formatDate(order.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="w-5 h-5" />
                    <CardTitle className="text-lg">
                      {order.customerName} - {order.projectType}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[order.priority as keyof typeof priorityColors]}>
                      {order.priority}
                    </Badge>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Criado em {formatDate(order.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Cliente:</span>
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">E-mail:</span>
                      <span>{order.customerEmail}</span>
                    </div>
                    {order.customerPhone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Telefone:</span>
                        <span>{order.customerPhone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4" />
                      <span className="font-medium">Projeto:</span>
                      <span>{order.projectType}</span>
                    </div>
                    {order.budget && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">Orçamento:</span>
                        <span>{order.budget}</span>
                      </div>
                    )}
                    {order.timeline && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Prazo:</span>
                        <span>{order.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Descrição do Projeto:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {order.description}
                  </p>
                </div>

                {order.notes && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Notas:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-line">
                      {order.notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {order.assignedTo && (
                      <Badge variant="outline">
                        Atribuído: {order.assignedTo}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(order)}
                      className="cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(order)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Deletar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {orders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600">Os pedidos aparecerão aqui quando forem enviados pelos clientes.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Pedido</DialogTitle>
            <DialogDescription>
              Atualize as informações do pedido
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={editData.status} onValueChange={(value) => setEditData({ ...editData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="in_progress">Em Andamento</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Prioridade</label>
              <Select value={editData.priority} onValueChange={(value) => setEditData({ ...editData, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Atribuído para</label>
              <input
                type="text"
                value={editData.assignedTo}
                onChange={(e) => setEditData({ ...editData, assignedTo: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Nome do responsável"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notas</label>
              <Textarea
                value={editData.notes}
                onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                placeholder="Adicione notas sobre o pedido"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="cursor-pointer">
              Cancelar
            </Button>
            <Button onClick={saveEdit} className="cursor-pointer">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="cursor-pointer">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="cursor-pointer">
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
