# Guia de Campos Dinâmicos - Painel Administrativo

## Visão Geral

O sistema de campos dinâmicos foi criado para permitir a gestão flexível de informações em diferentes seções do painel administrativo. Começamos com a aba "Contatos" e o sistema pode ser facilmente replicado para outras abas.

## Componentes Principais

### 1. `DynamicFieldComponent` (`components/ui/dynamic-field.tsx`)

Componente reutilizável que renderiza um campo dinâmico com as seguintes funcionalidades:

- **Edição inline**: Clique no botão de editar para modificar o campo
- **Drag & Drop**: Arraste e solte para reorganizar a ordem
- **Tipos de campo**: Seletor de tipos (email, telefone, Discord, etc.)
- **Campos obrigatórios**: Toggle para marcar campos como obrigatórios
- **Remoção**: Botão para remover campos

### 2. `useDynamicFields` Hook

Hook personalizado que gerencia o estado dos campos dinâmicos:

```typescript
const {
  fields,           // Array de campos
  draggedField,     // Campo sendo arrastado
  addField,         // Função para adicionar campo
  updateField,      // Função para atualizar campo
  removeField,      // Função para remover campo
  handleDragStart,  // Handler para início do drag
  handleDragOver,   // Handler para drag over
  handleDrop,       // Handler para drop
  resetFields       // Função para resetar campos
} = useDynamicFields(initialFields)
```

## Como Usar

### 1. Implementação Básica

```typescript
import DynamicFieldComponent, { useDynamicFields, DynamicField } from "@/components/ui/dynamic-field"

// Definir campos padrão
const defaultFields: DynamicField[] = [
  {
    id: 'email',
    type: 'email',
    label: 'E-mail',
    value: '',
    placeholder: 'contato@exemplo.com',
    required: true,
    order: 1
  }
]

// Usar o hook
const {
  fields,
  draggedField,
  addField,
  updateField,
  removeField,
  handleDragStart,
  handleDragOver,
  handleDrop,
  resetFields
} = useDynamicFields(defaultFields)

// Renderizar campos
{fields.map((field) => (
  <DynamicFieldComponent
    key={field.id}
    field={field}
    isEditing={isEditing}
    onUpdate={updateField}
    onRemove={removeField}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    draggedField={draggedField}
    availableTypes={availableTypes}
    showTypeSelector={true}
  />
))}
```

### 2. Tipos de Campo Disponíveis

```typescript
const availableTypes = [
  { type: 'email', label: 'E-mail', placeholder: 'contato@exemplo.com' },
  { type: 'tel', label: 'Telefone', placeholder: '(11) 99999-9999' },
  { type: 'discord', label: 'Discord', placeholder: 'usuario#1234' },
  { type: 'instagram', label: 'Instagram', placeholder: '@usuario' },
  { type: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/usuario' },
  { type: 'whatsapp', label: 'WhatsApp', placeholder: 'https://wa.me/5511999999999' },
  { type: 'location', label: 'Localização', placeholder: 'São Paulo, SP' },
  { type: 'website', label: 'Website', placeholder: 'https://exemplo.com' }
]
```

## Funcionalidades Implementadas

### ✅ Campos Dinâmicos
- Adicionar/remover campos
- Edição inline de labels e valores
- Seletor de tipos de campo
- Campos obrigatórios/opcionais

### ✅ Drag & Drop
- Reorganização por arrastar e soltar
- Feedback visual durante o drag
- Atualização automática da ordem

### ✅ Botão de Redefinir Específico
- "Redefinir Contatos" restaura apenas e-mail e telefone
- Remove campos adicionais
- Mantém outras configurações intactas

### ✅ Layout Flexível
- Design limpo e responsivo
- Espaçamento ajustável
- Preview em tempo real

### ✅ Componentes Reutilizáveis
- `DynamicFieldComponent` pode ser usado em qualquer aba
- `useDynamicFields` hook para gerenciamento de estado
- Fácil replicação para outras funcionalidades

## Estrutura de Dados

### Interface DynamicField

```typescript
interface DynamicField {
  id: string           // Identificador único
  label: string        // Nome do campo
  value: string        // Valor atual
  type: string         // Tipo do campo (email, tel, etc.)
  required: boolean    // Se é obrigatório
  order: number        // Ordem de exibição
  placeholder?: string // Placeholder do input
  icon?: string        // Ícone do campo
}
```

## Próximos Passos

### Para Replicar em Outras Abas:

1. **Importar componentes**:
   ```typescript
   import DynamicFieldComponent, { useDynamicFields, DynamicField } from "@/components/ui/dynamic-field"
   ```

2. **Definir campos padrão** específicos da aba

3. **Usar o hook** `useDynamicFields`

4. **Renderizar campos** com `DynamicFieldComponent`

5. **Implementar salvamento** específico da aba

### Exemplo: Aba "Configurações"

```typescript
// Definir campos de configuração
const defaultConfigFields: DynamicField[] = [
  {
    id: 'siteTitle',
    type: 'text',
    label: 'Título do Site',
    value: '',
    required: true,
    order: 1
  },
  {
    id: 'maintenanceMode',
    type: 'boolean',
    label: 'Modo Manutenção',
    value: 'false',
    required: false,
    order: 2
  }
]

// Usar o mesmo padrão da aba Contatos
const {
  fields: configFields,
  // ... outros métodos
} = useDynamicFields(defaultConfigFields)
```

## Observações Técnicas

- **Compatibilidade**: Funciona com o sistema existente de `siteConfig`
- **Performance**: Otimizado para renderização eficiente
- **Acessibilidade**: Suporte a navegação por teclado
- **Responsividade**: Funciona em dispositivos móveis
- **TypeScript**: Totalmente tipado para segurança

## Troubleshooting

### Problema: Campos não salvam
**Solução**: Verificar se a função `onUpdate` está sendo chamada corretamente

### Problema: Drag & Drop não funciona
**Solução**: Verificar se `draggable={isEditing}` está definido

### Problema: Tipos não aparecem no seletor
**Solução**: Verificar se `availableTypes` está sendo passado corretamente

---

**Status**: ✅ Implementado e Funcionando
**Próxima Aba Sugerida**: Configurações do Site
