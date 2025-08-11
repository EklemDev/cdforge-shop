import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/15 rounded-lg rotate-45 blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Pronto para transformar seu projeto?</h2>

          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Junte-se a centenas de clientes satisfeitos e leve seu negócio para o próximo nível com nossas soluções
            personalizadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/personalizar">Começar Personalização</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                Falar no Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
