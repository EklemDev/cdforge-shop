"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Package, 
  Plus, 
  Edit, 
  Save, 
  X,
  RefreshCw,
  DollarSign,
  CheckCircle,
  Star
} from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  active: boolean
  order: number
  isDefault?: boolean
}

interface PlansTabProps {
  plans: Plan[]
  onUpdate: (plans: Plan[]) => void
}

// Planos padrão
const defaultPlans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 99,
    description: 'Ideal para pequenos negócios',
    features: ['Suporte 24h', 'Até 100 mensagens/mês', '1 bot'],
    active: true,
    order: 1,
    isDefault: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 199,
    description: 'Para empresas em crescimento',
    features: ['Suporte prioritário', 'Mensagens ilimitadas', '3 bots', 'Relatórios avançados'],
    active: true,
    order: 2,
    isDefault: true
  },
  {
    id: 'enterprise',
    name: 'Empresa',
    price: 499,
    description: 'Solução completa para grandes empresas',
    features: ['Suporte dedicado', 'Bots ilimitados', 'API personalizada', 'Integração customizada'],
    active: true,
    order: 3,
    isDefault: true
  }
]

export default function PlansTab({ plans, onUpdate }: PlansTabProps) {
  const [currentPlans, setCurrentPlans] = useState<Plan[]>(plans.length > 0 ? plans : defaultPlans)
  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [editingFeatures, setEditingFeatures] = useState<string[]>([])

  useEffect(() => {
    if (plans.length > 0) {
      setCurrentPlans(plans)
    }
  }, [plans])

  const addPlan = () => {
    const newPlan: Plan = {
      id: `plan_${Date.now()}`,
      name: 'Novo Plano',
      price: 0,
      description: 'Descrição do plano',
      features: ['Benefício 1'],
      active: true,
      order: currentPlans.length + 1
    }
    const updatedPlans = [...currentPlans, newPlan]
    setCurrentPlans(updatedPlans)
    onUpdate(updatedPlans)
  }

  const updatePlan = (planId: string, updates: Partial<Plan>) => {
    const updatedPlans = currentPlans.map(plan => 
      plan.id === planId ? { ...plan, ...updates } : plan
    )
    setCurrentPlans(updatedPlans)
    onUpdate(updatedPlans)
  }

  const togglePlanActive = (planId: string) => {
    updatePlan(planId, { active: !currentPlans.find(p => p.id === planId)?.active })
  }

  const startEditing = (planId: string) => {
    setEditingPlan(planId)
    const plan = currentPlans.find(p => p.id === planId)
    if (plan) {
      setEditingFeatures([...plan.features])
    }
  }

  const savePlan = (planId: string) => {
    const plan = currentPlans.find(p => p.id === planId)
    if (plan) {
      updatePlan(planId, { features: editingFeatures })
    }
    setEditingPlan(null)
  }

  const cancelEditing = () => {
    setEditingPlan(null)
  }

  const resetPlan = (planId: string) => {
    const defaultPlan = defaultPlans.find(p => p.id === planId)
    if (defaultPlan) {
      updatePlan(planId, {
        name: defaultPlan.name,
        price: defaultPlan.price,
        description: defaultPlan.description,
        features: defaultPlan.features
      })
    }
  }

  const resetAllPlans = () => {
    if (confirm("⚠️ Tem certeza que deseja redefinir todos os planos para os valores padrão?")) {
      setCurrentPlans(defaultPlans)
      onUpdate(defaultPlans)
    }
  }

  const addFeature = (planId: string) => {
    const plan = currentPlans.find(p => p.id === planId)
    if (plan) {
      const newFeatures = [...plan.features, 'Novo benefício']
      updatePlan(planId, { features: newFeatures })
    }
  }

  const removeFeature = (planId: string, featureIndex: number) => {
    const plan = currentPlans.find(p => p.id === planId)
    if (plan) {
      const newFeatures = plan.features.filter((_, index) => index !== featureIndex)
      updatePlan(planId, { features: newFeatures })
    }
  }

  const updateFeature = (planId: string, featureIndex: number, value: string) => {
    const plan = currentPlans.find(p => p.id === planId)
    if (plan) {
      const newFeatures = [...plan.features]
      newFeatures[featureIndex] = value
      updatePlan(planId, { features: newFeatures })
    }
  }

  const removePlan = (planId: string) => {
    if (confirm("⚠️ Tem certeza que deseja remover este plano?")) {
      const updatedPlans = currentPlans.filter(plan => plan.id !== planId)
      setCurrentPlans(updatedPlans)
      onUpdate(updatedPlans)
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                Gerenciamento de Planos
              </CardTitle>
              <CardDescription>
                Configure os planos disponíveis para os clientes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={addPlan} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Plano
              </Button>
              <Button onClick={resetAllPlans} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Redefinir Todos
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de Planos */}
      <div className="grid gap-6">
        {currentPlans.map((plan) => (
          <Card key={plan.id} className={`${!plan.active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={plan.active}
                      onCheckedChange={() => togglePlanActive(plan.id)}
                    />
                    <Badge variant={plan.active ? "default" : "secondary"}>
                      {plan.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  {plan.isDefault && (
                    <Badge variant="outline" className="text-xs">
                      Padrão
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {editingPlan === plan.id ? (
                    <>
                      <Button size="sm" onClick={() => savePlan(plan.id)}>
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEditing}>
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => startEditing(plan.id)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => resetPlan(plan.id)}>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Redefinir
                      </Button>
                      {!plan.isDefault && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => removePlan(plan.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Remover
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Informações Básicas */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Nome do Plano</Label>
                  <Input
                    value={plan.name}
                    onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                    placeholder="Nome do plano"
                    disabled={editingPlan !== plan.id}
                  />
                </div>
                <div>
                  <Label>Preço (R$)</Label>
                  <Input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePlan(plan.id, { price: Number(e.target.value) })}
                    placeholder="0"
                    disabled={editingPlan !== plan.id}
                  />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input
                    value={plan.description}
                    onChange={(e) => updatePlan(plan.id, { description: e.target.value })}
                    placeholder="Descrição do plano"
                    disabled={editingPlan !== plan.id}
                  />
                </div>
              </div>

              {/* Benefícios/Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Benefícios Inclusos</Label>
                  {editingPlan === plan.id && (
                    <Button size="sm" variant="outline" onClick={() => addFeature(plan.id)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {editingPlan === plan.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={feature}
                            onChange={(e) => updateFeature(plan.id, index, e.target.value)}
                            placeholder="Benefício"
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFeature(plan.id, index)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm">{feature}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview do Card */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{plan.name}</h4>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold text-lg">{plan.price}</span>
                    <span className="text-sm text-gray-500">/mês</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <div className="space-y-1">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{plan.features.length - 3} benefícios adicionais
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas dos Planos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentPlans.length}
              </div>
              <div className="text-sm text-gray-600">Total de Planos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentPlans.filter(p => p.active).length}
              </div>
              <div className="text-sm text-gray-600">Planos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                R$ {currentPlans.reduce((sum, plan) => sum + plan.price, 0)}
              </div>
              <div className="text-sm text-gray-600">Valor Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
