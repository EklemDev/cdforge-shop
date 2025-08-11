import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "CEO da TechStart",
    content:
      "O bot de vendas do CodeForge revolucionou nosso atendimento no Discord. Aumentamos as vendas em 300% no primeiro mês!",
    avatar: "/professional-man-avatar.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Influenciadora Digital",
    content:
      "O site portfolio que eles criaram é simplesmente perfeito. Design moderno e funcionalidades que realmente fazem a diferença.",
    avatar: "/professional-woman-avatar.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto Lima",
    role: "Dono de E-commerce",
    content:
      "Automação do WhatsApp Business mudou completamente nossa operação. Atendimento 24/7 com qualidade excepcional.",
    avatar: "/business-man-avatar.png",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Depoimentos reais de quem já transformou seu negócio com nossas soluções
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
