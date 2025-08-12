"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  GripVertical,
  Trash2,
  Plus,
  Edit,
  Save,
  X
} from "lucide-react"

export interface DynamicField {
  id: string
  label: string
  value: string
  type: string
  required: boolean
  order: number
  placeholder?: string
  icon?: string
}

interface DynamicFieldProps {
  field: DynamicField
  isEditing: boolean
  onUpdate: (fieldId: string, updates: Partial<DynamicField>) => void
  onRemove: (fieldId: string) => void
  onDragStart: (e: React.DragEvent, fieldId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, fieldId: string) => void
  draggedField: string | null
  availableTypes?: Array<{
    type: string
    label: string
    placeholder: string
  }>
  showTypeSelector?: boolean
}

export default function DynamicFieldComponent({
  field,
  isEditing,
  onUpdate,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  draggedField,
  availableTypes = [],
  showTypeSelector = false
}: DynamicFieldProps) {
  const [isFieldEditing, setIsFieldEditing] = useState(false)

  const handleSave = () => {
    setIsFieldEditing(false)
  }

  const handleCancel = () => {
    setIsFieldEditing(false)
  }

  return (
    <div
      draggable={isEditing}
      onDragStart={(e) => onDragStart(e, field.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, field.id)}
      className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
        isEditing ? 'cursor-move hover:bg-gray-50' : ''
      } ${
        draggedField === field.id ? 'opacity-50' : ''
      }`}
    >
      {/* Ícone de arrastar */}
      {isEditing && (
        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
      )}

      {/* Conteúdo do campo */}
      <div className="flex-1">
        {isEditing && isFieldEditing ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Nome do campo"
                className="flex-1"
              />
              {showTypeSelector && availableTypes.length > 0 && (
                <select
                  value={field.type}
                  onChange={(e) => {
                    const selectedType = availableTypes.find(t => t.type === e.target.value)
                    if (selectedType) {
                      onUpdate(field.id, {
                        type: selectedType.type,
                        placeholder: selectedType.placeholder
                      })
                    }
                  }}
                  className="px-3 py-2 border rounded-md"
                >
                  {availableTypes.map(type => (
                    <option key={type.type} value={type.type}>
                      {type.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <Input
              value={field.value}
              onChange={(e) => onUpdate(field.id, { value: e.target.value })}
              placeholder={field.placeholder || 'Digite o valor'}
              type={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="w-3 h-3 mr-1" />
                Salvar
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-3 h-3 mr-1" />
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{field.label}</span>
              {field.required && (
                <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
              )}
              {showTypeSelector && (
                <Badge variant="outline" className="text-xs">{field.type}</Badge>
              )}
            </div>
            <div className="text-gray-600">
              {field.value || (
                <span className="text-gray-400 italic">Não preenchido</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      {isEditing && (
        <div className="flex gap-1">
          {!isFieldEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFieldEditing(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate(field.id, { required: !field.required })}
            className={field.required ? 'bg-blue-50 text-blue-600' : ''}
          >
            {field.required ? 'Obrigatório' : 'Opcional'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemove(field.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Hook para gerenciar campos dinâmicos
export function useDynamicFields(initialFields: DynamicField[] = []) {
  const [fields, setFields] = useState<DynamicField[]>(initialFields)
  const [draggedField, setDraggedField] = useState<string | null>(null)

  const addField = (newField: Omit<DynamicField, 'id' | 'order'>) => {
    const field: DynamicField = {
      ...newField,
      id: `field_${Date.now()}`,
      order: fields.length + 1
    }
    setFields([...fields, field])
  }

  const updateField = (fieldId: string, updates: Partial<DynamicField>) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
  }

  const removeField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId))
  }

  const handleDragStart = (e: React.DragEvent, fieldId: string) => {
    setDraggedField(fieldId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetFieldId: string) => {
    e.preventDefault()
    
    if (!draggedField || draggedField === targetFieldId) return

    const draggedIndex = fields.findIndex(field => field.id === draggedField)
    const targetIndex = fields.findIndex(field => field.id === targetFieldId)

    const newFields = [...fields]
    const [draggedFieldData] = newFields.splice(draggedIndex, 1)
    newFields.splice(targetIndex, 0, draggedFieldData)

    // Atualizar ordem
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }))

    setFields(reorderedFields)
    setDraggedField(null)
  }

  const resetFields = (defaultFields: DynamicField[]) => {
    setFields(defaultFields.map((field, index) => ({
      ...field,
      order: index + 1
    })))
  }

  return {
    fields,
    draggedField,
    addField,
    updateField,
    removeField,
    handleDragStart,
    handleDragOver,
    handleDrop,
    resetFields
  }
}
