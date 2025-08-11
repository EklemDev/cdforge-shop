"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, AlertTriangle, CheckCircle } from "lucide-react"

interface DevKeyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DevKeyModal({ isOpen, onClose }: DevKeyModalProps) {
  const [devKey, setDevKey] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const validDevKeys = ["Mllk1227", "Zanesco2024", "PedroDev"] // Chaves válidas

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)
    setError("")
    setSuccess(false)

    // Simular validação
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (validDevKeys.includes(devKey)) {
      setSuccess(true)
      // Aqui você pode adicionar lógica para salvar a chave no localStorage
      localStorage.setItem("devKey", devKey)
      localStorage.setItem("devAccess", "true")
      
      setTimeout(() => {
        onClose()
        setDevKey("")
        setSuccess(false)
        // Redirecionar para área administrativa ou mostrar interface de admin
        window.location.href = "/admin"
      }, 1500)
    } else {
      setError("Chave de desenvolvedor inválida. Tente novamente.")
    }

    setIsValidating(false)
  }

  const handleClose = () => {
    setDevKey("")
    setError("")
    setSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Acesso de Desenvolvedor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="devKey" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Chave de Desenvolvedor
            </Label>
            <Input
              id="devKey"
              type="password"
              value={devKey}
              onChange={(e) => setDevKey(e.target.value)}
              placeholder="Digite sua chave de desenvolvedor"
              className="font-mono"
              required
            />
            <p className="text-xs text-gray-500">
              Exemplo: Mllk1227
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Chave válida! Redirecionando para área administrativa...</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isValidating || !devKey.trim()}
              className="flex-1"
            >
              {isValidating ? "Validando..." : "Acessar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isValidating}
            >
              Cancelar
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>Atenção:</strong> Esta área é restrita apenas para desenvolvedores autorizados.
            O acesso não autorizado será registrado.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
