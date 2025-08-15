import { useState, useEffect } from 'react'
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  priority: 'low' | 'medium' | 'high'
  source: 'contact_form' | 'order_form' | 'direct'
  createdAt: any
  updatedAt: any
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContacts = async () => {
      if (!db) return

      try {
        const contactsRef = collection(db, 'contacts')
        const q = query(contactsRef, orderBy('createdAt', 'desc'))
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const contactsData: Contact[] = []
          snapshot.forEach((doc) => {
            const data = doc.data() as Contact
            contactsData.push({ ...data, id: doc.id })
          })
          setContacts(contactsData)
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error('Erro ao carregar contatos:', error)
        setLoading(false)
      }
    }

    loadContacts()
  }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!db) return null

    try {
      const newContact = {
        ...contact,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      const docRef = await addDoc(collection(db, 'contacts'), newContact)
      return docRef.id
    } catch (error) {
      console.error('Erro ao adicionar contato:', error)
      return null
    }
  }

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    if (!db) return false

    try {
      const docRef = doc(db, 'contacts', id)
      await updateDoc(docRef, {
        ...contact,
        updatedAt: new Date()
      })
      return true
    } catch (error) {
      console.error('Erro ao atualizar contato:', error)
      return false
    }
  }

  const deleteContact = async (id: string) => {
    if (!db) return false

    try {
      await deleteDoc(doc(db, 'contacts', id))
      return true
    } catch (error) {
      console.error('Erro ao deletar contato:', error)
      return false
    }
  }

  const getContactsByStatus = (status: Contact['status']) => {
    return contacts.filter(contact => contact.status === status)
  }

  const getContactsByPriority = (priority: Contact['priority']) => {
    return contacts.filter(contact => contact.priority === priority)
  }

  const getNewContacts = () => {
    return contacts.filter(contact => contact.status === 'new')
  }

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    getContactsByStatus,
    getContactsByPriority,
    getNewContacts
  }
}


