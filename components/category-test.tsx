"use client"

import { useEffect, useState } from "react"
import FirebaseDataService from "@/lib/firebase-data-service"
import { MainCategory } from "@/lib/firebase-data-service"

export default function CategoryTest() {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const firebaseService = FirebaseDataService.getInstance()
    
    // Carregar dados diretamente
    const loadData = async () => {
      try {
        const data = await firebaseService.getMainCategories()
        setCategories(data)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao carregar categorias:', err)
        setError('Erro ao carregar')
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="p-4">Carregando categorias...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Erro: {error}</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teste de Categorias</h2>
      <p>Total de categorias: {categories.length}</p>
      
      {categories.map((cat) => (
        <div key={cat.id} className="border p-2 m-2">
          <h3>{cat.title}</h3>
          <p>{cat.description}</p>
          <p>Ativo: {cat.active ? 'Sim' : 'Não'}</p>
          <p>ID: {cat.id}</p>
        </div>
      ))}
      
      {categories.length === 0 && (
        <p className="text-gray-500">Nenhuma categoria encontrada</p>
      )}
    </div>
  )
}

