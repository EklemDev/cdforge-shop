import jsPDF from 'jspdf'

export interface ReceiptData {
  planName: string
  planPrice: number
  testDays: number
  promotion?: {
    active: boolean
    type: 'percentage' | 'fixed'
    value: number
    description: string
  }
  customerName?: string
  customerEmail?: string
  orderDate: Date
  orderId: string
}

export class ReceiptGenerator {
  static generateReceipt(data: ReceiptData): jsPDF {
    const doc = new jsPDF()
    
    // Configurações do documento
    doc.setFontSize(20)
    doc.setTextColor(59, 130, 246) // Blue-600
    doc.text('CodeForge - Comprovante de Plano', 20, 30)
    
    // Linha separadora
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.5)
    doc.line(20, 40, 190, 40)
    
    // Informações do plano
    doc.setFontSize(16)
    doc.setTextColor(17, 24, 39) // Gray-900
    doc.text('Detalhes do Plano:', 20, 60)
    
    doc.setFontSize(12)
    doc.setTextColor(55, 65, 81) // Gray-700
    doc.text(`Plano: ${data.planName}`, 20, 75)
    doc.text(`Período de Teste: ${data.testDays} dias`, 20, 85)
    
    // Preço
    const originalPrice = data.planPrice
    let finalPrice = originalPrice
    let discountText = ''
    
    if (data.promotion?.active) {
      const discount = data.promotion.type === 'percentage' 
        ? originalPrice * (data.promotion.value / 100)
        : data.promotion.value
      finalPrice = originalPrice - discount
      discountText = `Desconto: R$ ${discount.toFixed(2)}`
    }
    
    doc.text(`Preço Original: R$ ${originalPrice.toFixed(2)}`, 20, 95)
    if (discountText) {
      doc.text(discountText, 20, 105)
      doc.setTextColor(34, 197, 94) // Green-500
      doc.text(`Preço Final: R$ ${finalPrice.toFixed(2)}`, 20, 115)
      doc.setTextColor(55, 65, 81) // Gray-700
    } else {
      doc.text(`Preço Final: R$ ${finalPrice.toFixed(2)}`, 20, 105)
    }
    
    // Informações do cliente
    if (data.customerName || data.customerEmail) {
      doc.setFontSize(16)
      doc.setTextColor(17, 24, 39)
      doc.text('Informações do Cliente:', 20, 140)
      
      doc.setFontSize(12)
      doc.setTextColor(55, 65, 81)
      if (data.customerName) {
        doc.text(`Nome: ${data.customerName}`, 20, 155)
      }
      if (data.customerEmail) {
        doc.text(`Email: ${data.customerEmail}`, 20, 165)
      }
    }
    
    // Informações da ordem
    doc.setFontSize(16)
    doc.setTextColor(17, 24, 39)
    doc.text('Informações da Ordem:', 20, 190)
    
    doc.setFontSize(12)
    doc.setTextColor(55, 65, 81)
    doc.text(`ID da Ordem: ${data.orderId}`, 20, 205)
    doc.text(`Data: ${data.orderDate.toLocaleDateString('pt-BR')}`, 20, 215)
    doc.text(`Hora: ${data.orderDate.toLocaleTimeString('pt-BR')}`, 20, 225)
    
    // Rodapé
    doc.setFontSize(10)
    doc.setTextColor(107, 114, 128) // Gray-500
    doc.text('Este comprovante é gerado automaticamente pelo sistema CodeForge.', 20, 250)
    doc.text('Para suporte, entre em contato: discord.gg/jp2BzA4H', 20, 255)
    
    return doc
  }
  
  static downloadReceipt(data: ReceiptData, filename?: string): void {
    const doc = this.generateReceipt(data)
    const defaultFilename = `comprovante-${data.planName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`
    doc.save(filename || defaultFilename)
  }
}
