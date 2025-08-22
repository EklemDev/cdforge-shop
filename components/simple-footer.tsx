"use client"

import { 
  Heart,
  MessageCircle
} from "lucide-react"
import { CodeForgeLogoEnhanced } from "./codeforge-logo-enhanced"

const footerLinks = {
  services: [
    { name: "Bots Inteligentes", href: "/categorias" },
    { name: "Sites Profissionais", href: "/categorias" },
    { name: "Design Criativo", href: "/categorias" },
  ],
  company: [
    { name: "Sobre Nós", href: "/fundadores" },
    { name: "Nossa Equipe", href: "/fundadores" },
    { name: "Carreiras", href: "/contato" },
    { name: "Blog", href: "/ajuda" },
  ],
  support: [
    { name: "Central de Ajuda", href: "/ajuda" },
    { name: "Documentação", href: "/ajuda" },
    { name: "Contato", href: "/contato" },
    { name: "Status", href: "/contato" },
  ],
  social: [
    { name: "Entre em Contato", href: "/contato", icon: MessageCircle },
  ]
}

export const SimpleFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 border-t border-white/10 overflow-hidden">
      {/* Partículas de Fundo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Seção Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <CodeForgeLogoEnhanced size={32} color="blue" />
              </div>
              <span className="text-2xl font-bold text-white">CodeForge</span>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Transformamos ideias em soluções digitais épicas. Nossa missão é impulsionar 
              seu negócio com tecnologia de ponta e design inovador.
            </p>

                         {/* Botão de Contato */}
             <div className="flex">
               {footerLinks.social.map((social, index) => (
                 <a
                   key={social.name}
                   href={social.href}
                   className="relative group hover:scale-105 transition-all duration-300"
                   style={{ animationDelay: `${index * 100}ms` }}
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                   <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2">
                     <social.icon className="w-5 h-5 text-white" />
                     <span className="text-white font-medium">{social.name}</span>
                   </div>
                 </a>
               ))}
             </div>
          </div>

          {/* Links de Serviços */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Serviços</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={link.name} style={{ animationDelay: `${index * 100}ms` }}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links da Empresa */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={link.name} style={{ animationDelay: `${index * 100}ms` }}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links de Suporte */}
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-lg font-semibold text-white mb-6">Suporte</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={link.name} style={{ animationDelay: `${index * 100}ms` }}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 animate-scale-x" />

        {/* Seção Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0 animate-fade-in">
            © 2024 CodeForge. Todos os direitos reservados.
          </p>

          <div className="flex items-center space-x-2 text-white/60 text-sm animate-fade-in">
            <span>Feito com</span>
            <div className="animate-pulse">
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </div>
            <span>pela equipe CodeForge</span>
          </div>
        </div>
      </div>

      {/* Efeitos de Luz */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </footer>
  )
}

