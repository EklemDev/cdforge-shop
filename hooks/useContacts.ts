import { useState, useEffect } from 'react'
import FirebaseDataService, { Contact } from '@/lib/firebase-data-service'

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const firebaseService = FirebaseDataService.getInstance()

  // Carregar contatos iniciais
  useEffect(() => {
    const unsubscribe = firebaseService.onContactsChange((contactsData) => {
      setContacts(contactsData)
      setLoading(false)
      setError(null)
    })

    return () => unsubscribe()
  }, [])

  const addContact = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newContact = await firebaseService.addContact(contactData)
      setContacts(prev => [...prev, newContact].sort((a, b) => a.order - b.order))
      return newContact
    } catch (err) {
      setError('Erro ao adicionar contato')
      throw err
    }
  }

  const updateContact = async (contactId: string, updates: Partial<Contact>) => {
    try {
      await firebaseService.updateContact(contactId, updates)
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId 
            ? { ...contact, ...updates }
            : contact
        ).sort((a, b) => a.order - b.order)
      )
    } catch (err) {
      setError('Erro ao atualizar contato')
      throw err
    }
  }

  const deleteContact = async (contactId: string) => {
    try {
      await firebaseService.deleteContact(contactId)
      setContacts(prev => prev.filter(contact => contact.id !== contactId))
    } catch (err) {
      setError('Erro ao deletar contato')
      throw err
    }
  }

  const toggleContactStatus = async (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId)
    if (contact) {
      await updateContact(contactId, { active: !contact.active })
    }
  }

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    toggleContactStatus
  }
}



