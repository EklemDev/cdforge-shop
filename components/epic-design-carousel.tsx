"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Palette, ImageIcon, Layout, FileText, Smartphone, Video, Sparkles, Star, Zap } from "lucide-react"
import { useSpring, animated } from "react-spring"

interface DesignService {
  id: string
  name: string
  description: string
  icon: any
  features: string[]
  price: string
  deliveryTime: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    particle: string
  }
}

const designServices: DesignService[] = [
  {
    id: "logo",
    name: "Logo & Identidade Visual",
    description: "Criação de logos únicos e identidade visual completa para sua marca com design profissional e memorável.",
    icon: Palette,
    features: ["Logo profissional em múltiplos formatos", "Manual da marca completo", "Variações do logo", "Aplicações práticas em diferentes mídias"],
    price: "A partir de R$ 60",
    deliveryTime: "1-3 dias",
    colorScheme: {
      primary: "from-purple-500 to-pink-500",
      secondary: "from-pink-400 to-purple-600",
      accent: "from-orange-500 to-red-500",
      particle: "from-purple-400 to-pink-400"
    }
  },
  {
    id: "social-media",
    name: "Design para Redes Sociais",
    description: "Posts, stories, capas e templates personalizados que engajam e convertem sua audiência.",
    icon: ImageIcon,
    features: ["Posts personalizados e engajantes", "Stories animados e interativos", "Capas de destaque", "Templates reutilizáveis"],
    price: "A partir de R$ 50",
    deliveryTime: "1-3 dias",
    colorScheme: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "from-cyan-400 to-blue-600",
      accent: "from-green-500 to-emerald-500",
      particle: "from-blue-400 to-cyan-400"
    }
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "Design de interfaces intuitivas e experiência do usuário que maximiza conversões e satisfação.",
    icon: Layout,
    features: ["Wireframes e protótipos", "Design responsivo e acessível", "Guia de estilo completo", "Testes de usabilidade"],
    price: "A partir de R$ 70",
    deliveryTime: "7-15 dias",
    colorScheme: {
      primary: "from-green-500 to-emerald-500",
      secondary: "from-emerald-400 to-green-600",
      accent: "from-teal-500 to-cyan-500",
      particle: "from-green-400 to-emerald-400"
    }
  },
  {
    id: "marketing",
    name: "Material de Marketing",
    description: "Banners, flyers, cartões de visita e materiais promocionais que vendem sua marca.",
    icon: FileText,
    features: ["Banners digitais otimizados", "Flyers impressos profissionais", "Cartões de visita elegantes", "Materiais promocionais"],
    price: "A partir de R$ 40",
    deliveryTime: "1-3 dias",
    colorScheme: {
      primary: "from-orange-500 to-red-500",
      secondary: "from-red-400 to-orange-600",
      accent: "from-yellow-500 to-orange-500",
      particle: "from-orange-400 to-red-400"
    }
  },
  {
    id: "app-design",
    name: "Design de Aplicativos",
    description: "Interface completa para aplicativos mobile com foco na usabilidade e experiência premium.",
    icon: Smartphone,
    features: ["Design mobile-first", "Ícones personalizados", "Animações fluidas", "Protótipo funcional"],
    price: "A partir de R$ 70",
    deliveryTime: "10-20 dias",
    colorScheme: {
      primary: "from-indigo-500 to-purple-500",
      secondary: "from-purple-400 to-indigo-600",
      accent: "from-pink-500 to-rose-500",
      particle: "from-indigo-400 to-purple-400"
    }
  },
  {
    id: "motion",
    name: "Motion Graphics",
    description: "Animações, vídeos promocionais e conteúdo audiovisual que capturam a atenção.",
    icon: Video,
    features: ["Animações 2D e 3D", "Vídeos promocionais", "Intros/Outros personalizados", "GIFs animados"],
    price: "A partir de R$ 60",
    deliveryTime: "5-10 dias",
    colorScheme: {
      primary: "from-teal-500 to-cyan-500",
      secondary: "from-cyan-400 to-teal-600",
      accent: "from-blue-500 to-indigo-500",
      particle: "from-teal-400 to-cyan-400"
    }
  }
]

// Componente de partículas animadas
const AnimatedParticles = ({ colorScheme }: { colorScheme: DesignService['colorScheme'] }) => {
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className={`absolute w-2 h-2 bg-gradient-to-r ${colorScheme.particle} rounded-full opacity-60`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

// Componente de ondas animadas
const AnimatedWaves = ({ colorScheme }: { colorScheme: DesignService['colorScheme'] }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <motion.path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className={`fill-current opacity-20`}
          style={{ color: `hsl(${Math.random() * 360}, 70%, 60%)` }}
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
      </svg>
    </div>
  )
}

export const EpicDesignCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentService = designServices[currentIndex]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % designServices.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + designServices.length) % designServices.length)
  }

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div 
      className="relative w-full min-h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background dinâmico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentService.colorScheme.primary} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Ondas animadas */}
      <AnimatedWaves colorScheme={currentService.colorScheme} />

      {/* Partículas animadas */}
      <AnimatedParticles colorScheme={currentService.colorScheme} />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className="w-full max-w-6xl"
          >
            {/* Card principal do serviço */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl`}>
              {/* Header do serviço */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-24 h-24 bg-gradient-to-r ${currentService.colorScheme.secondary} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl relative overflow-hidden`}
                >
                  <currentService.icon className="w-12 h-12 text-white z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  {currentService.name}
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/80 max-w-2xl mx-auto"
                >
                  {currentService.description}
                </motion.p>
              </div>

              {/* Features do serviço */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`bg-gradient-to-r ${currentService.colorScheme.secondary} p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                        <Star className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {feature}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Informações de preço e prazo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`bg-gradient-to-r ${currentService.colorScheme.accent} p-6 rounded-2xl border border-white/20 text-center`}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Preço</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentService.price}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className={`bg-gradient-to-r ${currentService.colorScheme.accent} p-6 rounded-2xl border border-white/20 text-center`}
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-white" />
                    <h3 className="text-xl font-bold text-white">Prazo</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentService.deliveryTime}</p>
                </motion.div>
              </div>

              {/* Botão de ação */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <button className={`bg-gradient-to-r ${currentService.colorScheme.accent} text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden group`}>
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    🚀 Solicitar Design
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles de navegação */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Indicadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3"
        >
          {designServices.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              }`}
            />
          ))}
        </motion.div>

        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8 text-white/80 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full"
        >
          {currentIndex + 1} de {designServices.length}
        </motion.div>
      </div>
    </div>
  )
}
