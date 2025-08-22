"use client"

import { motion } from "framer-motion"
import { MessageCircle, Heart, Shield, Clock, Terminal } from "lucide-react"
import { useState } from "react"
import DevAccessModal from "./dev-access-modal"

export default function FooterComponent() {
  const [isDevModalOpen, setIsDevModalOpen] = useState(false)
  
  const founders = [
    {
      name: "Melke",
      role: "Desenvolvedor Full-Stack",
      discordId: "mllkada",
      avatar: "💻",
      specialties: ["Web e Mobile", "Design"],
      devSymbols: [
        { symbol: "</>", tooltip: "Full-Stack Development" },
        { symbol: ">_", tooltip: "Terminal & CLI" },
        { symbol: "⚡", tooltip: "Performance & Speed" },
        { symbol: "🎨", tooltip: "UI/UX Design" }
      ]
    },
    {
      name: "Zanesco",
      role: "Arquiteto de Sistemas",
      discordId: "zanescomoro",
      avatar: "🤖",
      specialties: ["Bots e Automação", "Desenvolvimento de Sistemas"],
      devSymbols: [
        { symbol: "🤖", tooltip: "Bot Development" },
        { symbol: "⚙️", tooltip: "System Architecture" },
        { symbol: "🔧", tooltip: "Backend Development" },
        { symbol: "💻", tooltip: "System Integration" }
      ]
    },
    {
      name: "Pedro",
      role: "Agente Oficial",
      discordId: "pedromaderada__",
      avatar: "🎯",
      specialties: ["Ótimo Negociador", "Agente Oficial"],
      devSymbols: [
        { symbol: "🤝", tooltip: "Client Relations" },
        { symbol: "📈", tooltip: "Business Growth" },
        { symbol: "🎯", tooltip: "Strategic Planning" },
        { symbol: "🚀", tooltip: "Project Management" }
      ]
    }
  ]

  const stats = [
    { icon: MessageCircle, value: "+100", label: "projetos entregues" },
    { icon: Heart, value: "100%", label: "de satisfação" },
    { icon: Shield, value: "24/7", label: "suporte" },
    { icon: Clock, value: "<24h", label: "tempo de resposta" }
  ]

    return (
    <>
      <footer className="relative bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Founders Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Contato Direto com os Fundadores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">
                        {founder.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{founder.name}</h4>
                      <p className="text-white/70 text-sm">{founder.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {founder.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        {specialty}
                      </div>
                    ))}
                  </div>

                  {/* Símbolos de Desenvolvimento */}
                  <div className="mb-4">
                    <p className="text-white/60 text-xs mb-2 font-medium">Skills & Tech:</p>
                    <div className="flex items-center gap-2">
                      {founder.devSymbols.map((devSymbol, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group relative"
                          title={`${founder.name} - ${devSymbol.tooltip}`}
                        >
                          <span className="text-sm font-mono group-hover:scale-110 transition-transform duration-300">
                            {devSymbol.symbol}
                          </span>
                          {/* Tooltip */}
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                            {devSymbol.tooltip}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span>Discord ID:</span>
                      <code className="bg-white/20 px-2 py-1 rounded text-purple-300 font-mono">
                        {founder.discordId}
                      </code>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center border-t border-white/10 pt-8"
          >
            <p className="text-white/60 text-sm">
              © 2024 CodeForge. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Seguimos crescendo para que você cresça junto com a gente. 🚀
            </p>
            
            {/* Dev Access Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6"
            >
              <button
                onClick={() => setIsDevModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-mono">Dev Access</span>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </footer>
      
      {/* Dev Access Modal */}
      <DevAccessModal 
        isOpen={isDevModalOpen} 
        onClose={() => setIsDevModalOpen(false)} 
             />
     </>
   )
}
