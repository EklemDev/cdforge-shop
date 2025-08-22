"use client"

import { motion } from "framer-motion"
import { Discord, Heart, Code, Shield, Users, Star, Sparkles, Mail, Phone, MapPin } from "lucide-react"

export const EpicFooter = () => {
  const founders = [
    {
      name: "MELKE",
      role: "Desenvolvedor Full-Stack",
      discordId: "mllkada",
      specialties: ["Especialista em Web e Mobile", "Especialista em Design"],
      color: "from-blue-500 to-cyan-500",
      icon: Code,
      description: "Especialista em desenvolvimento web moderno e design de interfaces"
    },
    {
      name: "ZANESCO",
      role: "Arquiteto de Sistemas",
      discordId: "zanescomoro",
      specialties: ["Especialista em Bots e Automação", "Desenvolvimento de Sistemas"],
      color: "from-purple-500 to-pink-500",
      icon: Shield,
      description: "Arquiteto de soluções complexas e automação inteligente"
    },
    {
      name: "PEDRO",
      role: "Agente Oficial",
      discordId: "pedromaderada__",
      specialties: ["Ótimo Negociador", "Agente Oficial"],
      color: "from-green-500 to-emerald-500",
      icon: Users,
      description: "Especialista em negociações e atendimento ao cliente"
    }
  ]

  const stats = [
    { icon: Heart, value: "+100", label: "projetos entregues", color: "text-red-500" },
            { icon: Star, value: "100%", label: "de satisfação", color: "text-yellow-500" },
    { icon: Shield, value: "24/7", label: "suporte", color: "text-green-500" },
    { icon: Sparkles, value: "+50", label: "clientes ativos", color: "text-purple-500" }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Background com partículas */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Ondas animadas */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current text-purple-500/20"
            animate={{
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V30.29c47.79,15.2,103.59,22.17,158,18,70.36-3.37,136.33-23.31,206.8-27.5C438.64,22.43,512.34,33.67,583,42.05c69.27,12,138.3,18.88,209.4,8.08,36.15-4,69.85-12.84,104.45-19.34C989.49,15,1113-9.29,1200,32.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-current text-purple-500/30"
            animate={{
              d: [
                "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
                "M0,0V25.81C13,46.92,27.64,66.86,47.69,82.05,99.41,121.27,165,121,224.58,101.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z",
                "M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-current text-purple-500/40"
            animate={{
              d: [
                "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",
                "M0,0V15.63C149.93,69,314.09,81.32,475.83,52.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,87.22,886,105.24,951.2,100c86.53-7,172.46-45.71,248.8-84.81V0Z",
                "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Seção de estatísticas */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                Nossos Números
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </h2>
              <p className="text-xl text-white/80">
                Resultados que falam por si mesmos
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção dos Fundadores */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Contato Direto com os Fundadores
              </h2>
              <p className="text-xl text-white/80">
                Entre em contato diretamente com nossa equipe de desenvolvimento
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${founder.color} p-8 rounded-3xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden group`}
                >
                  {/* Efeito de brilho */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Header do fundador */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-xl">
                      <founder.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                      <p className="text-white/80">{founder.role}</p>
                    </div>
                  </div>

                  {/* Descrição */}
                  <p className="text-white/90 mb-6 relative z-10">
                    {founder.description}
                  </p>

                  {/* Especialidades */}
                  <div className="space-y-3 mb-6 relative z-10">
                    {founder.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/90">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>

                  {/* ID do Discord */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <Discord className="w-6 h-6 text-white" />
                      <div>
                        <p className="text-white/60 text-sm">Discord ID</p>
                        <p className="text-white font-mono font-bold">{founder.discordId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Botões de contato */}
                  <div className="space-y-3 relative z-10">
                    <button className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                      <Discord className="w-5 h-5" />
                      Contatar no Discord
                    </button>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                      WhatsApp
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Informações de contato gerais */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Informações da empresa */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center md:text-left"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  CodeForge
                </h3>
                <p className="text-white/80 mb-4">
                  Transformando ideias em realidade digital com tecnologia de ponta e design inovador.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <Discord className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Links rápidos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-white mb-4">Links Rápidos</h3>
                <div className="space-y-2">
                  <a href="/bots" className="block text-white/80 hover:text-white transition-colors">Bots</a>
                  <a href="/sites" className="block text-white/80 hover:text-white transition-colors">Sites</a>
                  <a href="/design" className="block text-white/80 hover:text-white transition-colors">Design</a>
                  <a href="/assistencia" className="block text-white/80 hover:text-white transition-colors">Assistência</a>
                </div>
              </motion.div>

              {/* Contato */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center md:text-right"
              >
                <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
                <div className="space-y-2 text-white/80">
                  <div className="flex items-center justify-center md:justify-end gap-2">
                    <Mail className="w-4 h-4" />
                    <span>contato@codeforge.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-end gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+55 (11) 99999-9999</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-end gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>São Paulo, Brasil</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <section className="border-t border-white/10 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white/60 text-sm text-center md:text-left"
              >
                <p>&copy; 2024 CodeForge. Todos os direitos reservados.</p>
                <p className="mt-1 flex items-center justify-center md:justify-start gap-2">
                  Desenvolvido com <Heart className="w-4 h-4 text-red-500" /> pela equipe CodeForge
                </p>
              </motion.div>

              {/* Links legais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex gap-6 text-white/60 text-sm"
              >
                <a href="/privacidade" className="hover:text-white transition-colors">Privacidade</a>
                <a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
