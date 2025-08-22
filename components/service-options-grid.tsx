"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Category } from "@/lib/categories-data"
import CategoryOrderForm from "./category-order-form"

interface ServiceOptionsGridProps {
  category: Category
}

export default function ServiceOptionsGrid({ category }: ServiceOptionsGridProps) {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    setShowOrderForm(true)
  }

  const handleBackFromForm = () => {
    setShowOrderForm(false)
    setSelectedService(null)
  }

  // Converter Category para MainCategory para o formulário
  const convertToMainCategory = () => {
    return {
      id: category.id,
      title: category.title,
      description: category.description,
      icon: category.icon,
      services: category.services
    }
  }

  return (
    <>
      <AnimatePresence>
        {showOrderForm ? (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 overflow-y-auto"
          >
            <CategoryOrderForm 
              category={convertToMainCategory()}
              onBack={handleBackFromForm}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Opções de {category.title}
              </h2>
              <p className="text-white/80 text-lg">
                Escolha o serviço que melhor atende suas necessidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleServiceClick(service)}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
