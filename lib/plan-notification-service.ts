import FirebaseDataService, { PlanOrder } from './firebase-data-service'

/**
 * Serviço responsável por gerenciar pedidos de planos e notificações
 * 
 * Este serviço integra três sistemas:
 * 1. Sistema de ordens de planos (planOrders)
 * 2. Sistema de pedidos (orders) - para aparecer no admin
 * 3. Sistema de notificações (notifications) - para alertar o admin
 * 
 * Fluxo completo:
 * Cliente seleciona plano → Cria ordem → Cria pedido → Envia notificação → Admin recebe alerta
 */
export class PlanNotificationService {
  private static firebaseService = FirebaseDataService.getInstance()

  /**
   * Cria uma nova ordem de plano e envia notificação para o admin
   * Também cria um pedido no sistema de pedidos para integração completa
   */
  static async createPlanOrder(orderData: Omit<PlanOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<PlanOrder> {
    try {
      // Criar a ordem no Firebase
      const order: PlanOrder = {
        ...orderData,
        id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Salvar no Firebase
      await this.firebaseService.addPlanOrder(order)

      // Criar pedido no sistema de pedidos para integração
      await this.createOrderInSystem(order)

      // Enviar notificação para o admin
      await this.sendAdminNotification(order)

      return order
    } catch (error) {
      console.error('Erro ao criar ordem de plano:', error)
      throw error
    }
  }

  /**
   * Cria um pedido no sistema de pedidos para integração completa
   * Isso garante que pedidos de planos apareçam na seção "Pedidos" do admin
   */
  private static async createOrderInSystem(planOrder: PlanOrder): Promise<void> {
    try {
      const orderData = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `Pedido - Plano ${planOrder.planName}`,
        description: `Pedido de plano: ${planOrder.planName} - R$ ${planOrder.planPrice.toFixed(2)}/mês - ${planOrder.testDays} dias de teste`,
        category: 'planos',
        priority: 'high',
        status: 'pending',
        assignedTo: '',
        customerName: planOrder.customerName || 'Cliente não informado',
        customerEmail: planOrder.customerEmail || '',
        customerPhone: planOrder.customerPhone || '',
        budget: planOrder.planPrice,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        requirements: [
          `Plano: ${planOrder.planName}`,
          `Preço: R$ ${planOrder.planPrice.toFixed(2)}/mês`,
          `Período de teste: ${planOrder.testDays} dias`,
          planOrder.promotion?.active ? `Promoção: ${planOrder.promotion.description}` : 'Sem promoção ativa'
        ].filter(Boolean),
        notes: `Pedido gerado automaticamente pelo sistema de planos. ID do plano: ${planOrder.id}`,
        planOrderId: planOrder.id, // Referência para rastreamento
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await this.firebaseService.addOrderFromPlan(orderData)
    } catch (error) {
      console.error('Erro ao criar pedido no sistema:', error)
      // Não falhar a criação da ordem se o pedido falhar
    }
  }

  /**
   * Envia notificação para o admin sobre nova ordem de plano
   */
  private static async sendAdminNotification(order: PlanOrder): Promise<void> {
    try {
      const notification = {
        id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'plan_order',
        title: 'Novo Pedido de Plano',
        message: `Novo pedido recebido para o plano: ${order.planName}`,
        details: {
          planName: order.planName,
          planPrice: order.planPrice,
          testDays: order.testDays,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          customerPhone: order.customerPhone,
          orderId: order.id
        },
        priority: 'high',
        read: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await this.firebaseService.addNotification(notification)
    } catch (error) {
      console.error('Erro ao enviar notificação:', error)
      // Não falhar a criação da ordem se a notificação falhar
    }
  }

  /**
   * Busca todas as ordens de planos
   */
  static async getPlanOrders(): Promise<PlanOrder[]> {
    try {
      return await this.firebaseService.getPlanOrders()
    } catch (error) {
      console.error('Erro ao buscar ordens de planos:', error)
      return []
    }
  }

  /**
   * Atualiza o status de uma ordem de plano
   */
  static async updatePlanOrderStatus(orderId: string, status: PlanOrder['status']): Promise<void> {
    try {
      await this.firebaseService.updatePlanOrder(orderId, { status, updatedAt: new Date() })
    } catch (error) {
      console.error('Erro ao atualizar status da ordem:', error)
      throw error
    }
  }
}
