"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Package, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Calendar,
  User,
  Phone,
  Mail,
  Instagram,
  DollarSign,
  Clock
} from "lucide-react"
import { Order } from "@/lib/firebase-data-service"

interface OrdersTabProps {
  orders: Order[]
  onOrderUpdate: (id: string, updates: Partial<Order>) => void
  onOrderDelete: (id: string) => void
}

export default function OrdersTab({ orders, onOrderUpdate, onOrderDelete }: OrdersTabProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: "Pendente", className: "bg-orange-100 text-orange-800" },
      in_progress: { label: "Em Progresso", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Concluído", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800" }
    }
    
    const config = statusConfig[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getProjectTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      bot: "🤖",
      site: "🌐",
      design: "🎨",
      service: "⚙️"
    }
    return icons[type] || "📋"
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsViewModalOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditModalOpen(true)
  }

  const handleDeleteOrder = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este pedido?")) {
      onOrderDelete(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Gerenciar Pedidos
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos dos clientes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, Discord ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="in_progress">Em Progresso</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pedidos */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getProjectTypeIcon(order.projectType)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{order.customerName}</h3>
                      <p className="text-sm text-gray-600">
                        {order.projectType === 'bot' ? 'Bot' : 
                         order.projectType === 'site' ? 'Site' : 
                         order.projectType === 'design' ? 'Design' : 'Serviço'} - {order.category}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <p className="text-gray-700 mb-3 line-clamp-2">{order.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                                              {new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {order.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                                              {order.timeline}
                    </div>
                    {order.assignedTo && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {order.assignedTo}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewOrder(order)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditOrder(order)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Ainda não há pedidos registrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Visualização */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Informações do Cliente</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-gray-500" />
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Detalhes do Projeto</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Tipo:</strong> {selectedOrder.projectType}</div>
                    <div><strong>Categoria:</strong> {selectedOrder.category}</div>
                    <div><strong>Orçamento:</strong> {selectedOrder.budget}</div>
                    <div><strong>Prazo:</strong> {selectedOrder.timeline}</div>
                    <div><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</div>
                    {selectedOrder.assignedTo && (
                      <div><strong>Responsável:</strong> {selectedOrder.assignedTo}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-gray-700">{selectedOrder.description}</p>
              </div>
              
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Observações</h4>
                  <p className="text-gray-700">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderEditForm 
              order={selectedOrder} 
              onSave={(updates) => {
                onOrderUpdate(selectedOrder.id, updates)
                setIsEditModalOpen(false)
              }}
              onCancel={() => setIsEditModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Componente de formulário de edição
function OrderEditForm({ 
  order, 
  onSave, 
  onCancel 
}: { 
  order: Order
  onSave: (updates: Partial<Order>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    status: order.status,
    assignedTo: order.assignedTo || "",
    notes: order.notes || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Status</label>
        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as Order['status']})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in_progress">Em Progresso</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Responsável</label>
        <Input
          value={formData.assignedTo}
          onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
          placeholder="Nome do responsável"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Observações</label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Observações sobre o pedido..."
          rows={3}
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Salvar Alterações
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
