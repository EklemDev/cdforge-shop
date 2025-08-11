"use client"

import { useState, useEffect } from "react"
import { useAdminData, SiteConfig } from "@/lib/admin-data"

export function useSiteConfig() {
  const adminData = useAdminData()
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar configurações do site
    const config = adminData.getSiteConfig()
    setSiteConfig(config)
    setLoading(false)
  }, [adminData])

  // Função para obter link do Discord atualizado
  const getDiscordLink = () => {
    return siteConfig?.discordLink || "https://discord.gg/jp2BzA4H"
  }

  // Função para obter informações de contato atualizadas
  const getContactInfo = () => {
    return siteConfig?.contactInfo || {
      phone: "(11) 99999-9999",
      email: "contato@codeforge.dev",
      instagram: "@codeforge.dev"
    }
  }

  // Função para obter categorias de bots ativas
  const getActiveBotCategories = () => {
    return siteConfig?.botCategories.filter(cat => cat.active) || []
  }

  // Função para obter categorias de sites ativas
  const getActiveSiteCategories = () => {
    return siteConfig?.siteCategories.filter(cat => cat.active) || []
  }

  // Função para obter tipos de bots ativos
  const getActiveBotTypes = () => {
    return siteConfig?.botTypes.filter(type => type.active) || []
  }

  // Função para obter tipos de projetos ativos
  const getActiveProjectTypes = () => {
    return siteConfig?.projectTypes.filter(type => type.active) || []
  }

  // Função para obter opções de personalização ativas
  const getActiveCustomizationOptions = () => {
    return siteConfig?.customizationOptions.filter(option => option.active) || []
  }

  return {
    siteConfig,
    loading,
    getDiscordLink,
    getContactInfo,
    getActiveBotCategories,
    getActiveSiteCategories,
    getActiveBotTypes,
    getActiveProjectTypes,
    getActiveCustomizationOptions
  }
}
