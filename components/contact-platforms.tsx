"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Instagram,
  Bot
} from "lucide-react"
import FirebaseDataService, { Contact } from "@/lib/firebase-data-service"

// Mapa de ícones para cada tipo de contato
const contactIcons = {
  discord: Bot,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
  phone: Phone,
} as const

// Cores para cada tipo de contato
const contactColors = {
  discord: {
    bg: "bg-blue-500 hover:bg-blue-600",
    text: "text-white"
  },
  whatsapp: {
    bg: "bg-green-500 hover:bg-green-600",
    text: "text-white"
  },
  email: {
    bg: "bg-red-500 hover:bg-red-600",
    text: "text-white"
  },
  instagram: {
    bg: "bg-pink-500 hover:bg-pink-600",
    text: "text-white"
  },
  phone: {
    bg: "bg-gray-500 hover:bg-gray-600",
    text: "text-white"
  },
} as const

interface ContactPlatformsProps {
  variant?: 'footer' | 'inline' | 'buttons'
  className?: string
}

export default function ContactPlatforms({ variant = 'footer', className = '' }: ContactPlatformsProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const firebaseService = FirebaseDataService.getInstance()
        const contactsData = await firebaseService.getContacts()
        // Filtrar apenas contatos ativos
        const activeContacts = contactsData.filter(contact => contact.active)
        setContacts(activeContacts)
      } catch (error) {
        console.error('Erro ao carregar contatos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContacts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (contacts.length === 0) {
    return null
  }

  const handleContactClick = (contact: Contact) => {
    if (contact.type === 'email') {
      window.location.href = `mailto:${contact.value}`
    } else if (contact.type === 'phone') {
      window.location.href = `tel:${contact.value}`
    } else {
      window.open(contact.value, '_blank', 'noopener,noreferrer')
    }
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-2 ${className}`}>
        {contacts.map((contact) => {
          const IconComponent = contactIcons[contact.type]
          const colors = contactColors[contact.type]
          
          return (
            <Button 
              key={contact.id}
              asChild 
              className={`${colors.bg} ${colors.text} w-full`}
              onClick={() => handleContactClick(contact)}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <IconComponent className="w-4 h-4 mr-2" />
                {contact.label}
              </a>
            </Button>
          )
        })}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {contacts.map((contact) => {
          const IconComponent = contactIcons[contact.type]
          const colors = contactColors[contact.type]
          
          return (
            <Button
              key={contact.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleContactClick(contact)}
            >
              <IconComponent className="w-4 h-4" />
              {contact.label}
            </Button>
          )
        })}
      </div>
    )
  }

  if (variant === 'buttons') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${className}`}>
        {contacts.map((contact) => {
          const IconComponent = contactIcons[contact.type]
          const colors = contactColors[contact.type]
          
          return (
            <Button
              key={contact.id}
              className={`${colors.bg} ${colors.text} flex items-center justify-center gap-2 py-3`}
              onClick={() => handleContactClick(contact)}
            >
              <IconComponent className="w-5 h-5" />
              <span className="hidden sm:inline">{contact.label}</span>
            </Button>
          )
        })}
      </div>
    )
  }

  return null
}
