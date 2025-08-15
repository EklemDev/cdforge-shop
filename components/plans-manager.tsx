"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  AlertTriangle,
  CreditCard,
  Users,
  Calendar,
  DollarSign,
  Percent,
  Tag
} from "lucide-react"
import { usePlans, Plan } from "@/hooks/usePlans"

export default function PlansManager() {
  const { plans, loading, error, addPlan, updatePlan, deletePlan, togglePlanActive, togglePromotion } = usePlans()
  
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    contacts: {
      melke: "",
      zanesco: "",
      pedro: ""
    },
    testDays: 30,
    price: 0,
    promotion: {
      active: false,
      type: 'percentage' as 'percentage' | 'fixed',
      value: 0,
      description: ""
    }
  })

  const activePlans = plans.filter(p => p.active)
  const canAddPlan = activePlans.length < 3

  const handleAddPlan = async () => {
    try {
      await addPlan({
        ...formData,
        active: true,
        order: plans.length + 1
      })
      setShowAddDialog(false)
      resetForm()
    } catch (error) {
      console.error('Erro ao adicionar plano:', error)
    }
  }

  const handleEditPlan = async () => {
    if (!editingPlan) return
    
    try {
      await updatePlan(editingPlan.id, formData)
      setShowEditDialog(false)
      setEditingPlan(null)
      resetForm()
    } catch (error) {
      console.error('Erro ao atualizar plano:', error)
    }
  }

  const handleDeletePlan = async () => {
    if (!deletingPlan) return
    
    try {
      await deletePlan(deletingPlan.id)
      setShowDeleteDialog(false)
      setDeletingPlan(null)
    } catch (error) {
      console.error('Erro ao deletar plano:', error)
    }
  }

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name || "",
      contacts: {
        melke: plan.contacts?.melke || "",
        zanesco: plan.contacts?.zanesco || "",
        pedro: plan.contacts?.pedro || ""
      },
      testDays: plan.testDays || 30,
      price: plan.price || 0,
      promotion: plan.promotion || {
        active: false,
        type: 'percentage' as 'percentage' | 'fixed',
        value: 0,
        description: ""
      }
    })
    setShowEditDialog(true)
  }

  const openDeleteDialog = (plan: Plan) => {
    setDeletingPlan(plan)
    setShowDeleteDialog(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      contacts: {
        melke: "",
        zanesco: "",
        pedro: ""
      },
      testDays: 30,
      price: 0,
      promotion: {
        active: false,
        type: 'percentage',
        value: 0,
        description: ""
      }
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-slate-600">Carregando planos...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-3xl text-slate-900">Gestão de Planos</h3>
          <p className="text-slate-600 mt-2">
            Configure planos e preços. As alterações são sincronizadas automaticamente.
          </p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          disabled={!canAddPlan}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Plano
        </Button>
      </div>

      {/* Limite de planos */}
      {!canAddPlan && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-orange-800 font-medium">
              Limite máximo de 3 planos ativos atingido
            </span>
          </div>
          <p className="text-orange-700 text-sm mt-1">
            Desative um plano existente para adicionar um novo.
          </p>
        </motion.div>
      )}

      {/* Lista de planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
              plan.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg font-semibold">{plan.name || 'Plano sem nome'}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={plan.active ? "default" : "secondary"}>
                      {plan.active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Switch
                      checked={plan.active}
                      onCheckedChange={() => togglePlanActive(plan.id)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contatos */}
                <div>
                  <Label className="text-sm font-medium text-slate-700">Contatos</Label>
                  <div className="space-y-1 mt-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Melke: {plan.contacts?.melke || 'Não definido'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Zanesco: {plan.contacts?.zanesco || 'Não definido'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Pedro: {plan.contacts?.pedro || 'Não definido'}</span>
                    </div>
                  </div>
                </div>

                {/* Teste e Preço */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Dias de Teste</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{plan.testDays || 0} dias</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700">Preço</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600 font-medium">{formatCurrency(plan.price || 0)}</span>
                    </div>
                  </div>
                </div>

                {/* Promoção */}
                {plan.promotion?.active && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-medium">Promoção Ativa</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {plan.promotion?.type === 'percentage' ? (
                        <Percent className="w-4 h-4 text-green-600" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-green-700">
                        {plan.promotion?.type === 'percentage' 
                          ? `${plan.promotion?.value || 0}% de desconto`
                          : `${formatCurrency(plan.promotion?.value || 0)} de desconto`
                        }
                      </span>
                    </div>
                    {plan.promotion?.description && (
                      <p className="text-green-600 text-xs mt-1">{plan.promotion.description}</p>
                    )}
                  </div>
                )}

                {/* Ações */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(plan)}
                    className="flex-1 cursor-pointer"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(plan)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dialog Adicionar Plano */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Adicionar Novo Plano
            </DialogTitle>
            <DialogDescription>
              Configure os detalhes do novo plano
            </DialogDescription>
          </DialogHeader>
          
          <PlanForm 
            formData={formData} 
            setFormData={setFormData} 
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPlan} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Adicionar Plano
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar Plano */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Editar Plano
            </DialogTitle>
            <DialogDescription>
              Modifique os detalhes do plano
            </DialogDescription>
          </DialogHeader>
          
          <PlanForm 
            formData={formData} 
            setFormData={setFormData} 
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditPlan} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmar Exclusão */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o plano "{deletingPlan?.name}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePlan}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Componente do formulário de plano
interface PlanFormProps {
  formData: any
  setFormData: (data: any) => void
}

function PlanForm({ formData, setFormData }: PlanFormProps) {
  return (
    <div className="space-y-6">
      {/* Nome do Plano */}
      <div>
        <Label htmlFor="name">Nome do Plano *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Plano Básico"
          className="mt-1"
        />
      </div>

      {/* Contatos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="melke">Melke</Label>
          <Input
            id="melke"
            value={formData.contacts.melke}
            onChange={(e) => setFormData({
              ...formData,
              contacts: { ...formData.contacts, melke: e.target.value }
            })}
            placeholder="Nome do Melke"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="zanesco">Zanesco</Label>
          <Input
            id="zanesco"
            value={formData.contacts.zanesco}
            onChange={(e) => setFormData({
              ...formData,
              contacts: { ...formData.contacts, zanesco: e.target.value }
            })}
            placeholder="Nome do Zanesco"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pedro">Pedro</Label>
          <Input
            id="pedro"
            value={formData.contacts.pedro}
            onChange={(e) => setFormData({
              ...formData,
              contacts: { ...formData.contacts, pedro: e.target.value }
            })}
            placeholder="Nome do Pedro"
            className="mt-1"
          />
        </div>
      </div>

      {/* Teste e Preço */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="testDays">Dias de Teste *</Label>
          <Input
            id="testDays"
            type="number"
            min="1"
            value={formData.testDays}
            onChange={(e) => setFormData({ ...formData, testDays: parseInt(e.target.value) || 0 })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="price">Preço (R$) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="mt-1"
          />
        </div>
      </div>

      {/* Promoção */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.promotion.active}
            onCheckedChange={(checked) => setFormData({
              ...formData,
              promotion: { ...formData.promotion, active: checked }
            })}
          />
          <Label>Ativar Promoção</Label>
        </div>

        {formData.promotion.active && (
          <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="promotionType">Tipo de Desconto</Label>
                <Select
                  value={formData.promotion.type}
                  onValueChange={(value: 'percentage' | 'fixed') => setFormData({
                    ...formData,
                    promotion: { ...formData.promotion, type: value }
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="promotionValue">
                  {formData.promotion.type === 'percentage' ? 'Percentual (%)' : 'Valor (R$)'}
                </Label>
                <Input
                  id="promotionValue"
                  type="number"
                  min="0"
                  step={formData.promotion.type === 'percentage' ? '1' : '0.01'}
                  value={formData.promotion.value}
                  onChange={(e) => setFormData({
                    ...formData,
                    promotion: { ...formData.promotion, value: parseFloat(e.target.value) || 0 }
                  })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="promotionDescription">Descrição da Promoção</Label>
              <Textarea
                id="promotionDescription"
                value={formData.promotion.description}
                onChange={(e) => setFormData({
                  ...formData,
                  promotion: { ...formData.promotion, description: e.target.value }
                })}
                placeholder="Ex: Promoção de lançamento"
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
