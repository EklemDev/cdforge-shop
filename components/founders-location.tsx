"use client"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Clock, 
  MessageCircle, 
  Code, 
  Terminal, 
  Handshake,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useFounders } from "@/hooks/useFirebaseData"

const iconMap = {
  Code: Code,
  Terminal: Terminal,
  Handshake: Handshake
}

// Componente de status de disponibilidade minimalista
const AvailabilityDot = memo(({ founder }: { founder: any }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const isCurrentlyAvailable = useMemo(() => {
    const now = currentTime
    const [startHour, startMinute] = founder.availability.start.split(':').map(Number)
    const [endHour, endMinute] = founder.availability.end.split(':').map(Number)
    
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    const startTimeInMinutes = startHour * 60 + startMinute
    const endTimeInMinutes = endHour * 60 + endMinute
    
    if (endTimeInMinutes < startTimeInMinutes) {
      return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes
    }
    
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes
  }, [currentTime, founder.availability])

  return (
    <div className="flex items-center gap-1">
      <div className={`w-1.5 h-1.5 rounded-full ${isCurrentlyAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
      <span className="text-xs text-gray-500">
        {isCurrentlyAvailable ? 'Online' : 'Offline'}
      </span>
    </div>
  )
})
AvailabilityDot.displayName = 'AvailabilityDot'

// Card minimalista do fundador
const FounderCardMinimal = memo(({ founder, isExpanded, onToggle }: { 
  founder: any
  isExpanded: boolean
  onToggle: () => void
}) => {
  const IconComponent = iconMap[founder.icon as keyof typeof iconMap] || Code
  
  return (
    <Card className="group hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 bg-gradient-to-br ${founder.bgGradient} rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                {founder.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {founder.role}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <AvailabilityDot founder={founder} />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-5 w-5 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isExpanded ? (
                <ChevronUp className="w-3 h-3 text-gray-500" />
              ) : (
                <ChevronDown className="w-3 h-3 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        {/* Conteúdo expandido */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
            {/* Localização e Horário */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{founder.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {founder.availability.start}-{founder.availability.end}
                </span>
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Especialidades
              </h4>
              <div className="flex flex-wrap gap-1">
                {founder.specialties.slice(0, 2).map((specialty: string, index: number) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    {specialty}
                  </Badge>
                ))}
                {founder.specialties.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    +{founder.specialties.length - 2}
                  </Badge>
                )}
              </div>
            </div>

            {/* Botão de Contato */}
            <Button 
              asChild 
              size="sm"
              className={`w-full bg-${founder.color}-600 hover:bg-${founder.color}-700 text-white text-xs h-7`}
            >
              <a 
                href="https://discord.gg/jp2BzA4H" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3 h-3" />
                Contatar
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
FounderCardMinimal.displayName = 'FounderCardMinimal'

// Componente principal minimalista
const FoundersLocation = memo(() => {
  const { founders, loading } = useFounders()
  const [expandedFounder, setExpandedFounder] = useState<string | null>(null)
  
  const onlineFounders = useMemo(() => 
    founders.filter(founder => founder.isOnline), 
    [founders]
  )
  
  // Mostrar todos os fundadores sempre
  const displayedFounders = founders
  
  const handleToggleFounder = useCallback((founderId: string) => {
    setExpandedFounder(expandedFounder === founderId ? null : founderId)
  }, [expandedFounder])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Nossa Equipe
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fundadores especializados prontos para atender você
          </p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando fundadores...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Cabeçalho Minimalista */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Nossa Equipe
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fundadores especializados prontos para atender você
        </p>
      </div>

      {/* Cards dos Fundadores - Layout mais compacto */}
      <div className="space-y-1.5">
        {displayedFounders.map((founder) => (
          <FounderCardMinimal
            key={founder.id}
            founder={founder}
            isExpanded={expandedFounder === founder.id}
            onToggle={() => handleToggleFounder(founder.id)}
          />
        ))}
      </div>

      {/* Informações Resumidas */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-300">
                {onlineFounders.length} online
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Cobertura 24/7
            </div>
          </div>
          <Button 
            asChild 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3"
          >
            <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-3 h-3 mr-1" />
              Discord
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
})
FoundersLocation.displayName = 'FoundersLocation'

export default FoundersLocation
