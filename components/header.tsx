"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="w-full max-w-4xl flex items-center justify-between">
              <div className="w-32"></div>
              <nav className="flex items-center space-x-8">
                <span className="text-gray-700">Planos</span>
                <span className="text-gray-700">Categorias</span>
              </nav>
              <div className="w-32"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="w-full max-w-6xl flex items-center justify-between">
            {/* Left spacer for balance */}
            <div className="hidden md:flex w-32"></div>

            {/* Centered Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/planos"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Planos
              </Link>
              <Link
                href="/categorias"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Categorias
              </Link>
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-3 w-32 justify-end">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-300 bg-transparent"
              >
                <Link href="/ajuda">Ajuda</Link>
              </Button>

              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X size={24} className="dark:text-white" />
              ) : (
                <Menu size={24} className="dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <nav className="flex flex-col space-y-4 items-center">
              <Link
                href="/planos"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Planos
              </Link>
              <Link
                href="/categorias"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Categorias
              </Link>
              <Link
                href="/ajuda"
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-medium"
              >
                Ajuda
              </Link>
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                <a href="https://discord.gg/jp2BzA4H" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
