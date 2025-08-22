import { SimpleParticlesBackground } from "@/components/simple-particles-background"
import { SimpleFooter } from "@/components/simple-footer"
import { HomeContent } from "@/components/home-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 overflow-hidden">
      {/* Partículas de Fundo */}
      <SimpleParticlesBackground />
      
      {/* Conteúdo Principal */}
      <main className="relative z-10">
        <HomeContent />
      </main>
      
      {/* Footer Épico */}
      <SimpleFooter />
    </div>
  )
}
